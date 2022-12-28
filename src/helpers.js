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
