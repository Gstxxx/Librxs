import React, { useState, useEffect, useRef, useCallback } from "react";
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

  const loadMoreBooks = useCallback(() => {
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
  }, [results, displayedBooks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          results &&
          displayedBooks.length < results.length
        ) {
          loadMoreBooks();
        }
      },
      { threshold: 0.1 }
    );

    const currentLastBookRef = lastBookRef.current; // Copiando o valor atual

    if (currentLastBookRef) {
      observer.observe(currentLastBookRef);
    }

    return () => {
      if (currentLastBookRef) {
        observer.unobserve(currentLastBookRef);
      }
    };
  }, [displayedBooks, results, loadMoreBooks]);

  return (
    <div className="mx-auto px-4 py-8">
      {error && <p className="text-red-500">{error}</p>}
      {results === null && !loading && (
        <p className="text-gray-500">Nenhum resultado encontrado.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedBooks.map((book, index) => (
          <div
            key={book.ID}
            ref={index === displayedBooks.length - 1 ? lastBookRef : null}
            className="flex justify-center"
          >
            <Book book={book} />
          </div>
        ))}
        {loading && <BooksSkeleton />}
        {isLoadingMore && <BooksSkeleton />}
      </div>
    </div>
  );
};

export default BookList;