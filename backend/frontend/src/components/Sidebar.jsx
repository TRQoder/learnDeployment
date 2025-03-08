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
        <div className='w-full md:w-80 border-r border-blue-200/30 p-4 flex flex-col bg-white/10 backdrop-filter backdrop-blur-lg'>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Chats</h2>
                <button 
                    onClick={logoutHandler} 
                    className='btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none px-4 transition-all duration-300'
                >
                    Logout
                </button>
            </div>
            <form onSubmit={searchSubmitHandler} className='flex items-center gap-2 mb-4'>
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input input-bordered rounded-lg flex-1 bg-white/20 text-white placeholder-gray-300 border-blue-200/30 focus:border-blue-400 transition-all'
                    type="text"
                    placeholder='Search users...'
                />
                <button type='submit' className='btn bg-blue-600 hover:bg-blue-700 text-white border-none'>
                    <BiSearchAlt2 className='w-5 h-5 outline-none'/>
                </button>
            </form>
            <div className="divider before:bg-blue-200/30 after:bg-blue-200/30 my-2">Users</div>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                <OtherUsers/>
            </div>
        </div>
    )
}

export default Sidebar