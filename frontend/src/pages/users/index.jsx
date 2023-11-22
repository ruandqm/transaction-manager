import Header from "../../components/Header";
import useSWR from "swr"
import fetcher from "../../services/fetcher";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import UserForm from "./UserForm";
import { deleteUser } from "./integration/user";
import Modal from "../../components/Modal";

export default function Users() {

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [currentId, setCurrentId] = useState()
    const [edit, setEdit] = useState(false)
    const [itemData, setItemData] = useState()
    const [modalOpen, setModalOpen] = useState(false)

    const { data: users, isLoading: loadingUsers, mutate: updateUsers } = useSWR(`/user?pageNumber=${currentPage}`,
        fetcher, {
        revalidateOnFocus: false,
    })

    useEffect(() => {
        if (!loadingUsers && users.pages)
            setTotalPages(users.pages)
    }, [users, loadingUsers])

    useEffect(() => {
        if (!modalOpen)
            updateUsers()
    }, [modalOpen, updateUsers])


    return (
        <>
            <Header />

            <UserForm update={updateUsers} edit={edit} setEdit={setEdit} itemData={itemData} />

            {modalOpen && (
                <Modal
                    setModalOpen={setModalOpen}
                    id={currentId}
                    action={deleteUser}
                    update={updateUsers}
                />
            )}

            <div className="max-w-screen-xl m-auto">
                {!modalOpen && (
                    loadingUsers ? <Loading /> : (
                        <Table
                            data={users}
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
                                    title: "Endereço",
                                    name: "address",
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
                                        // deleteUser({ id, updateUsers })
                                    }
                                },
                            ]}
                        />
                    )
                )}

            </div>

            {!loadingUsers && (
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