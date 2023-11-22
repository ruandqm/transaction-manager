import { useEffect, useState } from "react"
import { useFormik } from "formik"
import api from "../../services/api"
import { toast } from "react-toastify"
import ctl from "@netlify/classnames-template-literals"
import cpfFormat from "../../utils/cpfFormat"

export default function AccountForm({ update, edit, setEdit, itemData }) {

    const [userField, setUserField] = useState("")
    const [searchResult, setSearchResult] = useState()
    const [currentId, setCurrentId] = useState()

    const formik = useFormik({
        initialValues: {
            accountNumber: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const valuesToSubmit = {
            ...formik.values,
            user: currentId
        }

        try {
            if (edit) {
                await api.put(`/account/${itemData._id}`, valuesToSubmit)

                update();

                toast.success("Dados atualizados com sucesso!", {
                    position: "top-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "colored"
                });

                formik.resetForm();
                setUserField("")

                setEdit(false)

            } else {
                await api.post(
                    "/account",
                    valuesToSubmit
                );

                update();

                toast.success("Conta cadastrada com sucesso!", {
                    position: "top-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "colored"
                });

                formik.resetForm();
                setUserField("")

            }
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

        setSearchResult(response.data)
    }

    useEffect(() => {
        if (itemData && edit) {
            formik.setFieldValue('accountNumber', itemData.accountNumber);
            setUserField(`${itemData.name} - ${itemData.cpf}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemData, edit]);

    return (
        <div className="flex flex-col w-full justify-center items-center">

            <div className="text-center mt-5">
                <h2 className="font-bold text-2xl">
                    {edit ? "Editar Conta" : "Cadastrar Conta"}
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
                            disabled={edit}
                            autoComplete="off"
                        />
                        {!edit && <span className="text-zinc-500 text-sm">Digite um nome para pesquisar</span>}
                        {searchResult && (
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
                                    searchResult.data.map((user) => {
                                        return (
                                            <span
                                                key={user._id}
                                                className="hover:bg-indigo-200 cursor-pointer"
                                                onClick={() => {
                                                    setUserField(`${user.name} - ${cpfFormat(user.cpf)}`)
                                                    setSearchResult()
                                                    setCurrentId(user._id)
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
                    <label htmlFor="address">Número da Conta</label>
                    <input
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.accountNumber}
                        maxLength="50"
                        type="number"
                        name="accountNumber"
                        placeholder="Ex: 12345678"
                        required
                    />
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
                    {edit ? "Salvar" : "Cadastrar"}
                </button>
            </form >
        </div >
    );
}
