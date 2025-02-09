import { notFound } from 'next/navigation';
import BookCover from './components/BookCover';
import BookInfo from './components/BookInfo';
import BookMirrors from './components/BookMirrors';
import DownloadButton from './components/DownloadButton';

interface Book {
  Title: string;
  Author: string;
  Year: string;
  ID: string;
  Extension?: string;
  Publisher?: string;
  Pages?: string;
  Size?: string;
  Mirror_1?: string;
  Mirror_2?: string;
  Mirror_3?: string;
  Language?: string;
  Direct_Download_Link?: string;
  Cover?: string;
  [key: string]: string | undefined;
}

async function getBook(id: string) {
  const fetch = (await import('node-fetch')).default;
  const res = await fetch(`http://localhost:5000/book/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
      return notFound();
    }
    throw new Error('Failed to fetch book details');
  }

  const book: Book = await res.json();

  if (!book) {
    notFound();
  }

  return book;
}

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <BookCover cover={book.Cover} title={book.Title} />
            <BookInfo
              title={book.Title}
              author={book.Author}
              publisher={book.Publisher}
              year={book.Year}
              pages={book.Pages}
              language={book.Language}
              size={book.Size}
              extension={book.Extension}
            />
            <BookMirrors
              mirror1={book.Mirror_1}
              mirror2={book.Mirror_2}
              mirror3={book.Mirror_3}
            />
            <DownloadButton directDownloadLink={book.Direct_Download_Link} />
          </div>
        </div>
      </div>
    </div>
  );
} 