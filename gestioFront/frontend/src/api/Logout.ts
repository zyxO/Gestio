import { apiUrl } from "../contants";

export const Logout = async () => {
    const res = await fetch(`${apiUrl}/api/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        });
    return res;
}