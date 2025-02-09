"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import SearchBar from "@/app/components/SearchBar";
import FilterBar from "@/app/components/FilterBar";
import BookList from "@/app/components/BookList";
import { Book } from "@/app/types";


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
          <div className="flex items-center gap-4">
            <Image
              src="/LX.svg"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"

              priority

            />
            <h1 className="text-2xl font-bold text-blue-400">Libr<span className="text-black">x</span>s</h1>
          </div>

          <SearchBar

            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleKeyPress={handleKeyPress}
            showFilters={showFilters}
            handleSearch={handleSearch}
            handleFilteredSearch={handleFilteredSearch}
          />

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 ml-4 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {showFilters ? "Ocultar Filtros" : "Filtros"}
          </button>
        </div>
      </header>

      {showFilters && (
        <FilterBar
          searchType={searchType}
          setSearchType={setSearchType}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
          handleKeyPress={handleKeyPress}
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <BookList loading={loading} results={results} error={error} />
      </main>
    </div>
  );
}
