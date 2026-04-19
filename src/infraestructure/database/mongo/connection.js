import mongoose from 'mongoose';

export const connectMongo = async () => {
    try {
        await mongoose.connect("mongodb+srv://lorenabricherchoque_db_user:us4ShXfGkpwI5XV2@cluster0.ikdrsdj.mongodb.net/?appName=Cluster0");
        console.log('Connected to MongoDB');
    }catch (error){
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}