import { apiUrl } from "../contants";

export const postProject = async(data: any) => {
    if (data.length === 0) {
        throw new Error('No data provided for project creation');
    }
    console.log('Data to post:', data);
    const res = await fetch(`${apiUrl}/api/projects`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/ld+json' },
                    credentials: 'include',
                    body: JSON.stringify(data)
                })
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to post project');
    }
    return res.json();
}
