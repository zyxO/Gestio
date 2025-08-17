import React, { useState } from "react";
import { Login } from "../api/Login";
interface SignProps {
    showSignUp: () => void; 
}

const SignIn = ({showSignUp}: SignProps) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword,setConfirmPassword] = useState('');
const [email,setEmail] = useState('');
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (password !== confirmPassword) return;
        const data = {
            "username": username,
            "password": password,
            "created_at": new Date(),
            "email": email
        }
        await Login(data)
        .then(async (res) => {
        if (res.ok) {
            showSignUp();
        } else {
            alert('signin failed');
        }
        })
        .catch((err) => {
        console.error('Fetch error:', err);
        alert('Network error');
        });
        
}
return(
<div>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
            <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
            >
            Username
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={e => {setUsername(e.target.value)}}
            required/>
        </div>
        <div className="mb-4">
            <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
            >
            email
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="email@email.com"
            onChange={e => {setEmail(e.target.value)}}
            required/>
        </div>
        <div className="mb-4">
            <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
            >
            Password
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={e => {setPassword(e.target.value)}}
            required/>
        </div>
        <div className="mb-6">
            <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
            >
            Confirm Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={e => {setConfirmPassword(e.target.value)}}
            required/>
        </div>
        <div className="flex justify-between items-center">
            <button className="bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 border-b-4 border-rose-700 hover:border-rose-500 rounded" type='button' onClick={showSignUp}>Cancel</button>
            <button className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-2 px-4 border-b-4 border-sky-700 hover:border-sky-500 rounded" type='submit'>Sign Up</button>
        </div>
        </form>
</div>);

}

export default SignIn;