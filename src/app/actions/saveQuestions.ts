
import { db } from "~/server/db";
import { questions } from "~/server/db/schema";
import { GeneratedQuestionType } from "~/utils/validation/saveQuestions";

export const saveQuestionsToDB = async (questionsGenerated: GeneratedQuestionType) => {
        await db.insert(questions).values(questionsGenerated);
};
