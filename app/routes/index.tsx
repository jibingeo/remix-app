import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }) {
  let apiUrl = "https://api.themoviedb.org/3/trending/all/day";
  let res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });

  let { results } = await res.json();

  let prunedData = results.map(({ id, title, poster_path }) => {
    return {
      id,
      title,
      poster_path,
    };
  });
  return json(prunedData);
}

export default function Index() {
  const movies = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <div className="grid grid-cols-4 gap-4 m-4">
        {movies.map(({ id, title, poster_path }) => (
          <div key={id} className="w-64 drop-shadow-md w-full">
            <img
              className="h-full w-full"
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
