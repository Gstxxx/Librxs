import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Book } from "@/app/types";
import { BooksSkeleton } from "@/app/components/BookSkeleton";

interface BookListProps {
  loading: boolean;
  results: Book[] | null;
  error: string | null;
}

const BookList: React.FC<BookListProps> = ({ loading, results, error }) => {
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const lastBookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results) {
      setDisplayedBooks(results.slice(0, 30));
    }
  }, [results]);

  const loadMoreBooks = () => {
    if (results && displayedBooks.length < results.length) {
      setIsLoadingMore(true);
      setTimeout(() => {
        const nextBooks = results.slice(
          displayedBooks.length,
          displayedBooks.length + 30
        );
        setDisplayedBooks((prevBooks) => [...prevBooks, ...nextBooks]);
        setIsLoadingMore(false);
      }, 500);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && results && displayedBooks.length < results.length) {
          loadMoreBooks();
        }
      },
      { threshold: 0.1 }
    );

    if (lastBookRef.current) {
      observer.observe(lastBookRef.current);
    }

    return () => {
      if (lastBookRef.current) {
        observer.unobserve(lastBookRef.current);
      }
    };
  }, [displayedBooks, results]);

  return (
    <>
      {loading ? (
        <BooksSkeleton />
      ) : (
        <>
          {error && <p className="text-red-500 text-center">Erro: {error}</p>}

          {displayedBooks && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {displayedBooks.map((book, index) => (
                <div
                  key={book.ID + index}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-[180px] h-full cursor-pointer"
                  ref={index === displayedBooks.length - 1 ? lastBookRef : null}
                >
                  <div className="relative h-[269px] w-[180px]">
                    {book.Cover ? (
                      <Image
                        src={book.Cover}
                        alt={`Capa de ${book.Title}`}
                        width={180}
                        height={269}
                        className="rounded-t-lg object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                        <span className="text-gray-500">Sem capa</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-grow">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {book.Title}
                    </h2>
                    <p className="text-gray-600">{book.Author}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {book.Year} {book.Extension && `(${book.Extension.toUpperCase()})`}
                    </p>
                    {book.Publisher && (
                      <p className="text-sm text-gray-500"> {book.Publisher}</p>
                    )}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    {book.Direct_Download_Link ? (
                      <a
                        href={book.Direct_Download_Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Baixar
                      </a>
                    ) : (
                      <span className="text-gray-500">Download indisponível</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {results && displayedBooks.length === 0 && (
            <div className="text-center">
              <p>Nenhum resultado encontrado.</p>
            </div>
          )}
          {isLoadingMore && <p className="text-center">Carregando mais livros...</p>}
        </>
      )}
    </>
  );
};

export default BookList;