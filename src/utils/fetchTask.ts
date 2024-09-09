
import axios from 'axios';
import { type z } from 'zod';
import { type QuestionSchema } from './validation/schema.validation';
import { AnswerValue } from '~/app/components/QuestionForm';
import { GradesType } from './validation/answersSchema.validation';

const apiClient = axios.create({
    baseURL:'/',
    headers:{
        'Content-Type':'application/json'
    }
  })
  type QuestionType = z.infer<typeof QuestionSchema>;

 interface GenerateQuestionsResponse {
  message: string;
  data: QuestionType[];
}
interface GenerateAnswerResponse {
  message: string;
  data: GradesType[];
}

 export const createTask = async (topic: string, selectedType: string[]) :Promise<GenerateQuestionsResponse> => {
    try {
      const response = await apiClient.post('api/quiz',{
        topic,
        selectedType
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } catch (error) {
      console.error("failed to fetch question", error);
      throw new Error('Error while creating task');
    }
  };


 export const gradePathTask = async (questions:QuestionType[], userAnswers:Record<string, AnswerValue>):Promise<GenerateAnswerResponse>=> {
  try {
    const response = await apiClient.post('api/grade',{
      questions,
      userAnswers
    });
    const data = response.data as GenerateAnswerResponse;
    return data;
  } catch (error) {
    console.error("failed to fetch question", error);
    throw new Error('Error while creating task');
  }
};

