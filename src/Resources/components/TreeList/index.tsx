import { Tree } from 'primereact/tree'
import _ from 'lodash'

import { Options } from './types'
import { nodeTemplate } from './NodeTemplate'
// import { useLocalStorage } from '@/Resources/fetchData/useLocalStorage'
import { useSelectionModel } from './state/use-selection-model'
import { useCheckboxDataModel } from './state/use-checkbox-data-modal'
import { HeadButtons } from './components/HeadButtons'
import { useNodesDataModel } from './state/use-nodes-data-modal'
import './styles.css'

export default function TreeList() {
    const { onSelection } = useSelectionModel()
    const { nodesDataStored } = useNodesDataModel()
    const { selectedKeys, setSelectedKeys } = useCheckboxDataModel()
    // const { localStorageData } = useLocalStorage('nodes', nodesDataStored)

    return (
        <div>
            <HeadButtons />
            <div>
                <Tree
                    value={nodesDataStored}
                    className='w-full'
                    filter
                    filterMode='strict'
                    filterPlaceholder='Strict Filter'
                    nodeTemplate={(node, options) => nodeTemplate(node, options as Options)}
                    selectionMode='checkbox'
                    selectionKeys={selectedKeys}
                    onSelectionChange={(e) => {
                        onSelection && setSelectedKeys(e.value)
                    }}
                />
            </div>
        </div>
    )
}
