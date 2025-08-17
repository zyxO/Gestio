import DrawOutlineButton from './DrawOutlineButton'
import { useNavigate } from 'react-router-dom';
import { Logout } from '../api/Logout';
import type { NavBarProps } from '../types/Navbar';

const NavBar = ({searchItem, handleSearchChange, handleShowModal, username, logoutSpinnerOn,logoutSpinnerOff}: NavBarProps) => {
    const navigate = useNavigate();
    const handleLogout = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        logoutSpinnerOn();
        const res = await Logout();
        if (res && res.status === 200) {
            logoutSpinnerOff();
            navigate('/login');
        } else {
            logoutSpinnerOff();
            console.error('Logout failed');
        }
    }

    return(        
    <nav className="bg-gradient-to-l from-slate-400 to-slate-600 text-slate-800 shadow-md rounded p-6 mb-4">
        <div className="p-6 mx-auto text-gray-600 capitalize dark:text-gray-300 container flex gap-4 h-screen max-h-20">
            <DrawOutlineButton onClick={() => handleShowModal('task')}>+ tâche</DrawOutlineButton>
            <DrawOutlineButton onClick={() => handleShowModal('project')}>+ projet</DrawOutlineButton>
            <div className="bg-white px-1 py-1 rounded-full border border-blue-500 overflow-hidden justify-center self-center ml-auto flex-1">
                <input placeholder='Search task...' className="w-full outline-none bg-white pl-4 text-sm text-black" value={searchItem} onChange={handleSearchChange}/>
            </div>
            <div className='relative flex items-center justify-center gap-2 ml-auto shrink-0'>
                <div className='inset-y-0 left-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 m-auto" color='white'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
                <div className='inset-y-0 right-0 text-white'>{username}</div>
            </div>
            <button className='border-2 border-rose-500 bg-rose-400 hover:bg-rose-600 hover:border-rose-600
            hover:bg-opacity-70 transition-all text-white 
            focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800' onClick={handleLogout}>Log out !</button>
        </div>
    </nav>
    );
}
export default NavBar