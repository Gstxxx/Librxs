interface BookInfoProps {
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  year: string | undefined;
  pages: string | undefined;
  language: string | undefined;
  size: string | undefined;
  extension: string | undefined;
}

export default function BookInfo({
  title,
  author,
  publisher,
  year,
  pages,
  language,
  size,
  extension,
}: BookInfoProps) {
  return (
    <>
      <h2 className="text-xl font-bold mt-4">
        {title ? title : "No Title"}
      </h2>
      <p className="text-gray-600">
        by {author ? author : "Unknown Author"}
      </p>
      <p>Publisher: {publisher ? publisher : "Unknown Publisher"}</p>
      <p>Year: {year ? year : "Unknown Year"}</p>
      <p>Pages: {pages ? pages : "Unknown"}</p>
      <p>Language: {language ? language : "Unknown"}</p>
      <p>Size: {size ? size : "Unknown"}</p>
      <p>Extension: {extension ? extension : "Unknown"}</p>
    </>
  );
} 