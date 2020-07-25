import inquirer from 'inquirer';
import Question from './question.js';
import generateOptions from './generateOptions.js';

const talk = {
<<<<<<< HEAD
  greetings: () => {
    console.log('\x1b[1m', 'Welcome to Fast-forms!');
    console.log('\x1b[1m', 'Let`s begin building your form!\n');
  },
=======
  greetings: [
    'Welcome to Fast-forms!',
    'Let`s begin building your form!\n',
  ],
>>>>>>> refactorOfgetUserData
  giveMeQuestion: 'Tell me your question:',
  giveMeType: 'Choose type of answer(s) for your question',
};

const getUserData = async (arr) => {
  console.clear();
  talk.greetings.forEach((words) => console.log('\x1b[1m', words));
  let mode = true;
  for (let indexOfQuestion = 1; mode; indexOfQuestion +=1) {
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

    const preparedQuestion = new Question(typeOfUserQuestion.typeOfQuestion, `question${indexOfQuestion}`, userQuestion.question);

    if (typeOfUserQuestion.typeOfQuestion === 'list') {
      const options = await generateOptions();
      preparedQuestion.choices = options;
    }

    arr.push(preparedQuestion);
    mode = await inquirer.prompt({
      type: 'confirm',
      name: 'value',
      message: 'Do you want set next question?',
      default: false,
    });
    mode = mode.value;
    console.clear();
  }
};

export default getUserData;
