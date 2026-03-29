const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

// --- IN-MEMORY STATE ---
const balances = {};
const expenses = [];

// --- VALIDATORS ---
const numberValidator = (input) => {
  const num = Number(input);
  // Ensure it's a number, greater than 0, AND an integer (no decimals allowed)
  return !isNaN(num) && input.trim() !== '' && num > 0 && Number.isInteger(num);
};

const optionsValidator = (options) => {
  return (input) => {
    return options.includes(input);
  };
};

const notEmptyValidator = (input) => {
  return input.trim() !== '';
};

// --- PROMPTER ---
const ask = async (question, defaultAnswer, validator) => {
  return new Promise((resolve) => {
    rl.question(
      question + ` ${defaultAnswer ? '(' + defaultAnswer + ')' : ''} `,
      (answer) => {
        if (validator && !validator(answer)) {
          console.log(
            'Invalid input. Please enter a valid positive whole number.',
          );
          return resolve(ask(question, defaultAnswer, validator));
        }
        resolve(answer || defaultAnswer);
      },
    );
  });
};

// --- CORE LOGIC ---
const initUser = (userId) => {
  if (balances[userId] === undefined) {
    balances[userId] = 0;
  }
};

const createExpense = (description, totalAmount, payerId, participantIds) => {
  if (!participantIds.includes(payerId)) {
    participantIds.push(payerId);
  }

  const numParticipants = participantIds.length;

  // Calculate using whole numbers directly
  const baseShare = Math.floor(totalAmount / numParticipants);
  let leftoverUnits = totalAmount % numParticipants;

  const exactShares = {};
  participantIds.forEach((userId) => {
    let share = baseShare;
    // Distribute leftover whole units to make the math perfect
    if (leftoverUnits > 0) {
      share += 1;
      leftoverUnits -= 1;
    }
    exactShares[userId] = share;
  });

  initUser(payerId);
  balances[payerId] += totalAmount;

  participantIds.forEach((userId) => {
    initUser(userId);
    balances[userId] -= exactShares[userId];
  });

  const expenseRecord = {
    id: `exp_${expenses.length + 1}`,
    description,
    totalAmount,
    payerId,
    splits: participantIds.map((id) => ({
      userId: id,
      amount: exactShares[id],
    })),
  };

  expenses.push(expenseRecord);
};

// --- DISPLAY HELPERS ---
const printLedger = () => {
  console.log('\n--- CURRENT BALANCES ---');
  if (Object.keys(balances).length === 0) {
    console.log('No balances yet. Add an expense!');
  } else {
    for (const [user, balance] of Object.entries(balances)) {
      const sign = balance > 0 ? '+' : '';
      console.log(`${user.padEnd(15)}: ${sign}${balance}`);
    }
  }
  console.log('------------------------\n');
};

const printExpenses = () => {
  console.log('\n--- EXPENSE HISTORY ---');
  if (expenses.length === 0) {
    console.log('No expenses recorded yet.');
  } else {
    expenses.forEach((exp) => {
      console.log(
        `[${exp.id}] ${exp.description} - ${exp.totalAmount} units (Paid by: ${exp.payerId})`,
      );
    });
  }
  console.log('-----------------------\n');
};

// --- CLI INTERACTIVE FLOW ---
const handleAddExpense = async () => {
  console.log('\n--- ADD NEW EXPENSE ---');
  const description = await ask(
    'What was this expense for?',
    null,
    notEmptyValidator,
  );

  const amountStr = await ask(
    'Total amount (whole numbers only):',
    null,
    numberValidator,
  );
  const amount = parseInt(amountStr, 10);

  const payerId = await ask('Who paid for it?', null, notEmptyValidator);

  const participantsStr = await ask(
    'Who was involved? (comma-separated names, e.g., Alice, Bob, Charlie):',
    null,
    notEmptyValidator,
  );

  const participantIds = participantsStr
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name !== '');

  createExpense(description, amount, payerId, participantIds);
  console.log(`\n✅ Success! Added "${amount} for ${description}".\n`);
};

const run = async () => {
  console.log('Welcome to the CLI Expense Splitter!');

  while (true) {
    const prompt =
      'Main Menu:\n\t1. Add an expense\n\t2. View current balances\n\t3. View expense history\n\t4. Exit\nYour choice:';

    const choice = await ask(
      prompt,
      null,
      optionsValidator(['1', '2', '3', '4']),
    );

    switch (choice) {
      case '1':
        await handleAddExpense();
        break;
      case '2':
        printLedger();
        break;
      case '3':
        printExpenses();
        break;
      case '4':
        console.log('Goodbye!');
        rl.close();
        return;
    }
  }
};

run();
