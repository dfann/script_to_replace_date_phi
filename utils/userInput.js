import prompt from 'prompt';

const getUserOptions = () => {
    prompt.get(['username'], function(err, result){
      console.log(result.username)
    });
  };


  export {getUserOptions}