import { useState } from 'react';
import ModalTask from './ModalTask';
import Draggable from '../components/Draggable';
import Details from './Details';
import type { Task , TaskColumnProps } from '../types/Task';
import { deleteTask } from '../api/Task';

const TaskColumn = ({ status, tasks, title, onRefresh, showBanner,setBannerNotificationMessage}: TaskColumnProps) => {
    const filteredTasks = tasks.filter(task => task.status === status);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState<string | null>(null);
    const [taskToModify,setTaskToModify] = useState<Task|undefined>(undefined);
    const [DetailTask,setDetailTask] = useState<Task|undefined>(undefined);
    const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
    async function handleDelete(id: number) {
        deleteTask(id)
            .then(response => {
                if (response.ok) {
                    showBanner();
                    setBannerNotificationMessage('Task deleted successfully');
                    onRefresh();
                } else {
                    throw new Error('Failed to delete task');
                }
            })
            .catch(error => {
                console.error('Error deleting task:', error);
                showBanner();
                setBannerNotificationMessage('Error deleting task');
            });
    }
    function OpenModifyModal(task:Task): void {
        setIsModalVisible(true);
        setModalType('task');
        setTaskToModify(task);
        
    }
    function SendTaskTomodify(task:Task) :void {
        setDetailTask(task);
    }
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setModalType(null);
        onRefresh();
    }
    return (
                <div className='max-h-screen'>
                    <div className="text-xl font-extrabold mb-4 box-border border-2 bg-transparent border-transparent shadow-md shadow-neutral-400 rounded">{title}</div>
                    {filteredTasks.map(task => (
                    <Draggable key={task.id} id={task.id.toString()}>
                        <div key={task.id} className="max-w-screen rounded overflow-hidden shadow-lg bg-stone-50 mb-2 flex relative items-center justify-center">
                            <button className="[writing-mode:sideways-lr] whitespace-nowrap inline-flex items-center justify-center shrink-0 max-w-16 outline-2 font-extrabold rounded-l-lg
                            outline-cyan-500/20 relative h-40 w-40 overflow-hidden border
                            border-cyan-500 bg-white px-3 text-cyan-500 shadow-2xl transition-all 
                            before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0
                            before:bg-cyan-500 before:transition-all before:duration-100 
                            hover:text-white hover:shadow-cyan-500 
                            hover:before:left-0 hover:before:w-full" 
                            onClick={() => {
                                setIsDetailVisible(true);
                                SendTaskTomodify(task)
                            }}>
                                <span className="relative z-10">Details</span>
                            </button>
                            <button className="" onClick={() => handleDelete(task.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 absolute top-0 right-0 bg-red-300 bg-opacity-100 py-2 px-2 hover:bg-red-500 hover:bg-opacity-70 transition-all">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <button onClick={() => OpenModifyModal(task) }>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 absolute right-0 bottom-0 bg-yellow-300 bg-opacity-100 py-2 px-2 hover:bg-yellow-500 hover:bg-opacity-70 transition-all">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                            <div className="px-4 py-2 flex-1">
                                <div className="font-bold text-lg mb-2">{task.name}</div>
                                <p className="text-gray-700 text-base">{task.description}</p>
                            </div>
                        </div>
                    </Draggable>
                    ))}
                    {isModalVisible && modalType === 'task' && <ModalTask onClose={handleCloseModal} Task={taskToModify} showBanner={showBanner} setBannerNotificationMessage={setBannerNotificationMessage}/>}
                    {isDetailVisible && <Details DetailVisible={() => setIsDetailVisible(false)} Task={DetailTask} showBanner={showBanner} setBannerNotificationMessage={setBannerNotificationMessage} />}
                </div>
        );
};

export default TaskColumn;