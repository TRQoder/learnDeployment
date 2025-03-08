import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector,useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);
   
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='flex-1 flex flex-col h-full'>
                        <div className='flex gap-3 items-center bg-black/30 text-white px-6 py-3 mb-2'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full ring ring-purple-500 ring-offset-2 ring-offset-base-100'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p className='text-lg font-semibold'>{selectedUser?.fullName}</p>
                                    <span className={`text-sm ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                                        {isOnline ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <Messages />
                        </div>
                        <SendInput />
                    </div>
                ) : (
                    <div className='flex-1 flex flex-col justify-center items-center bg-black/20 text-center p-6'>
                        <h1 className='text-4xl text-white font-bold mb-4'>Welcome, {authUser?.fullName}! 👋</h1>
                        <p className='text-xl text-gray-300'>Select a conversation to start chatting</p>
                        <div className="mt-8 animate-bounce">
                            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                            </svg>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default MessageContainer