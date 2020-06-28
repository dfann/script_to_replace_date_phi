import AWS from "aws-sdk";
/**
 * Reads the patients.log file from S3
 * @param {*} callBack The callback which will be called on success with the fileBody of the patients.log file
 * as a string
 */
const getFileFromS3 = async (userOptions) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: userOptions.accessKeyId,
      secretAccessKey: userOptions.secretAccessKey,
      region: userOptions.region,
    });
    const s3Data = await s3
      .getObject({ Bucket: userOptions.bucket, Key: userOptions.key })
      .promise();
    return s3Data.Body.toString();
  } catch (err) {
    console.log(err, err.stack);
  }
};

/**
 * Writes to the patients.log file in S3
 * @param {*} data The string representation of the file to be written
 * @param {*} callBack The callback which will be called on success with the data return from S3
 */
const writeFileToS3 = async (userOptions, data) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: userOptions.accessKeyId,
      secretAccessKey: userOptions.secretAccessKey,
      region: userOptions.region,
    });
    const s3Data = await s3
      .putObject({
        Bucket: userOptions.bucket,
        Key: userOptions.key,
        Body: data,
      })
      .promise();
    return s3Data;
  } catch (err) {
    console.log(err, err.stack);
  }
};

export { getFileFromS3, writeFileToS3 };
