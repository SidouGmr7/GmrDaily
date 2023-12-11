import { create } from 'zustand'
import { TreeNode } from '../../treeList/types'

interface NodeSDataModel {
    nodesDataStored: TreeNode[] | undefined
    LastNodeCreatedStored: TreeNode | undefined
    setLastNodeCreated: (data: TreeNode) => void
    setNodesData: (data: TreeNode[]) => void
}

export const useNodesDataModel = create<NodeSDataModel>((set) => ({
    nodesDataStored: [],
    LastNodeCreatedStored: {},
    setLastNodeCreated: (data) => set({ LastNodeCreatedStored: data }),
    setNodesData: (data) => set({ nodesDataStored: data }),
}))
