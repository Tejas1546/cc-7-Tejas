const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const numberValidator = (input) => {
  return !isNaN(input);
};

const optionsValidator = (options) => {
  return (input) => {
    return options.includes(input);
  };
};

const ask = async (question, defaultAnswer, validator) => {
  return new Promise((resolve) => {
    rl.question(
      question + ` ${defaultAnswer ? '(' + defaultAnswer + ')' : ''}`,
      (answer) => {
        if (validator && !validator(answer)) {
          console.log('Invalid input. Please try again.');
          return resolve(ask(question, defaultAnswer, validator));
        }
        resolve(answer || defaultAnswer);
      },
    );
  });
};

const printMonth = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = new Date().getMonth();
  console.log(`Current month: ${monthNames[month]}`);
};

const printYear = () => {
  const year = new Date().getFullYear();
  console.log(`Current year: ${year}`);
};

const printDay = () => {
  const day = new Date().getDate();
  console.log(`Current day: ${day}`);
};

const printDayOfWeek = () => {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayOfWeek = new Date().getDay();
  console.log(`Current day of the week: ${dayNames[dayOfWeek]}`);
};

const run = async () => {
  while (true) {
    const prompt =
      'What do you want to know about the current date? \n Options:\n\t1. Month\n\t2. Year\n\t3. Day\n\t4. Day of the week\n\t5. Exit\nYour choice: ';
    const choice = await ask(
      prompt,
      null,
      optionsValidator(['1', '2', '3', '4', '5']),
    );

    switch (choice) {
      case '1':
        printMonth();
        break;
      case '2':
        printYear();
        break;
      case '3':
        printDay();
        break;
      case '4':
        printDayOfWeek();
        break;
      case '5':
        console.log('Goodbye!');
        rl.close();
        return;
    }
  }
};

run();
