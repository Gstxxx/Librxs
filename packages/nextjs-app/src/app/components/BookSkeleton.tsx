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
  export const BooksSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
      {[...Array(4)].map((_, i) => (
        <BookSkeleton key={i} />
      ))}
    </div>
  );

export default BookSkeleton; 