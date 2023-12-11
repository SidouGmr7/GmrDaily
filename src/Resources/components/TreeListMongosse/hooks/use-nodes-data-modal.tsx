import { create } from 'zustand'
import axios from 'axios'

import { TreeNode } from '../../treeList/types'
import { BASE_API_URL } from '@/configs'

interface NodeSDataModel {
    nodesData: TreeNode[] | undefined
    nodeCreated: TreeNode | undefined
    fetchNodes: () => Promise<TreeNode[] | undefined>
    createNode: (props: any) => Promise<void>
    deleteNode: (props: any) => Promise<void>
}

export const useNodesDataModel = create<NodeSDataModel>((set) => ({
    nodesData: [],
    nodeCreated: {},
    fetchNodes: async () => {
        try {
            const res = await axios.get(`${BASE_API_URL}node`)
            return res.data as TreeNode[]
        } catch (error) {
            throw error
        }
    },
    createNode: async ({ newNodeValues }) => {
        try {
            const res = await axios.post(`${BASE_API_URL}node`, newNodeValues)
            set({ nodeCreated: res.data })
        } catch (error) {
            throw error
        }
    },
    deleteNode: async ({ id }) => {
        try {
            await axios.delete(`${BASE_API_URL}node/${id}`)
        } catch (error) {
            throw error
        }
    },
}))
