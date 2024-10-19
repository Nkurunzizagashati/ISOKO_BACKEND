import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryFileUpload = async (fileToUpload, folderName, res) => {
	if (
		!process.env.CLOUDINARY_CLOUD_NAME ||
		!process.env.CLOUDINARY_API_KEY ||
		!process.env.CLOUDINARY_API_SECRET
	) {
		throw new Error(
			'Cloudinary configuration is missing required environment variables.'
		);
	}
	try {
		const data = await cloudinary.uploader.upload(
			fileToUpload.path,
			{
				resource_type: 'auto',
				folder: folderName,
			}
		);
		return {
			url: data?.secure_url,
		};
	} catch (error) {
		console.error('Cloudinary upload error:', error);
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

export { cloudinaryFileUpload };
