import { useEffect, useState, type SetStateAction } from 'react';
import TaskColumn from '../components/TaskColumn';
import type { Task } from '../components/TaskColumn';
import NavBar from '../components/Navbar';
import ModalTask from '../components/ModalTask'
import ModalProject from '../components/ModalProject'
import {DndContext,MouseSensor, useSensor} from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';
import Droppable from '../components/Droppable';
import BannerNotification from '../components/BannerNotification';
import { apiUrl } from '../contants';
export default function Gestio() {
    const navigate = useNavigate();
    const [refreshKey, setRefreshKey] = useState(0);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState<string | null>(null);
    const [searchItem,setSearchItem] = useState('');
    const [username,setUsername] = useState('');
    const [filteredTask,setFilteredTask] = useState<Task[]>([]);
    const [logoutSpinner,setLogoutSpinner] = useState(false);
    const [showBanner,setShowBanner] = useState(false);
    const [BannerNotificationMessage, setBannerNotificationMessage] = useState('');
    const handleShowModal = (type: SetStateAction<string | null>) => {
        setIsModalVisible(true);
        setModalType(type)
    }
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setModalType(null);
        setRefreshKey(prev => prev + 1);
    }
    const handleSpinnerOpen = () => {
        setLogoutSpinner(true);
    }
    const handleSpinnerClose = () => {
        setLogoutSpinner(false);
    }
    useEffect(() => {
        fetch(`${apiUrl}/api/tasks`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/ld+json'
            },
            credentials: 'include'
        })
        .then(res => {
            if (res.status === 401) navigate('/login');
            return res.json();
        })
        .then(data => {
        setTasks(data['member'] ?? []);
        setFilteredTask(data['member'] ?? []);
    })
    }, [navigate, refreshKey]);
    useEffect(() => {
        fetch(`${apiUrl}/api/me`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/ld+json'
            },
            credentials: 'include'
        })
        .then(res => {
            if (res.status === 401) navigate('/login');
            return res.json();
        })
        .then(data => {
            setUsername(data.username);
    })
    }, [navigate, refreshKey]);
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
        distance: 10,
        },
    });
    function handleDragEnd(event:any) {
        const {over,active} = event;
        const taskId = parseInt(active.id);
        const newStatus = parseInt(over.id); 
        setTasks(prev =>
            prev.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
        const data = {status:newStatus}
        const reponse = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/merge-patch+json' },
            credentials: 'include',
            body: JSON.stringify(data),
            });
            if (res.status === 401) navigate('/login');
            if (res.ok) {
                setRefreshKey(prev => prev + 1);
                setTimeout(() => {setShowBanner(true);}, 800);
                setBannerNotificationMessage('Tâche déplacée avec succès');

            } else {
                const errorData = await res.json();
                console.error('Server error:', errorData);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            alert('Network error');
        }
        };
        reponse();
        }
        const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
            const value = e.currentTarget.value;
            setSearchItem(value);
            const filtered = value
                ? tasks.filter((task) =>
                    task.name?.toLowerCase().includes(value.toLowerCase())
                )
                : tasks;
            setFilteredTask(filtered);
        }
    return(
        <>
        <title>Gestio - Task</title>
        <NavBar searchItem={searchItem} handleSearchChange={handleSearchChange} handleShowModal={handleShowModal} username={username} logoutSpinnerOn={handleSpinnerOpen} logoutSpinnerOff={handleSpinnerClose} />
        <div className="flex absolute left-0 top-0">
        {showBanner && (<BannerNotification message={BannerNotificationMessage} onClose={() => setShowBanner(false)} />)}
        </div>
            <div className="grid grid-cols-3 gap-4">
                    <DndContext sensors={[mouseSensor]} onDragEnd={handleDragEnd}>
                        <Droppable key={0} id="0"><TaskColumn status={0} tasks={filteredTask} title="À faire" onRefresh={() => setRefreshKey(prev => prev + 1)}  showBanner={() => setShowBanner(true)} setBannerNotificationMessage={setBannerNotificationMessage} /></Droppable>
                        <Droppable key={1} id="1"><TaskColumn status={1} tasks={filteredTask} title="En cours" onRefresh={() => setRefreshKey(prev => prev + 1)} showBanner={() => setShowBanner(true)} setBannerNotificationMessage={setBannerNotificationMessage} /></Droppable>
                        <Droppable key={2} id="2"><TaskColumn status={2} tasks={filteredTask} title="Terminée" onRefresh={() => setRefreshKey(prev => prev + 1)} showBanner={() => setShowBanner(true)} setBannerNotificationMessage={setBannerNotificationMessage} /></Droppable>
                    </DndContext>
            </div>
        {isModalVisible && modalType === 'task' && <ModalTask onClose={handleCloseModal} showBanner={() => {setShowBanner(true)}} setBannerNotificationMessage={setBannerNotificationMessage} />}
        {isModalVisible && modalType === 'project' && <ModalProject onClose={handleCloseModal} showBanner={() => {setShowBanner(true)}} setBannerNotificationMessage = {setBannerNotificationMessage} />}
        {logoutSpinner && (<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-stone-50/80 z-50'>
            <div className="text-center">
                <div aria-roledescription="output">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>)}
        </>
    )
}

