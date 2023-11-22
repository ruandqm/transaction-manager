import api from "./api"

export default async function fetcher(url) {
    const response = await api.get(url)
    return response.data
}