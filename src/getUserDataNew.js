import inquirer from 'inquirer';
import Question from './question.js';

const talk = {
  greetings: [
    'Welcome to Fast-forms!',
    'Let`s begin building your form!\n',
  ],
  giveMeQuestion: 'Tell me your question:',
  giveNextOption: 'Write option for your question here:',
  giveMeType: 'Choose type of answer(s) for your question',
};

const getUserData = async (arr) => {
  console.clear();
  talk.greetings.forEach((words) => console.log('\x1b[1m', words));
  let mode = 'next';
  for (let indexOfQuestion = 1; mode === 'next'; indexOfQuestion +=1) {
    const userQuestion = await inquirer.prompt({
      type: 'input',
      name: 'question',
      message: talk.giveMeQuestion,
    });
    const typeOfUserQuestion = await inquirer.prompt({
      type: 'list',
      name: 'typeOfQuestion',
      message: talk.giveMeType,
      choices: ['input', 'list'],
    });
  }
};

getUserData()
