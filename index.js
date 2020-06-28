/**
 * A script which will replace the Dates from the patients.log file with
 * Anonymized dates
 */

import { getUserOptionsPrompt, getUserOptionsFile } from "./utils/userInput.js";
import AWS from "aws-sdk";

AWS.config.loadFromPath("./local-creds.json");
const s3 = new AWS.S3();

const params = {
  Bucket: "stellar-health",
  Key: "log.log",
};

/**
 * Replaces the date phi for the patients.log file
 * Dates in Month/Day/Year format will be replaced to “X/X/YEAR"
 * For example “1/23/1981” would become “X/X/1981”
 */
const replace_phi = async () => {
  const filePath = process.argv[2];
  let userOptions;
  if (filePath) {
    userOptions = await getUserOptionsFile(filePath);
  } else {
    userOptions = await getUserOptionsPrompt();
  }

  console.log(userOptions);

  // const fileBody = await getFileFromS3();
  // const anonymizedFileBody = regexReplaceDate(fileBody);

  // await writeFileToS3(anonymizedFileBody);
  // console.log("Data written successfully");
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
const getFileFromS3 = async (callBack) => {
  try {
    const s3Data = await s3.getObject(params).promise();
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
const writeFileToS3 = async (data) => {
  params.Body = data;
  try {
    const s3Data = await s3.putObject(params).promise();
    return s3Data;
  } catch (err) {
    console.log(err, err.stack);
  }
};

replace_phi();
//util
//user-input
//s3
