import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className='h-screen bg-fixed bg-slate-300'>
            <div className='flex justify-center py-60 gap-5'>
                <Link to='/dashboard/daily'>
                    <button className='buttonHome'>Dashboard</button>
                </Link>
            </div>
        </div>
    )
}
