import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import readlineSync from 'readline-sync';
import Question from './question.js';

const questions = [];

const dialog = {
  greet: () => {
    console.log('Welcome to Fast-test!');
    console.log('Let`s begin building your form!\n');
  },
  askQuestion: 'Tell me your question...',
  askType: 'Choose type of answer(s) for your question',
  askOptions: () => console.log('What`s options I set for your question? (type ".exit" for end)\n')
};



const getUserData = async () => {
  dialog.greet();
  let flowMode = 'next';
  while (flowMode === 'next') {

    const typeQuestion = {
      type: 'list',
      name: 'typeQuestion',
      message: dialog.askType,
      choices: ['input', 'list'],
    };
    const userQuestion = await inquirer.prompt({
      type: 'input',
      name: 'question',
      message: dialog.askQuestion,
    });
    const typeOfUserQuestion = await inquirer.prompt(typeQuestion);
    const options = [];

    // Generate options for list-question
    if (typeOfUserQuestion.typeQuestion === 'list') {
      dialog.askOptions();
      let listMode = 'continue';
      while (listMode === 'continue') {
        const option = await inquirer.prompt({
          type: 'input',
          name: 'question',
          message: 'write option for your question...',
        });
        options.push(option.question);
        listMode = await inquirer.prompt({
          type: 'input',
          name: 'question',
          message: 'We continue? (y | n)',
        });
        listMode = listMode.question === 'y' ? 'continue' : 'break';
      }
    }
    const preparedQuestion = new Question(typeOfUserQuestion.typeQuestion, 'question', userQuestion.question);

    if (preparedQuestion.type === 'list') {
      preparedQuestion.choices = options;
    }
    questions.push(preparedQuestion);

    const userWill = await inquirer.prompt({
      type: 'input',
      name: 'question',
      message: 'Do you want set next question? (y | n)',
    });
    
    flowMode = userWill.question === 'y' ? 'next' : 'break';
  }


};

getUserData();