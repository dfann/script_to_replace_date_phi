/**
 * A script which will replace the Dates from the patients.log file with
 * Anonymized dates
 */
import { getUserOptionsPrompt, getUserOptionsFile } from "./utils/userInput.js";
import { getFileFromS3, writeFileToS3 } from "./utils/s3.js";
import {
  regexReplaceDate,
  regexReplaceCustom,
  regexReplaceSSN,
} from "./utils/dataReplacement.js";

/**
 * Replaces the date phi for the patients.log file
 * Dates in Month/Day/Year format will be replaced to “X/X/YEAR"
 * For example “1/23/1981” would become “X/X/1981”
 */
const replacePHI = async () => {
  const filePath = process.argv[2];
  let userOptions;
  if (filePath) {
    userOptions = await getUserOptionsFile(filePath);
  } else {
    userOptions = await getUserOptionsPrompt();
  }

  const fileBody = await getFileFromS3(userOptions);

  const anonymizedFileBody = regexReplaceDate(fileBody);

  await writeFileToS3(userOptions, anonymizedFileBody);
  console.log("Data written successfully");
};

replacePHI();
