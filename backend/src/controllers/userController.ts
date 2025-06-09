import User from "../models/User"
import bcrypt from 'bcrypt'
import { IUser } from "../types.ts/User"
import { isValidObjectId } from "mongoose"

export const createUser = async (req: any, res: any) => {
    try {
        const user = new User (req.body)

        //Check if any of the req.body fields are empty
        if (!user.username || !user.firstName || !user.lastName
        || !user.password || !user.email || !user.dateOfBirth)
        {
            res.status(400).json({message: "CONTROLLER - Field is empty!"})
        }
        
        //Check if the username is already in use
        if (await User.findOne({username: user.username})) {
            res.status(400).json({message:'CONTROLLER - Username already in use!'})
        }

        //Check constraints
        const constraintError = validateUserConstraints(user)
        if (constraintError) {
            res.status(400).json({message: constraintError})
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        
        user.save()
        res.status(200).json({message: "CONTROLLER - User created!"})
        
        
    } catch (error) {
        res.status(500).json({message: 'CONTROLLER - Something went wrong with the user controller!'})
    }
}



//Validate User Constraints

function validateUserConstraints(user: IUser) {
    if (user.username.length < 5) {
        return "Username is too short!";
    }
    if (user.password.length < 5) {
        return "Password is too short!";
    }
    // Add more checks as needed

    return null; 
}



