import axios from 'axios';
import { DiaryEntry } from './types';

const baserUrl = 'http://localhost:3000/api/diaries';

const getEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baserUrl);
  return response.data;
};

export const diaryService = { getEntries };
