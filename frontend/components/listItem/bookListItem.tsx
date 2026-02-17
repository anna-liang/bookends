import { Book } from '@/types/books';
import Image from 'next/image';
import Link from 'next/link';
import { formatAuthors } from '@/utils/helpers';
import dayjs from 'dayjs';
import { RatingStars } from "@/components/foundations/rating-stars";
import { BookClosed } from '@untitledui/icons';

export default function BookListItem({ book }: { book: Book }) {
  return (
    <div className='flex flex-row mb-4'>
      <Link key={book.id} href={`/book/${book.id}`} className='rounded-r-lg overflow-hidden'>
        {book.image ? (
          <Image src={book.image} alt={book.title} width={90} height={100} />
        ) : <div className='flex w-22 h-29 justify-center items-center border-2 border-gray-400 rounded-r-lg overflow-hidden'>
          <BookClosed className='size-10 text-gray-400' strokeWidth={1} />
        </div>
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
