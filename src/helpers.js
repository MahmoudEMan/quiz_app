export const shuffleQuestions = (question) => {
  if (!question) {
    return [];
  }
  const reshuffledAnswers = question
    .map((a) => {
      return { sort: Math.random(), ...a };
    })
    .sort((a, b) => a.sort - b.sort);

  return reshuffledAnswers;
};
////////////////////////////
export const calculator = (answers, operation) => {
  function add() {
    return answers.reduce(
      (accumulator, currentValue) => Number(accumulator) + Number(currentValue)
    );
  }
  function multi() {
    return answers.reduce(
      (accumulator, currentValue) => Number(accumulator) * Number(currentValue)
    );
  }

  switch (operation) {
    case "addition":
      return add();
    case "multiplication":
      return multi();

    default:
      break;
  }
};
