import { toast } from "react-toastify";
import api from "../../../services/api";

export const deleteAccount = async ({ id }) => {
    try {
        await api.delete(`account/${id}`)

        toast.success("Conta removida com sucesso!", {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored"
        });

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
}