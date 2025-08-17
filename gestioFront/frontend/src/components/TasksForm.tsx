import React, { useMemo, useState, type ChangeEvent } from "react";
import { apiUrl } from "../contants";
import type { Task, TasksFormProps } from "../types/Task";
import type { Project } from "../types/Project";
import { getInitialTask } from "../utils/taskUtils"; // Assuming you have a utility function to get initial task state
const toIri = (resource: any, id: any) => `/api/${resource}/${id}`;

const AddTask = ({ onClose, Task, showBanner,setBannerNotificationMessage } : TasksFormProps) => {
const [users, setUsers] = useState<any[]>([]);
const [projects, setProjects] = useState<Project[]>([]);
const [FormTask, setFormTask] = useState<Task>(() => getInitialTask(Task));

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormTask(prev => ({
    ...prev,
    [name]: ['status','userId','projectId'].includes(name) ? parseInt(value) : value
    }));
};
useMemo(() => {
    const controller = new AbortController
    fetch(`${apiUrl}/api/users`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/ld+json'
    },
    credentials: 'include',
    signal: controller.signal
}).then(response => response.json()).then(data => {if (data?.['member']) {
    setUsers(data['member']);
}});
    return () => {
        controller.abort();
    };
}, []);
useMemo(() => {
    fetch(`${apiUrl}/api/projects`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/ld+json'
    },
    credentials: 'include'
}).then(response => response.json()).then(data => {if (data?.['member']) {
    setProjects(data['member']);
}});
}, []);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        if(typeof Task !== 'undefined') {
        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            userId: toIri('users',formData.get('userId')),
            projectId: toIri('projects',formData.get('projectId')),
            status: parseInt(e.currentTarget.status.value),
        }
        fetch(`${apiUrl}/api/tasks/${Task.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/merge-patch+json' },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(async (res) => {
            if (res.ok) {
                setBannerNotificationMessage('Tache modifiée avec succès');
                showBanner();
                onClose();
            }
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        }); 
        } else {
            const data = {
                name: formData.get('name'),
                description: formData.get('description'),
                userId: toIri('users',formData.get('userId')),
                projectId: toIri('projects',formData.get('projectId')),
                status: parseInt(e.currentTarget.status.value),
                created_at: new Date()
            }
            fetch(`${apiUrl}/api/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/ld+json' },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            .then(async (res) => {
                if (res.ok) {
                    showBanner();
                    onClose();
                }
            })
            .catch((err) => {
                console.error('Fetch error:', err);
            }); 
        }

    }
    return (
        <form onSubmit={handleSubmit}>
        <div>
            <div className="flex gap-2 items-center justify-center"> 
            <label className="w-32 text-base" htmlFor="name">Task's name</label>
            <input
                className="mb-2 w-60 text-base shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name='name'
                id='name'
                type='text'
                placeholder='task name'
                value={FormTask.name ?? ''}
                onChange={handleChange}
                required
                /></div>
            <div className="flex gap-2 items-center justify-center">
            <label className="w-32 text-base" htmlFor="description">Description</label>
            <input
                className="mb-4 text-base w-60 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name='description'
                id='description'
                type='text'
                placeholder='description'
                value={FormTask.description ?? ''}
                onChange={handleChange}
                required />
            </div>
            
            <div className="flex gap-2 items-center justify-center mb-4"> 
                <label className="text-base inline-block" htmlFor="status">Choose a status</label>
                <select className="w-60 text-base rounded shadow border py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center" name="status" value={FormTask.status?.toString() ?? ''} onChange={handleChange} required>
                    <option value="">Choose please</option>
                    <option value='0'>A faire</option>
                    <option value='1'>En cours</option>
                    <option value='2'>Terminée</option>
                </select>
            </div>
            
            <div className="flex gap-2 items-center justify-center mb-4">
                <label className="w-32 text-base inline-block" htmlFor="userId">Assignees</label>
                <select className="w-60 text-base rounded shadow border py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center" name="userId" value={FormTask.userId?.toString().slice(-1) ?? ''} onChange={handleChange} required>
                <option className="" value=""></option>
                {users.map(d => {
                    return <option key={d.id} value={d.id}>{d.username}</option>;
                })}
                </select>
            </div>
            <div className="flex gap-2 items-center justify-center mb-4">
                    <label className="w-32 text-base inline-block" htmlFor="projectId">Projects</label>
                    <select className="w-60 text-base rounded shadow border py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center" name="projectId" value={FormTask.projectId?.toString().slice(-1) ?? ''} onChange={handleChange} required>
                        <option value=""></option>
                        {projects.map(d => {
                            return <option key={d.id} value={d.id}>{d.name}</option>;
                        })}
                    </select>
            </div>
            <button type='submit'className="mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">{Task ? 'Modify Task' : ' + Add Task'}</button>
        </div>
        </form>
    );
};
export default AddTask;