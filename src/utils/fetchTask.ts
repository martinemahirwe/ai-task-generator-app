
import axios from 'axios';

const apiClient = axios.create({
    baseURL:'/',
    headers:{
        'Content-Type':'application/json'
    }
})

 export const createTask = async (topic: string) => {
    try {
      const response = await apiClient.post('api/quiz',topic);
      return response.data;
    } catch (err: any) {
      throw new Error('Error while creating task',err);
    }
  };

