import fs from 'fs/promises';
import getUserData from './getUserData.js';

const questions = [];
const questionsToStr = (arr) => JSON.stringify(arr.map((question) => JSON.stringify(question)));

const buildForm = async (data) => {
  getUserData(data)
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
    .then(() => console.log('Form was built!'));
};

buildForm(questions);
