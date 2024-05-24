const express = require('express');
const app = express();
app.use(express.json({ limit: "25mb" }));
require('./database/dbConfig');
var cors=require('cors');
app.use(cors());

const UserRouter = require('./routes/userRoute')
app.use(UserRouter);

const PORT = process.env.PORT || 6001;
 app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
 });