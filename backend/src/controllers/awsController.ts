import * as AWS from "aws-sdk";
import { BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET } from "../utils/secret";
const s3bucket = new AWS.S3({
	accessKeyId: IAM_USER_KEY,
	secretAccessKey: IAM_USER_SECRET
});

export function uploadToS3(userIdKey: string, fileName: string, buffer: Buffer): Promise<any> {	
	const params = {
		Bucket: BUCKET_NAME,
		Key: userIdKey + "/" + new Date() + "_" + fileName,
		Body: buffer
		
	};

	return new Promise((resolve, reject) => {
		s3bucket.upload(params, function(err: any, data: any) {
			if (err) {
				console.error('aws S3 error', err);
				return reject(err);
			}
			return resolve(data);
		});
	});
}