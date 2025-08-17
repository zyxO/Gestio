import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../contants";
import type { Task } from '../types/Task';
export const useGetProjectById = (Task?:Task) => {
    const [project, setProject] = useState<any>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!Task?.projectId) return;
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${apiUrl}${Task?.projectId}`, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/ld+json',
                        'Accept': 'application/ld+json'
                    },
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch project');
                }
                const data = await response.json();
                if (data.code === 401) {
                    navigate('/login');
                } else {
                    console.log("Project data:", data);
                    setProject(data);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, [navigate, Task?.projectId]);

    return project;
}