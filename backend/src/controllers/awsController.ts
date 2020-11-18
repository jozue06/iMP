import * as AWS from "aws-sdk";
import { url } from "inspector";
import { BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET } from "../utils/secret";
const s3bucket = new AWS.S3({
	accessKeyId: IAM_USER_KEY,
	secretAccessKey: IAM_USER_SECRET
});

export function uploadToS3(userIdKey: string, fileName: string, buffer: Buffer): Promise<any> {	
	const params = {
		Bucket: BUCKET_NAME,
		Key: userIdKey + "/" + new Date().getTime() + "_" + fileName,
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

export function removeFromS3(urlString: string): Promise<any> {
	let key = null;
	if (urlString.startsWith("https://imp-user-uploaded-images.s3.us-west-2.amazonaws.com/")) {
		key = urlString.split("https://imp-user-uploaded-images.s3.us-west-2.amazonaws.com/")[1];
	}

	if (urlString.startsWith("https://imp-user-uploaded-images.s3.amazonaws.com/")) {
		key = urlString.split("https://imp-user-uploaded-images.s3.amazonaws.com/")[1];
	}

	if (key == null) {
		return new Promise((resolve, reject) => {
			reject("Missing required key. Key is null");
		})
	}

	const params = {
		Bucket: BUCKET_NAME,
		Key: key,	
	};

	return new Promise((resolve, reject) => {
		s3bucket.deleteObject(params, function(err: any, data: any) {
			if (err) {
				console.error('aws S3 error', err);
				return reject(err);
			}
			return resolve(data);
		});
	});
}