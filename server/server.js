const express = require('express')
const app = express()
require('dotenv').config();
const userRouter = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const cors = require("cors");
const chatRouter = require('./routes/chatRoutes');
const userDB = require('./models/userModel');
const ChatMembersData = require('./models/chatMemberModel');
const port = 4000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: "*"
}));

app.use('/user', userRouter);
app.use('/chat', chatRouter);

userDB.hasMany(ChatMembersData);
ChatMembersData.belongsTo(userDB);

sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}).catch(err => console.log(err))
