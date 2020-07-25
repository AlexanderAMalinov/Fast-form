import inquirer from 'inquirer';

const generateOptions = async () => {
  const options = [];
  let move = true;
  while (move) {
    const option = await inquirer.prompt({
      type: 'input',
      name: 'value',
      message: 'Write option for your question here:',
    });
    options.push(option.value);
    move = await inquirer.prompt({
      type: 'confirm',
      name: 'value',
      message: 'Continue?',
      default: false,
    });
    move = move.value;
  }
  return options;
};

export default generateOptions;
