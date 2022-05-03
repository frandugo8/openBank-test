
const RESPONSE_OK = {status: 200};
const RESPONSE_KO = {status: 401};

export const UserRemoteService = {
  changeMasterPass: (pass: string, repass: string, optionalQuestion: string) => 
    new Promise((resolve, reject) =>
      setTimeout(() => 
        pass === repass
        ? resolve(RESPONSE_OK)
        : resolve(RESPONSE_KO)
      , 3000))
}