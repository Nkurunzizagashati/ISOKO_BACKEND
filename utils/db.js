import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		console.log('CONNECTED TO DB');
	} catch (error) {
		console.log(
			'AN ERROR OCCURED WHILE CONNECTING TO DB: ' + error.message
		);
	}
};

export default connectDB;
