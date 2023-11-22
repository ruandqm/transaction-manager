import ctl from "@netlify/classnames-template-literals";
import cpfFormat from "../utils/cpfFormat";

export default function Table({ data, name, fields }) {
    const defaultTd = "border-0 p-4 text-center align-middle";

    return (
        <section className="tableContainer w-11/12 md:w-10/12 mx-auto my-4">

            <div className="table-responsive m-auto shadow-lg rounded-5 bg-white pt-4">

                <div className="text-center m-auto mb-3">
                    <h2 className="text-gray-400 text-2xl font-semibold">{name}</h2>
                </div>

                <hr />

                {data.data && data.data.length > 0 ? (
                    <table className="table table-borderless rounded-5 mt-4 p-5 bg-white">
                        <thead>
                            <tr>
                                {fields.map((field) => (
                                    <td key={field.name} className={`${defaultTd} font-bold text-lg`}>
                                        {field.title}
                                    </td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((item) => (
                                <tr key={item._id}>
                                    {fields.map((field) => {
                                        if (
                                            item[field.name] === undefined &&
                                            item[field.altName] === undefined &&
                                            field.type !== "button"
                                        )
                                            return <td key={field.name} className={defaultTd}>Não Informado</td>

                                        switch (field.type) {
                                            case "button": {
                                                const isDisabled = field.disabled(item[field.ref])
                                                return (
                                                    <td key={field.name} className={defaultTd}>
                                                        <button
                                                            className={ctl(
                                                                `text-white 
                                                                 py-1 px-3 
                                                                 rounded-lg 
                                                                 ${field.className}
                                                                 ${!isDisabled && "duration-200 hover:scale-105"}
                                                                 ${isDisabled && "opacity-50"}
                                                                 `
                                                            )}
                                                            onClick={() => {
                                                                if (field.param)
                                                                    field.action(item[field.param])
                                                                else
                                                                    field.action(item)
                                                            }}
                                                            disabled={isDisabled}
                                                        >
                                                            {field.name}
                                                        </button>
                                                    </td>
                                                )
                                            }
                                            case "date":
                                                return (
                                                    <td key={field.name} className={defaultTd}>
                                                        {new Date(item[field.name]).toLocaleString("pt-br")}
                                                    </td>
                                                )

                                            case "money":
                                                return (
                                                    <td
                                                        key={field.name}
                                                        className={`${defaultTd}`}
                                                        style={item[field.name] > 0 ? { color: "green" } : { color: "red" }}
                                                    >
                                                        R$ {item[field.name].toFixed(2)}
                                                    </td>
                                                )

                                            case "array":
                                                if (item[field.name].length !== 0)
                                                    return (
                                                        <td key={field.name} className={defaultTd}>
                                                            {item[field.name].map((category) => (
                                                                <div key={category.name}>{category.name}</div>
                                                            ))}
                                                        </td>
                                                    )
                                                else return <td key={field.name} className={defaultTd}>Não Informado</td>

                                            case "cpf":
                                                return <td key={field.title} className={defaultTd}>{cpfFormat(item[field.name])}</td>

                                            case "text":
                                                return <td key={field.title} className={defaultTd}>{item[field.name] || item[field.altName]}</td>

                                            default:
                                                return null
                                        }
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center my-5">
                        <span className="text-lg">Não encontramos nada aqui! :(</span>
                    </div>
                )}
            </div>
        </section>
    );
}


