import { Book } from '@/types/books';
import BookListItem from '../listItem/bookListItem';

export default function BookList({ books, style }: { books: Book[], style?: string }) {
  return (
    <ul className={style}>
      {books.map((book, index) => {
        return (
          <li key={book.id}>
            <BookListItem book={book} />
            {index !== books.length - 1 && <hr className='block h-1 border-0 border-t mb-4' />}
          </li>
        );
      })}
    </ul>
  );
}
