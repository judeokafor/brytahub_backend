import cloudinary from 'cloudinary';
//TODO: change to an environmental vairable
cloudinary.config({
  cloud_name: 'cloudname',
  api_key: 'apikey',
  api_secret: 'apisecret',
});
const uploads = async (file) => {
  const { createReadStream } = await file;
  try {
    await new Promise((resolve, reject) => {
      return createReadStream().pipe(
        cloudinary.v2.uploader.upload_stream((error, result) => {
          if (error) {
            reject(error);
          }
          resolve({ url: result.secure_url, id: result.public_id });
        }),
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export default uploads;
