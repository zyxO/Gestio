import { useEffect, useState } from "react";
import type { Task } from '../types/Task';
import { apiUrl } from "../contants";
import { useNavigate } from "react-router-dom";
export const useComments = (Task?: Task) => {
    const [comments,setComments] = useState<any[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!Task?.comments) return;
        const controller = new AbortController();
        const fetchComments = async () => {
            if (!Task?.comments) return;
            const results = await Promise.all(Task.comments.map(async (d) => {
                    const url = `${apiUrl}${d}`;
                    console.log("Fetching:", url);
                    try {
                        const response = await fetch(url, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/ld+json',
                                'Accept': 'application/ld+json'
                            },
                            credentials: 'include',
                            signal: controller.signal,
                        });
                        const data = await response.json();
                        if(data.code == 401) navigate("/login");
                        if(data.status === 404) return null;
                        return data;
                    } catch (error) {
                        console.error("Fetch error for", url, error);
                        return null;
                    }
                }));
            const uniqueMapper = new Map();

            for (const obj of results) {
                if (obj?.id){
                    uniqueMapper.set(obj.id, obj);
                }
            }
            const commentArr = Array.from(uniqueMapper.values());
            setComments(commentArr);
        }
        fetchComments();
        return () => {
            controller.abort();
        };
    }, [Task, navigate]);
    return {comments, setComments};
}