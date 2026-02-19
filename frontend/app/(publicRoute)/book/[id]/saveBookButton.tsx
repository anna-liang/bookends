'use client';

import { useState } from 'react';
import { BookmarkAdd, BookmarkCheck } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import { useAddBookToShelf } from '@/queries/useAddBookToShelf';

export default function SaveBookButton({ bookId }: { bookId: string }) {
  const addBookToShelf = useAddBookToShelf()
  const [saved, setSaved] = useState(false); // TODO: load in save state from db

  const handleSave = async () => {
    addBookToShelf.mutate({ shelfId: '16e28255-2c2f-4e7f-9c6f-50ee0306c5db', bookId: bookId })
    setSaved((prev) => !prev);
  };
  return (
    <Button
      size="lg"
      color="tertiary"
      aria-label="Save"
      iconLeading={saved ? BookmarkCheck : BookmarkAdd}
      onClick={handleSave}
    />
  );
}
