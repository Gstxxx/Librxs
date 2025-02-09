import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Book as BookType } from "@/app/types";
import { BooksSkeleton } from "@/app/components/BookSkeleton";
import Book from "@/app/components/Book";
interface BookListProps {
  loading: boolean;
  results: BookType[] | null;
  error: string | null;
}


const BookList: React.FC<BookListProps> = ({ loading, results, error }) => {
  const [displayedBooks, setDisplayedBooks] = useState<BookType[]>([]);
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
                <Book
                  key={book.ID + index}
                  book={book}
                />

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