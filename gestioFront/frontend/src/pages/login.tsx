import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../components/SignIn';

const apiUrl = import.meta.env.VITE_API_URL;

export default function Login() {

const navigate = useNavigate();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [showSignUp, setShowSignUp] = useState(false);
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
	e.preventDefault();
	fetch(`${apiUrl}/api/login_check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
	})
	.then(async (res) => {
		if (res.ok) {
			navigate('/gestio');
			console.log(document.cookie);
		} else {
			alert('Login failed');
		}
	})
	.catch((err) => {
		console.error('Fetch error:', err);
		alert('Network error');
	});
}
return (
	<>
<title>Gestio - Login</title>
<div className="flex items-center justify-center h-screen overflow-hidden">
	{showSignUp ? <SignIn showSignUp={()=> setShowSignUp(false)}/> : <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
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

	<div className="mb-6">
		<label
		className="block text-gray-700 text-sm font-bold mb-2"
		htmlFor="password"
		>
		Password
		</label>
		<input
		className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
		id="password"
		type="password"
		placeholder="******************"
		onChange={e => {setPassword(e.target.value)}}
		required/>
		<p className="text-red-500 text-xs italic">Please choose a password.</p>
	</div>

	<div className="flex items-center justify-between">
		<button className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-500 rounded" type="submit">Sign In</button>
		<button className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-2 px-4 border-b-4 border-sky-700 hover:border-sky-500 rounded" type='button' onClick={() => setShowSignUp(true)}>Sign Up</button>
	</div>
	</form> }
	
</div>
</>
);
}