import Pagination from "../utils/Pagination";
import Transaction from "../models/Transaction";
import Account from "../models/Account";
import errorResponse from "./../utils/errorResponse";


export const getTransactions = async (req, res, next) => {
    try {
        const { account } = req.params;
        let query = account;
        const pageSize = parseInt(req.query.pageSize) || 15;
        const pageNumber = parseInt(req.query.pageNumber) || 1;
        const sortBy = req.query.sortBy === "ASC" ? { createdAt: 1 } : { createdAt: -1 };

        const pagination = new Pagination(
            Transaction,
            { ...query },
            { pageSize, pageNumber },
            [
                {
                    path: "account",
                    select: "balance"
                }
            ],
            sortBy
        );

        const transactions = await pagination.paginate();
        return res.json(transactions);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const createTransactions = async (req, res, next) => {
    try {
        const { account } = req.params
        const { value } = req.body;

        const accountDb = await Account.findOne({ _id: account })

        const balance = accountDb.balance + value

        console.log(balance)

        if (accountDb === null) {
            return next(
                new errorResponse("Essa conta não existe!", 400)
            )
        }

        if (balance < 0) {
            return next(
                new errorResponse("Você não possui saldo suficiente para essa operação!", 400)
            )
        }

        accountDb.balance = balance
        await accountDb.save()

        await Transaction.create({
            account,
            value
        })

        return res.status(200).json({
            status: "success",
            message: "Movimentação registrada com sucesso!",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}