import axios from 'axios';
import type { Note } from '../types/note';
import type { FormValues } from '../components/NoteForm/NoteForm';
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  page: number,
): Promise<FetchNotesResponse> {
  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params: { search: query, page: page, perPage: 12 },
  });
  return data;
}

export async function createNote(values: FormValues): Promise<Note> {
  const { data } = await axios.post<Note>('/notes', values);
  return data;
}
export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
}
