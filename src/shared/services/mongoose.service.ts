import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const connectWithRetry = async (count = 0): Promise<void> => {
    const connectOptions = {}
    try{
        const connectionUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/currency-converter'
        await mongoose.connect(connectionUrl, connectOptions as mongoose.ConnectOptions)
        
        console.log('MongoDB is connected')
    } catch (err) {
        console.log(`MongoDB connection unsuccessful, retry after 5 seconds. ${++count}`)
        setTimeout(() => connectWithRetry(count), 5000)
    }
}

export const connectToDb = (): void  => {
    connectWithRetry()  
}