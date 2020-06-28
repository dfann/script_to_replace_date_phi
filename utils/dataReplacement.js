const regexReplaceDate = (fileBody) => {
  const date_regex = /(\d{2}|\d{1})[\/\-](\d{2}|\d{1})[\/\-](\d{4})/g;
  const newFileBody = fileBody.replace(
    date_regex,
    (match, p1, p2, p3) => `X/X/${p3}`
  );
  return newFileBody;
};

const regexReplaceSSN = (fileBody) => {
  const date_regex = /(\d{3})\-(\d{2})\-(\d{4})/g;
  const newFileBody = fileBody.replace(
    date_regex,
    (match, p1, p2, p3) => `XXX-XX-${p3}`
  );
  return newFileBody;
};

const regexReplaceCustom = (fileBody) => {
  const date_regex = /(\d{2}|\d{1})[\/\-](\d{2}|\d{1})[\/\-](\d{4})/g;
  const newFileBody = fileBody.replace(
    date_regex,
    (match, p1, p2, p3) => `X/X/${p3}`
  );
  return newFileBody;
};

export { regexReplaceDate, regexReplaceSSN, regexReplaceCustom };
