interface DownloadButtonProps {
  directDownloadLink: string | undefined;
}

export default function DownloadButton({
  directDownloadLink,
}: DownloadButtonProps) {
  return (
    <a
      href={directDownloadLink}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
    >
      Download
    </a>
  );
} 