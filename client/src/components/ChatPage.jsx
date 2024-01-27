import React from 'react'
import ChatList from './ChatList'
import ChatBox from './ChatBox'

const ChatPage = () => {
  return (
    <div className="w-screen flex bg-sky-50">
      <ChatList />
      <ChatBox />
    </div>
  )
}

export default ChatPage
