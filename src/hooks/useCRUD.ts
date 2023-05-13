import axios from "axios"
import { baseUrl } from "../config/config"
import { useLocation } from "react-router-dom"
import { useQuery } from "react-query"

export function useCRUD() {
    const path = useLocation().pathname.split("/")
    const location = path[path.length - 1]

    const { data, isFetching, refetch } = useQuery(["data", [location]], async () => {
        return axios.get(`${baseUrl}${location}`).then((res) => res.data)
    })

    const updateData = async (id: string, data: any) => {
        await axios.patch(`${baseUrl}${location}/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
    const addData = async (data: any) => {
        await axios.post(`${baseUrl}${location}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
    const deleteData = async (id: string) => {
        await axios.delete(`${baseUrl}${location}/${id}`)
    }

    return { data, isFetching, refetch, updateData, addData, deleteData }
}
