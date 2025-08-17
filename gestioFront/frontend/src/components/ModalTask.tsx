import { useRef } from 'react';
import TasksForm from './TasksForm';
import { useCloseModal } from '../hooks/useCloseModal';
import type { ModalTaskProps } from '../types/Modal';
const ModalTask = ({ ...props } : ModalTaskProps) => {
const modalRef = useRef<HTMLDivElement>(null);
useCloseModal(modalRef, props.onClose);
return (
    <div  className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-stone-50/80 z-50">
        <div className="bg-white rounded-md overflow-hidden max-w-md w-full mx-4 shadow-lg">
        <nav className="bg-black text-white flex justify-between px-4 py-2">
            
            {props.Task ? <span className="text-lg font-extrabold">Let's modify the task !</span> : <span className="text-lg font-extrabold">Let's add a task</span>}
            <button
            className="bg-red-300 bg-opacity-50 py-1 px-2 hover:bg-red-500 hover:bg-opacity-70 transition-all rounded-full text-sm"
            onClick={props.onClose}
            >
            &#10005;
            </button>
        </nav>
        <div ref={modalRef} className="text-3xl font-bold py-8 pl-4"><TasksForm onClose={props.onClose} Task={props.Task} showBanner={props.showBanner} setBannerNotificationMessage={props.setBannerNotificationMessage}></TasksForm></div>
        </div>
    </div>
);
};

export default ModalTask;