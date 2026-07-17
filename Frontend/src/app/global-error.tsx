"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="bg-black text-white flex flex-col items-center justify-center min-h-screen p-4 font-sans">
        <div className="max-w-md text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-red-500">Something went wrong!</h2>
          <p className="text-gray-400">
            A critical error occurred. Please try reloading the application.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
