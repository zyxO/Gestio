import { apiUrl } from "../contants";
import type { Ilogin } from "../types/User";

export const Login = async (data: Ilogin) => {
    return await fetch(`${apiUrl}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/ld+json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
};
