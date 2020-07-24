import fs from 'fs/promises';
import code from './contentTemplate.js';
import getUserData from './getUserData.js';

const questionsToStr = (arr) => JSON.stringify(arr.map((question) => JSON.stringify(question)));


const buildForm = async () => {
  const questions = [];
  getUserData(questions)
    .then(() => fs.writeFile('./form.js', ''))
    .then(() => fs.appendFile('form.js', code.importFrom))
    .then(() => fs.appendFile('form.js', `\nconst form = ${questionsToStr(questions)};${code.parseAndLaunch}`))
    .then(() => console.log("\x1b[32m", '\nForm was built!\n'))
    .catch((e) => {
      console.log('Ooops, something went wrong ((', e);
      throw e;
    });
};

export default buildForm;
