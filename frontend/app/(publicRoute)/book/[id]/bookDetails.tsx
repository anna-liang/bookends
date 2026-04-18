"use client"

import { formatAuthors } from '@/utils/helpers';
import { BookThumbnail } from '@/components/image/bookThumbnail';
import { Description } from './description';
import { useBook } from '@/queries/useBook';
import { User } from '@/types/user';
import { RatingStars } from "@/components/foundations/rating-stars";
import { useUserBook } from '@/queries/useUserBook';
import BookStatusModal from './bookStatusModal';

export default function BookDetails({ id, user }: { id: string, user: User }) {
    const getBook = useBook({ id });
    const getUserBook = useUserBook({ bookId: id, user })
    const book = getBook.data
    const getBookError = getBook.error
    const getBookLoading = getBook.isLoading
    const userBook = getUserBook.data
    console.log(userBook)

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
                    <div className='flex flex-col items-center'>
                        <div className='mb-4'>
                            <BookThumbnail src={book.image} width={200} height={250} alt={book.title} />
                        </div>
                        {user && <BookStatusModal key={userBook?.status} bookId={id} bookStatus={userBook?.status} userBookId={userBook?.id} />}
                        <div className='mt-4'>
                            {user && <RatingStars rating={userBook ? userBook.userRating : 0} />}
                        </div>
                    </div>
                    <div className='flex-col max-w-3/5 justify-center ml-8'>
                        <p className='text-5xl font-bold'>{book.title}</p>
                        <span className='text-xl'>{formatAuthors(book.authors)}</span>
                        <RatingStars rating={book.averageRating ?? 0} />
                        <p>{book.description}</p>
                        <Description description={book.description} />
                    </div>
                </div>) :
                <div>Book not found</div>
            }
        </div>
    );
}
