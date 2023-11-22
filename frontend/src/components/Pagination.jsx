const Pagination = ({ currentPage, totalPages, paginate }) => {
    return (
        totalPages > 1 && (
            <div
                className="flex justify-center items-center"
            >
                <div>
                    <button
                        className="bg-indigo-900 text-white px-3 py-2 rounded-xl"
                        disabled={currentPage <= 1}
                        onClick={() => paginate(currentPage - 1)}
                    >
                        Anterior
                    </button>
                    <span>{` Página ${currentPage} de ${totalPages} `}</span>
                    <button
                        className="bg-indigo-900 text-white px-3 py-2 rounded-xl"
                        disabled={currentPage >= totalPages}
                        onClick={() => paginate(currentPage + 1)}
                    >
                        Próxima
                    </button>
                </div>
            </div>
        )

    );
};

export default Pagination;
