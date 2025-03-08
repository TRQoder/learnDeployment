import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';
 
const Sidebar = () => {
    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!");
        }
    }
    return (
        <div className='w-full md:w-80 border-r border-white/20 p-4 flex flex-col bg-black/20'>
            <form onSubmit={searchSubmitHandler} className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input input-bordered rounded-lg flex-1 bg-white/10 text-white placeholder-gray-400 border-white/20 focus:border-purple-500 transition-all'
                    type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-purple-600 hover:bg-purple-700 text-white border-none'>
                    <BiSearchAlt2 className='w-5 h-5 outline-none'/>
                </button>
            </form>
            <div className="divider before:bg-white/20 after:bg-white/20"></div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <OtherUsers/>
            </div>
            <div className='mt-4 flex justify-center'>
                <button 
                    onClick={logoutHandler} 
                    className='btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none w-full max-w-xs transition-all duration-300 transform hover:scale-105'
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar