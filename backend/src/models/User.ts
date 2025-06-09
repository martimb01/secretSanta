import mongoose, {Document, Schema, Model} from 'mongoose'
import { IUser } from '../types.ts/User'
import { timeStamp } from 'console'


export interface IUserDocument extends IUser, Document {}

//Defining schema
const userSchema = new Schema<IUserDocument>({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
}, {timestamps:true})

//Creating model
const User: Model<IUserDocument> = mongoose.model('User', userSchema)
export default User;