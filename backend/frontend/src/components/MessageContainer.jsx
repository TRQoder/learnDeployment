import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';
import { IoArrowBack } from "react-icons/io5";

const MessageContainer = ({ isMobile }) => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);
    
    const handleBackClick = () => {
        dispatch(setSelectedUser(null));
    };
   
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-900'>
                        <div className='flex gap-3 items-center bg-blue-800 text-white px-4 py-3 shadow-md'>
                            {isMobile && (
                                <button 
                                    onClick={handleBackClick} 
                                    className="mr-2 rounded-full p-1 hover:bg-blue-700 transition-all"
                                    aria-label="Back to users"
                                >
                                    <IoArrowBack className="w-6 h-6" />
                                </button>
                            )}
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full ring ring-blue-400 ring-offset-2 ring-offset-base-100'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p className='text-lg font-semibold'>{selectedUser?.fullName}</p>
                                    <span className={`text-sm px-2 py-1 rounded-full ${isOnline ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                        {isOnline ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-100 dark:bg-slate-800">
                            <Messages />
                        </div>
                        <SendInput />
                    </div>
                ) : (
                    <div className='flex-1 flex flex-col justify-center items-center bg-gradient-to-b from-blue-900/10 to-indigo-800/10 text-center p-6'>
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </svg>
                        </div>
                        <h1 className='text-3xl text-blue-800 dark:text-blue-400 font-bold mb-4'>Welcome, {authUser?.fullName}!</h1>
                        <p className='text-xl text-slate-600 dark:text-slate-300 mb-6'>Select a conversation to start chatting</p>
                        {isMobile && (
                            <div className="mt-4 animate-pulse">
                                <p className="text-blue-600 dark:text-blue-400">Browse users from the list</p>
                            </div>
                        )}
                    </div>
                )
            }
        </>
    )
}

export default MessageContainer