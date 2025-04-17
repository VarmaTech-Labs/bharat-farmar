
import mongoose from 'mongoose';
import log from '../utils/logger.js';

const dbConnection = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);

    log.success(`MongoDB connected to host: ${conn.connection.host}`);
    log.info('Database connection established and ready 🔌');
  } catch (error:any) {
    log.error(`MongoDB connection failed! ${error.message}`);
    process.exit(1);
  }
};

export default dbConnection;