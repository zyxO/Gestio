import { apiUrl } from "../contants";

export const deleteTask = async (id: number) => {
    console.log('Deleting task with ID:', id);
    const controller = new AbortController();
    const response = await fetch(`${apiUrl}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        signal: controller.signal,
    });
    
    return response;
} 