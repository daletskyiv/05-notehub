import type { DebouncedState } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  query: string;
  updateSearchQuery: DebouncedState<
    (e: React.ChangeEvent<HTMLInputElement>) => void
  >;
}

export default function SearchBox({
  query,
  updateSearchQuery,
}: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={query}
      onChange={updateSearchQuery}
    />
  );
}
