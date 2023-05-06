import { useState } from "react"
import { OrganizationChart } from "primereact/organizationchart"
import treePeople from "../Data/treePeople.json"

export default function TreePeople() {
    const [data] = useState([treePeople])

    return (
        <div className='py-32'>
            <div className=''>
                <OrganizationChart value={data} />
            </div>
        </div>
    )
}
