import { Book } from '@/types/books';
import Link from 'next/link';
import { formatAuthors } from '@/utils/helpers';
import dayjs from 'dayjs';
import { RatingStars } from "@/components/foundations/rating-stars";
import { BookThumbnail } from '../image/bookThumbnail';

export default function BookListItem({ book }: { book: Book }) {
  return (
    <div className='flex flex-row mb-4'>
      <Link key={book.id} href={`/book/${book.id}`}>
        {<BookThumbnail src={book.image} width={90} height={100} alt={book.title} thumbnailStyle='w-22 h-29' noThumbnailStyle='size-10' />
        }
      </Link>
      <div className='flex flex-col ml-2'>
        <Link key={book.id} href={`/book/${book.id}`}>
          <p className='text-l font-bold hover:underline'>{book.title}</p>
        </Link>
        {book.authors.length > 0 && <p>by <span className='text-sm font-semibold'>{formatAuthors(book.authors)}</span></p>}
        <div className='flex flex-row align-center'>
          <RatingStars rating={book.averageRating ?? 0} />
          <p className='text-sm text-gray-600 ml-2'>{book.averageRating ?? 0}/5 avg rating</p>
        </div>
        <p className='text-xs text-gray-600'>published {dayjs(book.publishedDate).format('YYYY')}</p>
      </div>
    </div >
  );
}
