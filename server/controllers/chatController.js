const userDB = require('../models/userModel');
const chatMemberModel = require('../models/chatMemberModel');
const crypto = require('crypto');

exports.addContact = async (req, res) => {
    try {
        const id = req.user.id;
        const phoneNo = req.user.phoneNo
        const contactName = req.body.data.name;
        const phone_No = req.body.data.phoneNo;

        let memberId = await userDB.findOne({
            where: {
                phoneNo: phone_No
            }
        })
        let parsedMemberId = parseInt(memberId.id);
        await chatMemberModel.create({
            id: getRandomInt(100000, 999999),
            ContactName: contactName,
            memberId: parsedMemberId,
            userDatumId: id
        });
        await chatMemberModel.create({
            id: getRandomInt(100000, 999999),
            ContactName: phoneNo,
            memberId: id,
            userDatumId: parsedMemberId
        });
        console.log("contact added")
        return res.status(201).json({ message: "contact-added" });
    } catch (error) {
        console.log(error)
    }
}

exports.getChatList = async (req, res) => {
    const id = req.user.id;
    try {
        let chatlist = await chatMemberModel.findAll({ where: { userDatumId: id } });

        if (!chatlist) {
            throw new Error('No Chats Found')
        }

        chatlist = chatlist.map(item => {
            return {
                id: item.id,
                name: item.ContactName,
                userDatumId: item.userDatumId,
                memberId: item.memberId,
                type: item.type
            };
        });

        return res.status(201).json(chatlist);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

function getRandomInt(min, max) {
    const buffer = crypto.randomBytes(4);
    const randomNumber = buffer.readUInt32LE(0);
    return Math.floor(randomNumber / 0xFFFFFFFF * (max - min + 1) + min);
}