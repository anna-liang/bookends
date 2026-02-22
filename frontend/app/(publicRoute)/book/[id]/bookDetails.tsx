"use client"

import { formatAuthors } from '@/utils/helpers';
import SaveBookButton from './saveBookButton';
import { BookThumbnail } from '@/components/image/bookThumbnail';
import Description from './desctiption';
import BookStatusSection from './bookStatusSection';
import { useBook } from '@/queries/useBook';
import { User } from '@/types/user';

export default function BookDetails({ id, user }: { id: string, user: User }) {
    const getBook = useBook({ id });
    const book = getBook.data
    const getBookError = getBook.error
    const getBookLoading = getBook.isLoading

    if (getBookError) {
        throw getBookError
    }

    if (getBookLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex justify-center my-8'>
            {book ?
                (<div className='flex max-w-4/5'>
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
                </div>) :
                <div>Book not found</div>
            }
        </div>
    );
}
