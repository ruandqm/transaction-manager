import Account from "../models/Account";
import Transaction from "../models/Transaction";
import User from "../models/User";
import Pagination from "../utils/Pagination";
import errorResponse from "../utils/errorResponse"

export const getAccounts = async (req, res, next) => {
    try {
        let query = {};
        const pageSize = parseInt(req.query.pageSize) || 15;
        const pageNumber = parseInt(req.query.pageNumber) || 1;
        const sortBy = req.query.sortBy === "ASC" ? { createdAt: 1 } : { createdAt: -1 };

        const pagination = new Pagination(
            Account,
            { ...query },
            { pageSize, pageNumber },
            [
                {
                    path: "user",
                    select: "name cpf"
                }
            ],
            sortBy
        );

        const accounts = await pagination.paginate();
        return res.json(accounts);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getByUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const accounts = await Account.find({ user: id }).populate({ path: "user", select: "name cpf" })

        if (accounts === null) {
            return next(
                new errorResponse("Essa pessoa não possui contas cadastradas!", 400)
            )
        }

        return res.json(accounts);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const createAccount = async (req, res, next) => {
    try {
        const { user, accountNumber } = req.body;

        const existingAccount = await Account.findOne({ accountNumber: accountNumber })
        const checkUser = await User.findOne({ _id: user })

        if (existingAccount !== null) {
            return next(
                new errorResponse("Essa conta já existe!", 400)
            )
        }

        if (checkUser === null) {
            return next(
                new errorResponse("Essa pessoa não está cadastrada!", 400)
            )
        }

        await Account.create({
            user,
            accountNumber,
        });

        return res.status(201).json({
            status: "success",
            message: "Conta registrada com sucesso!",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const updateAccount = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user, accountNumber } = req.body

        const account = await Account.findById(id)

        if (account === null) {
            return next(
                new errorResponse("Esse usuário não existe!", 400)
            )
        }

        account.user = user;
        account.accountNumber = accountNumber;

        await account.save()

        return res.status(200).json({
            status: "success",
            message: "Dados atualizados com sucesso!",
        });
    } catch (error) {
        console.log(error.name);
        next(error);
    }
}

export const deleteAccount = async (req, res, next) => {
    try {
        const { id } = req.params;

        const account = await Account.findById(id)

        const transaction = await Transaction.findOne({ account: id })

        if (!account) {
            return next(
                new errorResponse("Essa conta não existe!", 404)
            )
        }

        if (transaction !== null) {
            return next(
                new errorResponse("Essa conta não pode ser removida, pois existem movimentações nela.", 404)
            )
        }

        await Account.deleteOne({ _id: id })
        return res.status(200).json({
            status: "success",
            message: "Conta removida com sucesso!",
        });
    } catch (error) {
        console.log(error.name);
        next(error);
    }
}