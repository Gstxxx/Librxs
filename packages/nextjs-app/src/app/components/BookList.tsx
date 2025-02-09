import React from "react";
import Image from "next/image";
import { Book } from "@/app/types";
import {BooksSkeleton} from "@/app/components/BookSkeleton";


interface BookListProps {
  loading: boolean;
  results: Book[] | null;
  error: string | null;
}

const BookList: React.FC<BookListProps> = ({ loading, results, error }) => {
    return (
        <>
            {loading ? (
                <BooksSkeleton />
            ) : (
                <>
                    {error && <p className="text-red-500 text-center">Erro: {error}</p>}

                    {results && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                            {results.map((book) => (
                                <div
                                    key={book.ID}
                                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-[180px] h-full cursor-pointer"
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
                                            {book.Year}{" "}
                                            {book.Extension && `(${book.Extension.toUpperCase()})`}
                                        </p>
                                        {book.Publisher && (
                                            <p className="text-sm text-gray-500">
                                                {" "}
                                                {book.Publisher}
                                            </p>
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
                                            <span className="text-gray-500">
                                                Download indisponível
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {results && results.length === 0 && (
                        <div className="text-center">
                            <p>Nenhum resultado encontrado.</p>
                        </div>
                    )}
                </>
            )}
        </>
    )
};

export default BookList; 