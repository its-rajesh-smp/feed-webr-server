import { QuestionType } from '@modules/workspace/workspace.type';

/**
 * Generates feedback question response rows
 * @param questions
 * @param answers
 * @returns
 */
export const generateFeedbackQuestionResponseRows = (
  questions,
  answers,
  ownerId,
) => {
  if (!ownerId) {
    throw new Error('Owner id is required');
  }

  const rowData = [];

  questions.forEach((question) => {
    let answer = answers.find((answer) => answer.questionId === question.id);

    // If answer is not there for mandatory or required question then throw error
    if ((question.isMandatory || question.isRequired) && !answer?.answer) {
      throw new Error(`Answer for ${question.question} is required`);
    }

    // if answer is there then push it
    if (answer) {
      // parse and validate answer type
      const answerValue = validateAnswersAndParse(question.type, answer.answer);

      rowData.push({
        questionId: question.id,
        answer: answerValue,
        ownerId,
      });
    }
  });

  return rowData;
};

/**
 * Validates and parses answer based on question type
 * @param questionType
 * @param answer
 * @returns
 */
export const validateAnswersAndParse = (
  questionType: QuestionType,
  answer: string,
) => {
  if (!answer) return null;
  answer = answer.trim();

  switch (questionType) {
    case QuestionType.SHORT_TEXT:
      return answer;

    case QuestionType.NUMBER:
      if (isNaN(Number(answer))) {
        throw new Error('Answer must be a number');
      }
      return Number(answer);

    case QuestionType.EMAIL:
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(answer)) {
        throw new Error('Answer must be a valid email');
      }
      return answer;

    case QuestionType.CHECKBOX:
      if (answer !== 'true' && answer !== 'false') {
        throw new Error('Answer must be a boolean');
      }
      return answer === 'true';
  }
};
