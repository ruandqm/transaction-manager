import Pagination from "../utils/Pagination";
import User from "../models/User";
import errorResponse from "../utils/errorResponse"

export const getUsers = async (req, res, next) => {
    try {
        let query = {};
        const pageSize = parseInt(req.query.pageSize) || 15;
        const pageNumber = parseInt(req.query.pageNumber) || 1;
        const sortBy = req.query.sortBy === "ASC" ? { createdAt: 1 } : { createdAt: -1 };

        const pagination = new Pagination(
            User,
            { ...query },
            { pageSize, pageNumber },
            null,
            sortBy
        );

        const users = await pagination.paginate();
        return res.json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { name, cpf, address } = req.body;

        const existingUser = await User.findOne({ cpf: cpf }).exec()

        if (existingUser !== null) {
            console.log(existingUser)
            return res.status(400).json({
                status: 400,
                message: "Erro: esse CPF já está cadastrado!",
            });
        }

        await User.create({
            name,
            cpf,
            address,
        });

        return res.status(201).json({
            status: "success",
            message: "Usuário registrado com sucesso!",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, cpf, address } = req.body

        const user = await User.findById(id)

        if (user === null) {
            return next(
                new errorResponse("Esse usuário não existe!", 400)
            )
        }

        user.name = name;
        user.cpf = cpf;
        user.address = address;

        await user.save()

        return res.status(200).json({
            status: "success",
            message: "Dados atualizados com sucesso!",
        });
    } catch (error) {
        console.log(error.name);
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)

        if (user === null) {
            return next(
                new errorResponse("Esse usuário não existe!", 400)
            )
        }

        await User.deleteOne({ _id: id })
        return res.status(200).json({
            status: "success",
            message: "Pessoa removida com sucesso!",
        });
    } catch (error) {
        console.log(error.name);
        next(error);
    }
}

export const searchUser = async (req, res, next) => {
    try {
        const name = req.query.name;

        const regex = new RegExp(".*" + name + ".*", "i");

        const user = await User.find({ name: { $regex: regex } }).limit(15)

        return res.json({
            status: "success",
            data: user,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}