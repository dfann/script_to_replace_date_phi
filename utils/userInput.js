import prompt from 'prompt';

const _isValidRegex = (regexToTest) => {
    try{
        new RegExp(regexToTest)
        return true;
    }
    catch
    {
        return false
    }
};

const PROMPT_SCHEMA = {
    properties : {
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
            required:true
        },
        region:{
            description: "Enter Region",
            type: "string",
            default: "us-east-1"
        },
        accessKeyId: {
            description: "Enter Access Key ID",
            message: "Access Key ID value cannot be empty",
            type: "string",
            hidden: true,  
            replace: '*',
        },
        secretAccessKey: {
            description: "Enter Secret Access Key",
            message: "Secret Access Key value cannot be empty",
            type: "string",
            hidden: true,     
            replace: '*',

        },
        patternToReplace:{
            description: "Enter Regex Pattern To Replace",
            message: "Regex Pattern To Replace must be a valid Regex",
            type: "string",
            required:true,
            conform: _isValidRegex
        },
        patternToAdd:{
            description: "Enter Regex Pattern To Add",
            message: "Regex Pattern To Add must be a valid Regex",
            type: "string",
            required:true,
            conform: _isValidRegex
        }
    }
};




const getUserOptions = () => {
    prompt.get(PROMPT_SCHEMA, function(err, result){
      console.log(result.username)
    });
  };


  export {getUserOptions}