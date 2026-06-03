import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import {
  fetchNotes,
  type FetchNotesResponse,
} from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { useDebouncedCallback } from 'use-debounce';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, query],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
  });

  const noteList = data?.notes || [];
  const totalPages = data?.totalPages ?? 0;

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleChangePage(page: number) {
    setPage(page);
  }

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setPage(1);
    },
    500,
  );

  return (
    <div className={css.app}>
      <Toaster position="top-center" reverseOrder={false} />

      <header className={css.toolbar}>
        <SearchBox query={query} updateSearchQuery={updateSearchQuery} />
        {totalPages > 0 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            setPage={handleChangePage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <LoadingMessage />}

      {isError && <ErrorMessage />}

      {noteList.length > 0 && <NoteList noteList={noteList} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
