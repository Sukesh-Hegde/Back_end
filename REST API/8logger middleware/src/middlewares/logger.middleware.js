// Please don't change the pre-written code
// Import the necessary modules here
import fs from 'fs';

const fsPromise = fs.promises;

// Write your code here
export const log =async(logData)=> {
  try {
      
      // await fsPromise.writeFile('log.txt', logData); it will overwrite so change ot to appendFile,so that we can see all the log data
      await fsPromise.appendFile('log.txt', logData);
  } catch(err) {
      console.log(err);
  }
}

export const loggerMiddleware = async (req, res, next) => {
  const data_to_log = `${new Date().toString()}\n req URL: ${
    req.originalUrl
  }\n reqBody: ${JSON.stringify(req.body)} \n\n`;
  await log(data_to_log);
  next();
};
export default loggerMiddleware;
