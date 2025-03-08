import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { authUser, selectedUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [authUser, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700 p-4 flex items-center justify-center">
      <div className='w-full max-w-7xl flex flex-col md:flex-row h-[90vh] rounded-lg overflow-hidden bg-white/10 backdrop-blur-lg shadow-2xl'>
        {(!isMobile || (isMobile && !selectedUser)) && (
          <Sidebar className={isMobile && selectedUser ? 'hidden' : 'block'} />
        )}
        
        {(!isMobile || (isMobile && selectedUser)) && (
          <MessageContainer isMobile={isMobile} />
        )}
      </div>
    </div>
  )
}

export default HomePage