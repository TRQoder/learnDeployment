import React, { useEffect, useRef } from 'react'
import {useSelector} from "react-redux";
import { format } from 'date-fns';

const Message = ({message}) => {
    const scroll = useRef();
    const {authUser, selectedUser} = useSelector(store=>store.user);
    const isCurrentUser = message?.senderId === authUser?._id;

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);
    
    // Format timestamp if it exists, otherwise use placeholder
    const formattedTime = message?.createdAt 
        ? format(new Date(message.createdAt), 'h:mm a')
        : 'just now';
    
    return (
        <div 
            ref={scroll} 
            className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'} mx-2 my-3 fade-in`}
        >
            <div className="chat-image avatar">
                <div className="w-10 rounded-full shadow-md border-2 border-white/30">
                    <img 
                        alt={isCurrentUser ? authUser?.fullName : selectedUser?.fullName} 
                        src={isCurrentUser ? authUser?.profilePhoto : selectedUser?.profilePhoto} 
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="chat-header mb-1">
                <span className="text-xs font-semibold opacity-70">
                    {isCurrentUser ? 'You' : selectedUser?.fullName}
                </span>
                <time className="text-xs opacity-50 ml-2">{formattedTime}</time>
            </div>
            <div 
                className={`
                    chat-bubble max-w-xs md:max-w-md break-words shadow-md
                    ${isCurrentUser 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-slate-800'
                    }
                `}
            >
                {message?.message}
            </div>
        </div>
    )
}

export default Message