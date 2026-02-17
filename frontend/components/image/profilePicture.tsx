import Image from "next/image";

interface profilePictureProps {
    src: string,
    width: number,
    height: number,
    alt: string,
    style?: string
}

export const ProfilePicture = ({ src, width, height, alt, style }: profilePictureProps) => (
    <Image src={src} width={width} height={height} alt={alt} className={style} />
)