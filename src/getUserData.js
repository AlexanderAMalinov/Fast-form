import inquirer from 'inquirer';
import Question from './question.js';

// All texts for conversation with user
const talk = {
  greetings: () => console.log('Welcome to Fast-test!\nLet`s begin building your form!\n'),
  giveMeOptions: () => console.log('What`s options I set for your question?\n'),
  giveMeQuestion: 'Tell me your question:',
  giveNextOption: 'Write option for your question here:',
  giveMeType: 'Choose type of answer(s) for your question',
};

const getUserData = async (arr) => {
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
      talk.giveMeOptions();
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
  }
};

export default getUserData;
