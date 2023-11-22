import { useEffect, useState } from "react";
import Header from "../../components/Header";
import AccountForm from "./accountForm";
import useSWR from "swr"
import fetcher from "../../services/fetcher";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import { deleteAccount } from "./integration/account";
import Table from "../../components/Table";
import Loading from "../../components/Loading";
import accountsAdapter from "./integration/accountsAdapter";

export default function Accounts() {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [currentId, setCurrentId] = useState()
    const [edit, setEdit] = useState(false)
    const [itemData, setItemData] = useState()
    const [modalOpen, setModalOpen] = useState(false)

    const { data: accounts, isLoading: loadingAccounts, mutate: updateAccounts } = useSWR(`/account?pageNumber=${currentPage}`,
        fetcher, {
        revalidateOnFocus: false,
    })

    useEffect(() => {
        if (!loadingAccounts && accounts.pages)
            setTotalPages(accounts.pages)
    }, [accounts, loadingAccounts])

    useEffect(() => {
        if (!modalOpen)
            updateAccounts()
    }, [modalOpen, updateAccounts])


    return (
        <>
            <Header />

            <AccountForm update={updateAccounts} edit={edit} setEdit={setEdit} itemData={itemData} />

            {modalOpen && (
                <Modal
                    setModalOpen={setModalOpen}
                    id={currentId}
                    action={deleteAccount}
                    update={updateAccounts}
                />
            )}

            <div className="max-w-screen-xl m-auto">
                {!modalOpen && (
                    loadingAccounts ? <Loading /> : (
                        <Table
                            data={accountsAdapter(accounts.data)}
                            name={`Pessoas`}
                            fields={[
                                {
                                    type: "text",
                                    title: "Nome",
                                    name: "name",
                                },
                                {
                                    type: "cpf",
                                    title: "CPF",
                                    name: "cpf",
                                },
                                {
                                    type: "text",
                                    title: "Nº da Conta",
                                    name: "accountNumber",
                                },
                                {
                                    type: "button",
                                    title: "Editar",
                                    name: "Editar",
                                    ref: "_id",
                                    className: "bg-indigo-900",
                                    disabled: (id) => !id,
                                    action: (item) => {
                                        setItemData(item)
                                        setEdit(true)
                                    }
                                },
                                {
                                    type: "button",
                                    title: "Remover",
                                    name: "Remover",
                                    param: "_id",
                                    ref: "_id",
                                    className: "bg-red-600",
                                    disabled: (id) => !id,
                                    action: (id) => {
                                        setCurrentId(id)
                                        setModalOpen(true)
                                    }
                                },
                            ]}
                        />
                    )
                )}

            </div>

            {!loadingAccounts && (
                <table className="mx-auto my-5">
                    <tbody>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            paginate={setCurrentPage}
                        />
                    </tbody>
                </table>
            )}
        </>
    )
}