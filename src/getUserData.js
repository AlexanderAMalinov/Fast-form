import inquirer from 'inquirer';
import Question from './question.js';

// All texts for conversation with user
const talk = {
  greetings: () => {
    console.log("\x1b[1m", 'Welcome to Fast-test!');
    console.log("\x1b[1m", 'Let`s begin building your form!\n');
  },
  giveMeQuestion: 'Tell me your question:',
  giveNextOption: 'Write option for your question here:',
  giveMeType: 'Choose type of answer(s) for your question',
};

const getUserData = async (arr) => {
  console.clear();
  talk.greetings();
  let indexOfQuestion = 1;
  let flowMode = 'next';

  while (flowMode === 'next') {
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
    const options = [];

    // Generate options for list-question
    if (typeOfUserQuestion.typeOfQuestion === 'list') {
      let listMode = 'continue';
      while (listMode === 'continue') {
        const option = await inquirer.prompt({
          type: 'input',
          name: 'question',
          message: talk.giveNextOption,
        });
        options.push(option.question);
        listMode = await inquirer.prompt({
          type: 'input',
          name: 'question',
          message: 'Continue? (y|n)',
        });
        listMode = listMode.question === 'y' ? 'continue' : 'break';
      }
    }
    const preparedQuestion = new Question(typeOfUserQuestion.typeOfQuestion, `question${indexOfQuestion}`, userQuestion.question);

    if (preparedQuestion.type === 'list') {
      preparedQuestion.choices = options;
    }
    arr.push(preparedQuestion);
    indexOfQuestion += 1;

    const userWill = await inquirer.prompt({
      type: 'input',
      name: 'question',
      message: 'Do you want set next question? (y|n)',
    });
    flowMode = userWill.question === 'y' ? 'next' : 'break';
    console.clear();
  }
};

export default getUserData;
