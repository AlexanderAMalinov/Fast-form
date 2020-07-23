import inquirer from 'inquirer';
import Question from './question.js';

const dialog = {
  greet: () => {
    console.log('Welcome to Fast-test!');
    console.log('Let`s begin building your form!\n');
  },
  askQuestion: 'Tell me your question...',
  askType: 'Choose type of answer(s) for your question',
  askOptions: () => console.log('What`s options I set for your question? (type ".exit" for end)\n')
};



const getUserData = async (arr) => {
  dialog.greet();
  let indexOfQuestion = 1;
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
    const preparedQuestion = new Question(typeOfUserQuestion.typeQuestion, `question${indexOfQuestion}`, userQuestion.question);

    if (preparedQuestion.type === 'list') {
      preparedQuestion.choices = options;
    }
    arr.push(preparedQuestion);
    indexOfQuestion += 1;

    const userWill = await inquirer.prompt({
      type: 'input',
      name: 'question',
      message: 'Do you want set next question? (y | n)',
    });

    flowMode = userWill.question === 'y' ? 'next' : 'break';
  }
};

export default getUserData;