import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { FiSmile, FiPaperclip } from "react-icons/fi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.user);
    const {messages} = useSelector(store=>store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, {message}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            dispatch(setMessages([...messages, res?.data?.newMessage]))
        } catch (error) {
            console.log(error);
        } 
        setMessage("");
    }
    
    return (
        <div className="p-3 bg-slate-100 dark:bg-slate-800 border-t border-blue-200/10">
            <form onSubmit={onSubmitHandler} className='flex items-center gap-2'>
                <div className='flex items-center gap-2 px-3'>
                    <button type="button" className="text-blue-500 hover:text-blue-600 transition-colors" aria-label="Add attachment">
                        <FiPaperclip className="w-5 h-5" />
                    </button>
                    <button type="button" className="text-blue-500 hover:text-blue-600 transition-colors" aria-label="Add emoji">
                        <FiSmile className="w-5 h-5" />
                    </button>
                </div>
                <div className='flex-1 relative'>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder='Type your message...'
                        className='w-full p-3 pr-12 rounded-full border-2 border-blue-200/30 focus:border-blue-400 focus:outline-none bg-white/80 dark:bg-slate-700 dark:text-white text-sm transition-all'
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={!message.trim()}
                    className={`rounded-full p-3 ${message.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'} text-white transition-colors`}
                >
                    <IoSend className="w-5 h-5" />
                </button>
            </form>
        </div>
    )
}

export default SendInput