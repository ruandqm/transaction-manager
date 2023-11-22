class Pagination {
    constructor(model, query = {}, page, populates = null, sortBy = "") {
        this._model = model;
        this._query = query;
        this._pageSize = page.pageSize;
        this._pageNumber = page.pageNumber;
        this._populates = populates;
        this._sortBy = sortBy;
    }

    async getCount() {
        const count = await this._model.find(this._query || {}).countDocuments();
        return count;
    }

    getPage() {
        return Number(this._pageNumber) || 1;
    }

    getPaginatedData() {
        let queryWithPopulate = this._model.find(this._query || {});

        if (this._populates) {
            this._populates.forEach((pop) => {
                queryWithPopulate = queryWithPopulate.populate(pop);
            });
        }

        return queryWithPopulate;
    }

    async paginate() {
        const query = this.getPaginatedData();
        const results = await query
            .limit(parseInt(this._pageSize))
            .skip(parseInt(this._pageSize * (this._pageNumber - 1)))
            .sort(this._sortBy);

        const paginatedResults = await this.getResponseObject(results);
        return paginatedResults;
    }

    async getResponseObject(data) {
        const count = await this.getCount();
        return {
            page: this.getPage(),
            pages: Math.ceil(count / this._pageSize),
            pageSize: this._pageSize,
            totalItems: count,
            data,
        };
    }
}

module.exports = Pagination;
