import { create } from 'zustand'
import { TreeNode } from '../../TreeListMongosse/types'

interface NodeSDataModel {
    nodesDataStored: TreeNode[] | undefined
    LastNodeCreatedStored: TreeNode | null
    setLastNodeCreated: (data: TreeNode) => void
    setNodesData: (data: TreeNode[]) => void
    LastNodeDeletedStored: TreeNode | null
    setLastNodeDeleted: (data: TreeNode) => void
}

export const useNodesDataModel = create<NodeSDataModel>((set) => ({
    nodesDataStored: [],
    LastNodeCreatedStored: null,
    setLastNodeCreated: (data) => set({ LastNodeCreatedStored: data }),
    setNodesData: (data) => set({ nodesDataStored: data }),
    LastNodeDeletedStored: null,
    setLastNodeDeleted: (data) => set({ LastNodeDeletedStored: data }),
}))
