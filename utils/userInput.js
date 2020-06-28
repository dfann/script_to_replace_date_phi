import util from "util";
import prompt from "prompt";
const promptGet = util.promisify(prompt.get);

const _isValidRegex = (regexToTest) => {
  try {
    new RegExp(regexToTest, "g");
    return true;
  } catch {
    return false;
  }
};

const PROMPT_SCHEMA = {
  properties: {
    bucket: {
      description: "Enter Bucket",
      message: "Bucket value cannot be empty",
      type: "string",
      required: true,
    },
    key: {
      description: "Enter Key",
      message: "Key value cannot be empty",
      type: "string",
      required: true,
    },
    region: {
      description: "Enter Region",
      type: "string",
      default: "us-east-1",
    },
    accessKeyId: {
      description: "Enter Access Key ID",
      message: "Access Key ID value cannot be empty",
      type: "string",
      hidden: true,
      replace: "*",
    },
    secretAccessKey: {
      description: "Enter Secret Access Key",
      message: "Secret Access Key value cannot be empty",
      type: "string",
      hidden: true,
      replace: "*",
    },
    patternToReplace: {
      description:
        "Enter Regex Pattern To Replace. Type CUSTOM to enter your own Regex",
      message: "Regex Pattern To Replace must be DOB, SSN, or CUSTOM",
      type: "string",
      pattern: /DOB|SSN|CUSTOM/i,
      required: true,
      conform: _isValidRegex,
    },
    customPattern: {
      description: "Enter Custom Regex Pattern",
      ask: () => {
        const patternToReplace = prompt.history("patternToReplace").value;
        return patternToReplace.toUpperCase() === "CUSTOM";
      },
      message: "Regex Pattern To Add must be a valid Regex",
      type: "string",
      required: true,
      conform: _isValidRegex,
    },
  },
};

const getUserOptions = async () => {
  try {
    const result = await promptGet(PROMPT_SCHEMA);
    console.log(result);
  } catch (err) {}
};

export { getUserOptions };
