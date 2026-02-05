'use client';

interface BookErrorProps {
  error: Error;
}

export default function BookError({ error }: { error: BookErrorProps }) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
        ? (error as { message: string }).message
        : 'Something went wrong';
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{message || 'Unable to find the book. Please try again later.'}</p>
    </div>
  );
}
