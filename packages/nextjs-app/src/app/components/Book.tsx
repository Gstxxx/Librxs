import React from 'react';
import { Book as BookType } from '@/app/types';
import { Download, BookOpen, Calendar, Building2 } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';

interface BookProps {
  book: BookType;
}

const Book: React.FC<BookProps> = ({ book }) => {
  return (
    <div className="h-[400px] w-[280px] group relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl">
      {/* Book Cover */}
      <div className="relative h-full w-full overflow-hidden">
        {book.Cover ? (
          <Image
            src={book.Cover}
            alt={`Capa de ${book.Title}`}
            width={280}
            height={400}
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-[2px]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-blue-300" />
          </div>
        )}

        {/* Badge de Extensão */}
        {book.Extension && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full 
                          shadow-lg transform transition-transform duration-300 group-hover:translate-y-1">
            <span className="text-xs font-semibold tracking-wider text-white">
              {book.Extension.toUpperCase()}
            </span>
          </div>
        )}

        {/* Título Fixo */}
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent">
            <h2 className="text-2xl font-bold leading-tight text-white group-hover:line-clamp-none line-clamp-1">
                {book.Title}
            </h2>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent 
                        translate-y-[70%] transition-transform duration-500 ease-out group-hover:translate-y-0">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {/* Book Details */}
            <div className="space-y-3 opacity-0 transform transition-all duration-300 delay-100 
                            group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
              {book.Year && (
                <div className="flex items-center gap-2 text-gray-200">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{book.Year}</span>
                </div>
              )}
              {book.Publisher && (
                <div className="flex items-center gap-2 text-gray-200">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm line-clamp-1">{book.Publisher}</span>
                </div>
              )}

              {/* Botão de Download */}
              {book.Direct_Download_Link ? (
                <a
                  href={book.Direct_Download_Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-4 flex items-center justify-center gap-2 w-full",
                    "bg-white text-black hover:bg-gray-100",
                    "px-4 py-3 rounded-xl font-semibold transition-all duration-300",
                    "transform hover:scale-[0.98] active:scale-[0.97]",
                    "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
                  )}
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              ) : (
                <div className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gray-600/50 text-gray-300 cursor-not-allowed">
                  <span>Download Indisponível</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;