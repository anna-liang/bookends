import { getBookById } from '@/api/booksService';
import { formatAuthors } from '@/utils/helpers';
import SaveBookButton from './saveBookButton';
import { BookThumbnail } from '@/components/image/bookThumbnail';
import Description from './desctiption';
import { getUser } from '@/api/authService';
import BookStatusSection from './bookStatusSection';

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = await getBookById(id);
  const user = await getUser()

  return (
    <div className='flex justify-center my-8'>
      <div className='flex flex-col'>
        <BookThumbnail src={book.image} width={200} height={250} alt={book.title} />
        <BookStatusSection bookId={id} user={user} />
        {user && <SaveBookButton bookId={id} />}
      </div>
      <div className='flex-col max-w-3/5 justify-center ml-8'>
        <p className='text-5xl font-bold'>{book.title}</p>
        <span className='text-xl'>{formatAuthors(book.authors)}</span>
        <p>{book.description}</p>
        <Description description={book.description} />
      </div>
    </div>
  );
}
