/**
 * A script which will replace the Dates from the patients.log file with
 * Anonymized dates
 */
import AWS from "aws-sdk";
import fs from "fs";
const fsp = fs.promises;

AWS.config.loadFromPath("./creds.json");
const s3 = new AWS.S3();

const params = {
  Bucket: "stellar.health.test.david.fann",
  Key: "patients.log",
};

/**
 * Replaces the date phi for the patients.log file
 * Dates in Month/Day/Year format will be replaced to “X/X/YEAR"
 * For example “1/23/1981” would become “X/X/1981”
 */
const replace_phi = () => {
  getFileFromS3((fileBody) => {
    const anonymizedFileBody = regexReplaceDate(fileBody);

    writeFileToS3(anonymizedFileBody, () => {
      console.log("Data written successfully");
    });
  });
};

const regexReplaceDate = (fileBody) => {
  const date_regex = /(\d{2}|\d{1})[\/\-](\d{2}|\d{1})[\/\-](\d{4})/g;
  const newFileBody = fileBody.replace(
    date_regex,
    (match, p1, p2, p3) => `X/X/${p3}`
  );
  return newFileBody;
};

/**
 * Reads the patients.log file from S3
 * @param {*} callBack The callback which will be called on success with the fileBody of the patients.log file
 * as a string
 */
const getFileFromS3 = (callBack) => {
  s3.getObject(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      callBack(data.Body.toString());
      return data.Body.toString();
    }
  });
};

/**
 * Writes to the patients.log file in S3
 * @param {*} data The string representation of the file to be written
 * @param {*} callBack The callback which will be called on success with the data return from S3
 */
const writeFileToS3 = (data, callBack) => {
  params.Body = data;
  s3.putObject(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      callBack(data);
    }
  });
};

replace_phi();
