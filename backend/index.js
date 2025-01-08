const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv')
const { router } = require('./routes/userTestroute');
const {orderRouter} = require('./routes/orderRoute');
const { logRequest } = require('./middlewares/log');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();


app.use(cookieParser())
app.use(cors())
app.use(morgan('dev'));
app.use(express.json()); 

app.use(logRequest)
app.use('/', router);
app.use('/', orderRouter) 

console.log("PORT IS ",process.env.PORT)


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});