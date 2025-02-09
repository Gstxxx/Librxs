import Image from 'next/image';

interface BookCoverProps {
  cover: string | undefined;
  title: string;
}

export default function BookCover({ cover, title }: BookCoverProps) {
  return (
    <Image
      src={
        cover !== "https://covers.openlibrary.org/b/olid/-M.jpg"
          ? cover
          : "/no-cover.png"
      }
      alt={title}
      width={300}
      height={400}
      className="mx-auto"
    />
  );
} 