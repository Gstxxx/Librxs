interface BookMirrorsProps {
  mirror1: string | undefined;
  mirror2: string | undefined;
  mirror3: string | undefined;
}

export default function BookMirrors({
  mirror1,
  mirror2,
  mirror3,
}: BookMirrorsProps) {
  if (!mirror1 && !mirror2 && !mirror3) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mt-4">Mirrors:</h3>
      <ul>
        {mirror1 && (
          <li className="mb-1">
            <a
              href={mirror1}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Mirror 1
            </a>
          </li>
        )}
        {mirror2 && (
          <li className="mb-1">
            <a
              href={mirror2}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Mirror 2
            </a>
          </li>
        )}
        {mirror3 && (
          <li className="mb-1">
            <a
              href={mirror3}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Mirror 3
            </a>
          </li>
        )}
      </ul>
    </div>
  );
} 