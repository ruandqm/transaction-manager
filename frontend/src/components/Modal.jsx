export default function Modal({ setModalOpen, id, action }) {

    return (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
            <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                <div className="w-full">
                    <div className="m-8 my-20 max-w-[400px] mx-auto">
                        <div className="mb-8">
                            <h1 className="mb-4 text-3xl font-extrabold text-center">Tem certeza?</h1>
                            <p className="text-gray-600 text-center">Essa operação não poderá ser desfeita.</p>
                        </div>
                        <div className="space-y-4">
                            <button
                                className="p-3 bg-indigo-900 rounded-full text-white w-full font-semibold hover:scale-105 duration-200"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="p-3 bg-red-600 text-white border rounded-full w-full font-semibold hover:scale-105 duration-200"
                                onClick={() => {
                                    action({ id })
                                    setModalOpen(false)
                                }}
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}