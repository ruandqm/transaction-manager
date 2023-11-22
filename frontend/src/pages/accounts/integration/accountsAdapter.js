export default function accountsAdapter(data) {
    const adapted =
        data.map((item) => {
            return {
                _id: item._id,
                name: item.user.name,
                cpf: item.user.cpf,
                accountNumber: item.accountNumber,
                balance: item.balance
            }
        })

    return { data: adapted }
}