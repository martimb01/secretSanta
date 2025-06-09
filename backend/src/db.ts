import mongoose  from "mongoose";

export default async function connectToDB() {
    try {
        const MongoURL: string | undefined = process.env.MONGO_URL
        if (!MongoURL) {
            throw new Error('MongoDB URL is not defined in the enviormental variables')
        }
        await mongoose.connect(MongoURL)
        console.log('Connected to DB!')
    } catch (err) {
        console.error('Failed to connect to the db', err)
    }
}