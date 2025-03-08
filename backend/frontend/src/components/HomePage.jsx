import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-4 flex items-center justify-center">
      <div className='w-full max-w-7xl flex flex-col md:flex-row h-[90vh] rounded-lg overflow-hidden bg-white/10 backdrop-blur-lg shadow-2xl'>
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  )
}

export default HomePage