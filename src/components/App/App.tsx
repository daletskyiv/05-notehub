import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import { fetchNotes, type FetchNotesResponse } from '../services/noteService';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    // isError,
    // isLoading,
  } = useQuery<FetchNotesResponse>({
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
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
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
      {noteList.length > 0 && <NoteList noteList={noteList} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
