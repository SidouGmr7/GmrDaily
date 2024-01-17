import { BASE_API_URL } from '@/configs'
import axios from 'axios'
import { METHODE } from './types'

type axiosDataProps = {
    endpoint: string
    method: METHODE
    data?: object
    id?: string | number
    onSuccess?: (res: any) => void
}

export async function axiosData({ endpoint, method, data, id, onSuccess }: axiosDataProps) {
    try {
        let res
        switch (method) {
            case 'GET':
                res = await axios.get(`${BASE_API_URL}${endpoint}`)
                break
            case 'GET_ID':
                res = await axios.get(`${BASE_API_URL}${endpoint}/${id}`)
                break
            case 'POST':
                res = await axios.post(`${BASE_API_URL}${endpoint}`, data)
                break
            case 'PATCH':
                res = await axios.patch(`${BASE_API_URL}${endpoint}/${id}`, data)
                break
            case 'DELETE':
                res = await axios.delete(`${BASE_API_URL}${endpoint}/${id}`)
                break
            default:
                throw new Error('Invalid method')
        }
        onSuccess && onSuccess(res.data)
        return res.data
    } catch (error) {
        throw error
    }
}
