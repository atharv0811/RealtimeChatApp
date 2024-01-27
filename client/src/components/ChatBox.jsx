import { SendOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import Avatar from './assets/avatar.svg'
import axios from 'axios'

const ChatBox = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [messageText, setMessageText] = useState('');

  const menuClick = () => {
    setMenuVisible(!menuVisible)
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    const data = { messageText: messageText };
    await axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/chat/add-message`, { data }, {
      headers: {
        'Authorization': localStorage.getItem('chatToken')
      }
    });
    setMessageText('')
  };

  return (
    <div className='w-4/6 h-screen flex flex-col items-center max-[625px]:w-full max-[625px]:hidden'>
      <div className='w-11/12 h-14 bg-sky-200 my-3 rounded-full flex items-center justify-between px-2 max-[625px]:w-[90%]'>
        <img src={Avatar} alt="" width={40} height={40} />
        <div className='ml-5'>
          <h3 className='text-lg'>Amey</h3>
          <p className='text-sm font-light text-gray-500'>online</p>
        </div>
        <div className="flex items-center relative" >
          <div className='w-10 h-10 rounded-[50%] hover:bg-sky-100 flex items-center justify-center cursor-pointer' onClick={menuClick}>
            <i className="fa-solid fa-ellipsis-vertical" ></i>
          </div>

          {menuVisible && (
            <div className="absolute top-[2rem] end-[1.2rem] bg-white border rounded p-2">
              <div className="text-white bg-sky-500 border-0 focus:outline-none hover:bg-sky-600 rounded text-sm w-36 text-center py-2 mt-1">Add Member</div>
              <div className="text-white bg-sky-500 border-0 focus:outline-none hover:bg-sky-600 rounded text-sm w-36 text-center py-2 mt-1">Set Admin</div>
              <div className="text-white bg-sky-500 border-0 focus:outline-none hover:bg-sky-600 rounded text-sm w-36 text-center py-2 mt-1">Remove Member</div>
              <div className="text-white bg-sky-500 border-0 focus:outline-none hover:bg-sky-600 rounded text-sm w-36 text-center py-2 mt-1">buttonText</div>
              <div className="text-white bg-sky-500 border-0 focus:outline-none hover:bg-sky-600 rounded text-sm w-36 text-center py-2 mt-1">Leave Group</div>
            </div>
          )}
        </div>
      </div>
      <div className='h-3/4 w-full overflow-auto scrollbar-hide border-b'>
        <div className='px-10 pt-8 pb-5'>
          <div className='flex justify-start'>
            <div className='max-w-[40%] bg-sky-500 rounded-b-xl rounded-tr-xl p-4 mb-4 text-white text-base max-[625px]:text-sm'>
              Hii
            </div>
          </div>
          <div className='flex justify-end'>
            <div className='max-w-[40%] bg-sky-600 rounded-b-xl rounded-tl-xl p-4 mb-4 text-white text-base max-[625px]:text-sm'>
              Hello
            </div>
          </div>

        </div>
      </div>

      <div className="p-3 w-full flex items-center">
        <input
          id="fileInput"
          type="file"
          className="hidden"
        />
        <i className="fa-solid fa-paperclip text-lg ml-2 mr-5 cursor-pointer"></i>
        <form className="flex w-full" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            className="w-11/12 px-3 py-3 border rounded shadow-md bg-sky-100 focus:outline-none"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            type="submit"
            className="mx-3 cursor-pointer bg-sky-100 hover:bg-sky-200 px-3 border rounded shadow-md"
          >
            <SendOutlined className="text-3xl mt-1" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatBox
