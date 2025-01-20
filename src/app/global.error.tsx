'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error.digest);
  console.log(error.message);
  return (
    <html>
      <body>
        <h1>An error occurred. Please try again.</h1>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
