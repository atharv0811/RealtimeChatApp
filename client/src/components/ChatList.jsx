import React, { useState } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import axios from 'axios'

const ChatList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('contact');
    const [contactName, setContactName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [groupName, setGroupName] = useState('');

    const addContactModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addContact = async () => {
        const data = { name: contactName, phoneNo: phoneNumber }
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/chat/add-contact`, { data }, {
            headers: {
                "Authorization": localStorage.getItem('chatToken')
            }
        })
        setContactName('');
        setPhoneNumber('');
        handleCancel();

    };

    return (
        <div className="w-2/6 h-screen bg-sky-100 max-[625px]:w-full max-[625px]:h-screen ">
            <div className="border-b-2 py-4 px-2 max-[625px]:mr-2">
                <input
                    type="text"
                    placeholder="Search for chat"
                    className="py-2 px-2.5 border-2 border-gray-200 rounded-2xl w-full bg-sky-50"
                />
            </div>
            <div className="ml-5 mt-5 h-[73%] overflow-auto scrollbar-hide">
                <div className="text-lg text-blue-500">Messages</div>
                <div>
                    {/* {chats.map(chat => {
                        const latestMessageInfo = latestMessages.find(item => item.chatId === chat.id);
                        return (
                            <div className="flex item-center my-6 cursor-pointer" onClick={() => chatClick(chat.memberId, chat.name, chat.type)}>
                                <div className="p-0.5 bg-sky-600 rounded-full w-10 h-10">
                                    <img src={'../assets/avatar.svg'} alt="" width={40} height={40} />
                                </div>
                                <div className="ml-5 flex items-center flex-col">
                                    <h3 className="text-lg">{chat.name}</h3>
                                    <p className="text-xs">{latestMessageInfo ? latestMessageInfo.message : ''}</p>
                                </div>
                            </div>
                        )
                    })} */}
                </div>
            </div>

            <div className='flex flex-row-reverse mr-5 absolute bottom-2 max-[625px]:right-[-3%] min-[625px]:right-[65.3%]'>
                <PlusCircleOutlined className="text-4xl p-2 cursor-pointer  text-sky-600"
                    onClick={addContactModal}
                />
            </div>

            <Modal
                title={activeButton === 'contact' ? 'Add Contact' : 'Create Group'}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
            >
                <div className="flex justify-around">
                    <button className={`flex w-[40%] justify-center rounded-md bg-sky-${activeButton === 'contact' ? '600' : '200'} px-3 mt-2 mb-4 py-1.5 text-${activeButton === 'contact' ? 'white' : 'black'}`}
                        onClick={() => { setActiveButton('contact') }}
                    >
                        Add Contact
                    </button>
                    <button className={`flex w-[40%] justify-center rounded-md bg-sky-${activeButton === 'group' ? '600' : '200'} px-3 mt-2 mb-4 py-1.5 text-${activeButton === 'group' ? 'white' : 'black'}`}
                        onClick={() => { setActiveButton('group') }}
                    >
                        Create Group
                    </button>
                </div>
                <form>
                    {activeButton === 'contact' && (
                        <div>
                            <label htmlFor="contactName" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="contactName"
                                    name="contactName"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                    value={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {activeButton === 'contact' && (
                        <div>
                            <label htmlFor="phoneNo" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phoneNo"
                                    name="phoneNo"
                                    type="number"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {activeButton === 'group' && (
                        <div>
                            <label htmlFor="groupName" className="block text-sm font-medium leading-6 text-gray-900">
                                Group Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="groupName"
                                    name="groupName"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {activeButton === 'contact' && (
                        <button type="button" className="flex w-full justify-center rounded-md bg-sky-500 px-3 mt-3 py-1.5 text-white"
                            onClick={addContact}
                        >
                            Add Contact
                        </button>
                    )}

                    {activeButton === 'group' && (
                        <button type="button" className="flex w-full justify-center rounded-md bg-sky-500 px-3 mt-3 py-1.5 text-white"
                        // onClick={createGroup}
                        >
                            Create Group
                        </button>
                    )}
                </form>
            </Modal>
        </div>
    )
}

export default ChatList
