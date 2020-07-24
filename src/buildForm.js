import fs from 'fs/promises';
import getUserData from './getUserData.js';

const buildForm = async () => {
  const questions = [];
  const questionsToStr = (arr) => JSON.stringify(arr.map((question) => JSON.stringify(question)));
  getUserData(questions)
    .then(() => fs.appendFile('./form.js', ''))
    .then(() => fs.writeFile('form.js', 'import inquirer from \'inquirer\';'))
    .then(() => fs.appendFile('form.js', `\nconst form = ${questionsToStr(questions)};
  const parsedForm = [];
  form.reduce((acc, item) => {
    const parsedQuestion = JSON.parse(item);
    acc.push(parsedQuestion);
    return acc;
  }, parsedForm);`))
    .then(() => fs.appendFile('form.js', '\ninquirer.prompt(parsedForm);'))
    .then(() => console.log('\nForm was built!'))
    .catch((e) => {
      console.log('Ooops, something went wrong!', e);
      throw e;
    });
};

export default buildForm;
