import { useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import TransactionForm from "./TransactionForm";

export default function Transactions() {
    const [statement, setStatement] = useState()

    return (
        <>
            <Header />

            <TransactionForm setStatement={setStatement} />

            <div className="max-w-screen-sm m-auto flex flex-col items-center">
                {statement && (
                    <>
                        <Table
                            data={statement}
                            name={`Extrato`}
                            fields={[
                                {
                                    type: "date",
                                    title: "Data",
                                    name: "createdAt",
                                },
                                {
                                    type: "money",
                                    title: "Valor",
                                    name: "value",
                                },
                            ]}
                        />
                        {statement.data.length > 0 && (
                            <span className="font-semibold text-lg mb-3">{`Saldo: R$${statement.data[0].account.balance}`}</span>
                        )}

                    </>
                )}
            </div>
        </>
    )
}