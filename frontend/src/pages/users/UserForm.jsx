import { useEffect } from "react"
import ReactInputMask from "react-input-mask"
import { useFormik } from "formik"
import api from "../../services/api"
import { toast } from "react-toastify"
import ctl from "@netlify/classnames-template-literals"

export default function UserForm({ update, edit, setEdit, itemData }) {

    const formik = useFormik({
        initialValues: {
            name: "",
            cpf: "",
            address: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        validate: (values) => {
            const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
            const errors = {};
            if (!cpfRegex.test(values.cpf))
                errors.cpf = "Informe um CPF válido!";

            return errors;
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formik.values.name || !formik.values.cpf || !formik.values.address) {
            toast.error(
                "Por favor, informe nome, cpf e endereço.",
                {
                    position: "top-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                }
            );
            return;
        }

        const cpfValue = formik.values.cpf || '';
        const cpfNumber = cpfValue.replace(/\D/g, '');

        const valuesToSubmit = {
            ...formik.values,
            cpf: cpfNumber
        }

        try {
            if (edit) {
                await api.put(`/user/${itemData._id}`, valuesToSubmit)

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

                setEdit(false)

            } else {
                await api.post(
                    "/user",
                    valuesToSubmit
                );

                update();

                toast.success("Pessoa cadastrada com sucesso!", {
                    position: "top-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "colored"
                });

                formik.resetForm();

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

    useEffect(() => {
        if (itemData && edit) {
            formik.setFieldValue('name', itemData.name);
            formik.setFieldValue('cpf', JSON.stringify(itemData.cpf));
            formik.setFieldValue('address', itemData.address);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemData, edit]);

    return (
        <div className="flex flex-col w-full justify-center items-center">

            <div className="text-center mt-5">
                <h2 className="font-bold text-2xl">
                    {edit ? "Editar Pessoa" : "Cadastrar Pessoa"}
                </h2>
            </div>

            <form
                className="mx-auto my-8 grid gap-3 w-full max-w-2xl px-3"
                onSubmit={(handleSubmit)}
            >
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        type="text"
                        maxLength={50}
                        name="name"
                        placeholder="Ex: João da Silva"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="cpf">CPF</label>
                    <ReactInputMask
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cpf}
                        mask="999.999.999-99"
                        type="text"
                        name="cpf"
                        placeholder="Ex: 000.000.000-00"
                        required
                    />
                    <span className="text-red-600">
                        {formik.errors.cpf}
                    </span>
                </div>

                <div>
                    <label htmlFor="address">Endereço</label>
                    <input
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        maxLength="50"
                        type="text"
                        name="address"
                        placeholder="Ex: Rod. Admar Gonzaga, 2765 Florianópolis/SC"
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
            </form>
        </div>
    );
}
