import express from 'express';
import dotenv from 'dotenv'
import userRouter from './routes/userRoute'
import connectToDB from './db';

dotenv.config()
const app = express();

app.use(express.json())
app.use('/user', userRouter)
console.log(process.env.PORT)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
    connectToDB()
})