"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromS3 = exports.uploadToS3 = void 0;
const AWS = __importStar(require("aws-sdk"));
const secret_1 = require("../utils/secret");
const s3bucket = new AWS.S3({
    accessKeyId: secret_1.IAM_USER_KEY,
    secretAccessKey: secret_1.IAM_USER_SECRET
});
function uploadToS3(userIdKey, fileName, buffer) {
    const params = {
        Bucket: secret_1.BUCKET_NAME,
        Key: userIdKey + "/" + new Date().getTime() + "_" + fileName,
        Body: buffer
    };
    return new Promise((resolve, reject) => {
        s3bucket.upload(params, function (err, data) {
            if (err) {
                console.error('aws S3 error', err);
                return reject(err);
            }
            return resolve(data);
        });
    });
}
exports.uploadToS3 = uploadToS3;
function removeFromS3(urlString) {
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
        });
    }
    const params = {
        Bucket: secret_1.BUCKET_NAME,
        Key: key,
    };
    return new Promise((resolve, reject) => {
        s3bucket.deleteObject(params, function (err, data) {
            if (err) {
                console.error('aws S3 error', err);
                return reject(err);
            }
            return resolve(data);
        });
    });
}
exports.removeFromS3 = removeFromS3;
//# sourceMappingURL=awsController.js.map