'use client';

import { useState } from 'react';
import { Book } from '../../types/books';
import BookList from '@/components/list/bookList';
import { getBooks } from '@/api/booksService';
import { InputGroup } from "@heroui/react";
import { SearchSm } from '@untitledui/icons'

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const books = await getBooks(query);
        setBooks(books);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <div className="flex h-30 w-80 items-center justify-center">
        <InputGroup fullWidth variant='primary' className='text-grey-400 bg-transparent rounded-sm'>
          <InputGroup.Input placeholder="Search books..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearch} />
          <InputGroup.Suffix>
            <SearchSm className='size-5' />
          </InputGroup.Suffix>
        </InputGroup>
      </div>
      <BookList books={books} />
    </div>
  );
}
