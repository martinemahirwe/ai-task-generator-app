// import { QuestionType } from "~/hooks/useCreateTask";
// import { db } from "~/server/db";
// import { attachmentQuestionMetadata, choicesQuestion, codeQuestionMetadata, dateQuestionMetadata, linearScaleMetadata, questions, rangeQuestionMetadata, urlQuestionMetadata } from "~/server/db/schema";

// const saveQuestionsToDB = async (questionsGenerated: QuestionType[]) => {
//     for (const question of questionsGenerated) {
//         const baseQuestionData = {
//             id: question.id,
//             label: question.label,
//             title: question.title,
//             description: question.description,
//             required: question.required,
//             version: question.version,
//             orderIndex: question.orderIndex,import { QuestionType } from "~/hooks/useCreateTask";
            
//             const saveQuestionsToDB = async (questionsGenerated: QuestionType[]) => {
//                 for (const question of questionsGenerated) {
//                     const baseQuestionData = {
//                         id: question.id,
//                         label: question.label,
//                         title: question.title,
//                         description: question.description,
//                         required: question.required,
//                         version: question.version,
//                         orderIndex: question.orderIndex,
//                         createdAt: new Date(),
//                         updatedAt: new Date(),
//                     };
            
//                     await db.insert(questions).values(baseQuestionData);
            
//                     switch (question.type) {
//                         case 'multiple-choice':
//                         case 'checkboxes':
//                         case 'dropdown':
//                             await db.insert(choicesQuestion).values({
//                                 questionId: question.id,
//                                 choices: question.choices,
//                             });
//                             break;
//                         case 'coding':
//                             await db.insert(codeQuestionMetadata).values({
//                                 questionId: question.id,
//                                 language: question.language,
//                                 expectedAnswer: question.expectedAnswer,
//                             });
//                             break;
//                         case 'linear-scale':
//                             await db.insert(linearScaleMetadata).values({
//                                 questionId: question.id,
//                                 toRangeValue: question.toRangeValue,
//                                 fromRangeLabel: question.fromRangeLabel,
//                                 toRangeLabel: question.toRangeLabel,
//                                 expectedAnswer: question.expectedAnswer,
//                             });
//                             break;
//                         case 'range':
//                             await db.insert(rangeQuestionMetadata).values({
//                                 questionId: question.id,
//                                 min: question.min,
//                                 max: question.max,
//                                 expectedAnswer: question.expectedAnswer,
//                             });
//                             break;
//                         case 'date':
//                             await db.insert(dateQuestionMetadata).values({
//                                 questionId: question.id,
//                                 expectedAnswer: question.expectedAnswer,
//                             });
//                             break;
//                         case 'ATTACHMENT':
//                             await db.insert(attachmentQuestionMetadata).values({
//                                 questionId: question.id,
//                                 fileType: question.fileType,
//                                 maxFileSize: question.maxFileSize,
//                                 expectedAnswer: question.expectedAnswer,
//                             });
//                             break;
//                         case 'URL':
//                             await db.insert(urlQuestionMetadata).values({
//                                 questionId: question.id,
//                                 url: question.type,
//                                 expectedAnswer: question.expectedAnswer,
//                             });
//                             break;
//                         default:
//                             throw new Error(`Unknown question type: ${question.type}`);
//                     }
//                 }
//             };
            
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         };

//         await db.insert(questions).values(baseQuestionData);

//         switch (question.type) {
//             case 'MULTIPLE_CHOICE':
//             case 'CHECKBOXES':
//             case 'DROP_DOWN':
//                 await db.insert(choicesQuestion).values({
//                     questionId: question.id,
//                     choices: question.choices,
//                 });
//                 break;
//             case 'CODE':
//                 await db.insert(codeQuestionMetadata).values({
//                     questionId: question.id,
//                     language: question.language,
//                     expectedAnswer: question.expectedAnswer,
//                 });
//                 break;
//             case 'LINEAR_SCALE':
//                 await db.insert(linearScaleMetadata).values({
//                     questionId: question.id,
//                     toRangeValue: question.toRangeValue,
//                     fromRangeLabel: question.fromRangeLabel,
//                     toRangeLabel: question.toRangeLabel,
//                     expectedAnswer: question.expectedAnswer,
//                 });
//                 break;
//             case 'RANGE':
//                 await db.insert(rangeQuestionMetadata).values({
//                     questionId: question.id,
//                     min: question.min,
//                     max: question.max,
//                     expectedAnswer: question.expectedAnswer,
//                 });
//                 break;
//             case 'DATE':
//                 await db.insert(dateQuestionMetadata).values({
//                     questionId: question.id,
//                     expectedAnswer: question.expectedAnswer,
//                 });
//                 break;
//             case 'ATTACHMENT':
//                 await db.insert(attachmentQuestionMetadata).values({
//                     questionId: question.id,
//                     fileType: question.fileType,
//                     maxFileSize: question.maxFileSize,
//                     expectedAnswer: question.expectedAnswer,
//                 });
//                 break;
//             case 'URL':
//                 await db.insert(urlQuestionMetadata).values({
//                     questionId: question.id,
//                     url: question.type,
//                     expectedAnswer: question.expectedAnswer,
//                 });
//                 break;
//             default:
//                 throw new Error(`Unknown question type: ${question.type}`);
//         }
//     }
// };
