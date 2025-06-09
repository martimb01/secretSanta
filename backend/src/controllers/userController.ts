import User from "../models/User"
import bcrypt from 'bcrypt'
import { IUser } from "../types.ts/User"

export const createUser = async (req: any, res: any) => {
    try {
        const user = new User (req.body)

        //Check constraints
        const constraintError = await validateUserConstraints(user)
        if (constraintError) {
            res.status(400).json({message: constraintError})
            return
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        
        //Save User to DB
        user.save()
        res.status(200).json({message: "CONTROLLER - User created!"})
        
        
    } catch (error) {
        res.status(500).json({message: 'CONTROLLER - Something went wrong with the user controller!'})
    }
}



//Validate User Constraints
async function validateUserConstraints(user: IUser) {

    // 1 - Check if any of the req.body fields are empty
    if (!user.username || !user.firstName || !user.lastName
        || !user.password || !user.email || !user.dateOfBirth)
    {
        return "CONTROLLER - Field is empty!"
    }

    // 2 - Password and username length
    if (user.username.length < 5) {
        return "CONTROLLER - Username is too short!";
    }
    if (user.password.length < 5) {
        return "CONTROLLER - Password is too short!";
    }

    // 3 - Check if the username is already in use
    if (await User.findOne({username: user.username})) {
        return 'CONTROLLER - Username already in use!'
    }

    // 4 - Proper email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(user.email)) {
        return 'CONTROLLER - Invalid email!'
    }

    // 5 - Check if email is already in use
    const emailAlreadyUsed = await User.findOne({email: user.email})
    if (emailAlreadyUsed) {
        return 'CONTROLLER - Email is already in use!'
    }
    
    return null; 
}



