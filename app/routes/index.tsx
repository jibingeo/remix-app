import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  let apiUrl = `https://api.themoviedb.org/3/trending/all/day?page=${page}`;
  let res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });
  let { results, success, status_message } = await res.json();
  if (success === false) {
    throw new Error(status_message);
  }
  let prunedData = results.map(({ id, title, poster_path }) => {
    return {
      id,
      title,
      poster_path,
    };
  });
  return json({
    movies: prunedData,
    nextPage: page + 1,
  });
}

export default function Index() {
  const { movies, nextPage } = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <div className="drop-shadow-md bg-sky-900">
        <div className="max-w-6xl m-auto p-4">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            className="h-6 cursor-pointer"
          />
        </div>
      </div>
      <div className="max-w-6xl m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movies.map(({ id, title, poster_path }) => (
          <div
            key={id}
            className="w-64 drop-shadow-md bg-white rounded-md overflow-hidden w-full cursor-pointer"
          >
            <img
              className="h-full w-full"
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            />
          </div>
        ))}
      </div>
        <div className="max-w-6xl text-center m-auto p-4">
      <Link to={`?page=${nextPage}`}>Next</Link>{" "}
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return <div>{error.toString()}</div>;
}
