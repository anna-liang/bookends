'use client';

import { useState } from 'react';
import { BookmarkAdd, BookmarkCheck } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';

export default function SaveBookButton({ bookId }: { bookId: string }) {
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    // save to shelf
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
