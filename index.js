/**
 * A script which will replace the Dates from the patients.log file with
 * Anonymized dates
 */
import { getUserOptionsPrompt, getUserOptionsFile } from "./utils/userInput.js";
import { getFileFromS3, writeFileToS3 } from "./utils/s3.js";

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

  const fileBody = await getFileFromS3(userOptions);

  const anonymizedFileBody = regexReplaceDate(fileBody);

  await writeFileToS3(userOptions, anonymizedFileBody);
  console.log("Data written successfully");
};

const regexReplaceDate = (fileBody) => {
  const date_regex = /(\d{2}|\d{1})[\/\-](\d{2}|\d{1})[\/\-](\d{4})/g;
  const newFileBody = fileBody.replace(
    date_regex,
    (match, p1, p2, p3) => `X/X/${p3}`
  );
  return newFileBody;
};

replace_phi();
