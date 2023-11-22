/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import api from "../../services/api"
import { toast } from "react-toastify"
import ctl from "@netlify/classnames-template-literals"
import cpfFormat from "../../utils/cpfFormat"

export default function TransactionForm({ setStatement }) {

    const [userField, setUserField] = useState("")
    const [userResult, setUserResult] = useState()
    const [accountResult, setAccountResult] = useState()
    const [userId, setUserId] = useState()
    const [accountId, setAccountId] = useState()
    const [transactionType, setTransactionType] = useState(true)

    const formik = useFormik({
        initialValues: {
            value: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
    });

    const changeTransationType = (value) => {
        if (transactionType === true)
            return Math.abs(value)
        else
            return -Math.abs(value)
    }


    const getTransactions = async () => {
        const transactions = await api.get(`/transaction/${accountId}`)

        setStatement(transactions.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const valuesToSubmit = {
            value: changeTransationType(formik.values.value)
        }

        try {
            console.log(valuesToSubmit)
            await api.post(
                `/transaction/${accountId}`,
                valuesToSubmit
            );

            getTransactions();

            toast.success("Movimentação registrada com sucesso!", {
                position: "top-right",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored"
            });

            formik.resetForm();
            setUserField("");
            setAccountResult()
            setAccountId()

        } catch (error) {
            const { message } = error.response.data;

            console.log("error", { error });
            toast.error(message, {
                position: "top-right",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored"
            });
        }
    };

    const searchUser = async (e) => {
        setUserField(e.target.value)
        const response = await api.get(`/user/search?name=${e.target.value}`)

        setUserResult(response.data)
    }


    useEffect(() => {
        if (userId) {
            const getAccounts = async () => {
                const accounts = await api.get(`/account/${userId}`)
                if (accounts.data.length > 0)
                    setAccountId(accounts.data[0]._id)

                setAccountResult(accounts.data)
            }
            getAccounts()
        }

    }, [userId])

    useEffect(() => {
        if (accountId)
            getTransactions()

    }, [accountId])

    return (
        <div className="flex flex-col w-full justify-center items-center">

            <div className="text-center mt-5">
                <h2 className="font-bold text-2xl">
                    {"Registrar Movimentação"}
                </h2>
            </div>

            <form
                className="mx-auto my-8 grid gap-3 w-full max-w-2xl px-3"
                onSubmit={(handleSubmit)}
            >

                <div>
                    <label htmlFor="name">Pessoa</label>
                    <div>

                        <input
                            className="form-control"
                            onChange={searchUser}
                            value={userField}
                            type="text"
                            maxLength={50}
                            name="name"
                            placeholder="Ex: João da Silva - 123.456.789-01"
                            required
                            autoComplete="off"
                        />
                        <span className="text-zinc-500 text-sm">Digite um nome para pesquisar</span>
                        {userResult && (
                            <div className={ctl(
                                `bg-white
                            shadow-md
                            rounded-xl
                            w-fit 
                            max-w-2xl max-h-[30rem] 
                            p-3 overflow-y-auto 
                            fixed
                            flex flex-col gap-3
                            `
                            )}>
                                {
                                    userResult.data.map((user) => {
                                        return (
                                            <span
                                                key={user._id}
                                                className="hover:bg-indigo-200 cursor-pointer"
                                                onClick={() => {
                                                    setUserField(`${user.name} - ${cpfFormat(user.cpf)}`)
                                                    setUserResult()
                                                    setUserId(user._id)
                                                }}

                                            >
                                                {user.name} - {cpfFormat(user.cpf)}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="account">Conta</label>
                    <select name="account" id="account" className="form-select">
                        {accountResult && (
                            accountResult.map((account) => {
                                return (
                                    <option
                                        key={account.accountNumber}
                                        value=""
                                        onClick={() => setAccountId(account._id)}
                                    >
                                        {`${account.accountNumber} - R$${account.balance}`}
                                    </option>
                                )
                            })
                        )}
                    </select>
                </div>

                <div>
                    <label htmlFor="name">Valor</label>
                    <input
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.value}
                        type="number"
                        maxLength={50}
                        name="value"
                        placeholder="Valor da Transação"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="name">Valor</label>
                    <select
                        name="type"
                        id="type"
                        className="form-select"
                        onChange={(e) => setTransactionType(e.target.value)}
                        required
                    >
                        <option value={true}>Adicionar</option>
                        <option value={false}>Retirar</option>
                    </select>
                </div>

                <button
                    className={ctl(`
                    px-5 py-3 mx-auto mt-4
                    text-base text-white font-semibold
                    rounded-xl bg-indigo-900
                    hover:scale-105 duration-200
                    `)}

                    type="submit"
                >
                    {"Registrar"}
                </button>
            </form>
        </div>
    );
}
