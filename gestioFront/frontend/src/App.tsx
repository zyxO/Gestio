import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login.tsx';
import Gestio from './pages/gestio.tsx';

function App() {
  return (
    <div className='h-full overflow-hidden'>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Navigate to="/login"/>} />
          <Route index path="/login" element={<Login />} />
          <Route path="/gestio" element={<Gestio />} />
        </Routes>
      </BrowserRouter>
      </div>
  )
}
export default App
