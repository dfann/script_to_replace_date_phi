const replaceData = (userOptions, fileBody) => {
  switch (userOptions.patternToReplace.toUpperCase()) {
    case "DOB":
      return _regexReplaceDateOfBirth(fileBody);
    case "SSN":
      return _regexReplaceSSN(fileBody);
    case "CUSTOM":
      return _regexReplaceCustom(fileBody, userOptions.customPattern);
    default:
      throw new Error("Unsupported replacement type");
  }
};

const _regexReplaceDateOfBirth = (fileBody) => {
  const date_regex = /(\d{2}|\d{1})[\/\-](\d{2}|\d{1})[\/\-](\d{4})/g;
  const newFileBody = fileBody.replace(
    date_regex,
    (match, p1, p2, p3) => `X/X/${p3}`
  );
  return newFileBody;
};

const _regexReplaceSSN = (fileBody) => {
  const date_regex = /(\d{3})\-(\d{2})\-(\d{4})/g;
  const newFileBody = fileBody.replace(
    date_regex,
    (match, p1, p2, p3) => `XXX-XX-${p3}`
  );
  return newFileBody;
};

const _regexReplaceCustom = (fileBody, customPattern) => {
  const newFileBody = fileBody.replace(customPattern, "XXXXX");
  return newFileBody;
};

export { replaceData };
