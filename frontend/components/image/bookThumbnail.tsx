import { BookClosed } from "@untitledui/icons/BookClosed";
import Image from "next/image";

interface bookThumbnailProps {
    src?: string,
    width: number,
    height: number,
    alt: string,
    thumbnailStyle?: string,
    noThumbnailStyle?: string,
}

export const BookThumbnail = ({ src, width, height, alt, thumbnailStyle, noThumbnailStyle }: bookThumbnailProps) => {
    return src ? (
        <Image src={src} alt={alt} width={width} height={height} className='rounded-r-lg overflow-hidden' />
    ) : <div className={`flex justify-center items-center border-2 border-gray-400 rounded-r-lg overflow-hidden ${thumbnailStyle}`}>
        <BookClosed className={`text-gray-400 ${noThumbnailStyle}`} strokeWidth={1} />
    </div>
}