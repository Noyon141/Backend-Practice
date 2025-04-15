import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../env/env.js';


if(!DB_URI){
    throw new Error('DB_URI is not defined in the environment variables');
}

const connectToDatabase = async ()=>{
    try {
    mongoose.connect(DB_URI);

    console.log(`Connected to DATABASE in ${NODE_ENV} mode`);
    
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export default connectToDatabase;