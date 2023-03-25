import axios from 'axios';
import { DiaryEntry, NewEntry } from './types';

const baserUrl = 'http://localhost:3000/api/diaries';

const getEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baserUrl);
  return response.data;
};

const createEntry = async (entry: NewEntry) => {
  const response = await axios.post<DiaryEntry>(baserUrl, entry);
  return response.data;
};

export const diaryService = { getEntries, createEntry };
