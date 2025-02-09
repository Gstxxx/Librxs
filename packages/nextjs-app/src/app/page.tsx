"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from 'next/link';

interface Book {
  Title: string;
  Author: string;
  Year: string;
  ID: string;
  Extension?: string;
  Publisher?: string;
  Cover?: string; // Adicionando o campo Cover
  Direct_Download_Link?: string;
  [key: string]: string | undefined;
}

// Componente de esqueleto para um único livro
const BookSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col animate-pulse">
    <div className="relative h-[269px] w-[180px] bg-gray-200"></div>
    <div className="p-4 flex-grow">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
    <div className="p-4 border-t border-gray-200 h-4 bg-gray-200 rounded"></div>
  </div>
);

// Componente de esqueleto para a grade de livros
const BooksSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
    {[...Array(4)].map((_, i) => (
      <BookSkeleton key={i} />
    ))}
  </div>
);

export default function Home() {
  const [results, setResults] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("default");
  const [filterQuery, setFilterQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(
          searchQuery
        )}&type=${encodeURIComponent(searchType)}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro na pesquisa");
      }
      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFilteredSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL(`${window.location.origin}/api/search_filtered`);
      url.searchParams.append("query", searchQuery);
      url.searchParams.append("type", searchType);

      filterQuery.split("&").forEach((part) => {
        const [key, value] = part.split("=");
        if (key && value) {
          url.searchParams.append(key, value);
        }
      });

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro na pesquisa filtrada");
      }
      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (showFilters) {
        handleFilteredSearch();
      } else {
        handleSearch();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/next.svg"
              alt="Logo"
              width={120}
              height={30}
              className="dark:invert"
              priority
            />
          </div>

          <div className="flex flex-grow justify-center">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Pesquisar livros..."
                className="w-full px-4 py-2 pl-10 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <button
                onClick={showFilters ? handleFilteredSearch : handleSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center rounded-r-full bg-blue-500 hover:bg-blue-600 text-white px-4"
              >
                Pesquisar
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 ml-4 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {showFilters ? "Ocultar Filtros" : "Filtros"}
          </button>
        </div>
      </header>

      {showFilters && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="searchType" className="block text-sm font-medium text-gray-700">
                  Tipo de Pesquisa
                </label>
                <select
                  id="searchType"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="default">Padrão</option>
                  <option value="title">Título</option>
                  <option value="author">Autor</option>
                </select>
              </div>

              <div>
                <label htmlFor="filterQuery" className="block text-sm font-medium text-gray-700">
                  Filtros (ex: Year=2010&Extension=epub)
                </label>
                <input
                  type="text"
                  id="filterQuery"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Year=2010&Extension=epub"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
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
      </main>
    </div>
  );
}
