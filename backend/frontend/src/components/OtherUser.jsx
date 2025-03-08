import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store=>store.user);
    const isOnline = onlineUsers?.includes(user._id);
    
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }
    
    return (
        <div className="mb-2">
            <div 
                onClick={() => selectedUserHandler(user)} 
                className={`
                    ${selectedUser?._id === user?._id 
                        ? 'bg-blue-700/30 border-blue-500' 
                        : 'border-transparent hover:bg-white/10'
                    } 
                    flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                    border-l-4
                `}
            >
                <div className={`avatar ${isOnline ? 'online online-indicator' : ''}`}>
                    <div className={`w-12 h-12 rounded-full ring-2 ${isOnline ? 'ring-green-400' : 'ring-gray-400'} overflow-hidden`}>
                        <img 
                            src={user?.profilePhoto} 
                            alt={user?.fullName}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
                <div className='flex-1'>
                    <div className='flex flex-col'>
                        <h3 className="font-semibold text-white">{user?.fullName}</h3>
                        <p className="text-sm text-blue-100/60">
                            {isOnline ? 'Active now' : 'Offline'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtherUser