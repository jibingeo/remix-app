import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const vercelId = request.headers.get("x-vercel-id");
  return json({
    vercelId,
  });
};

export default function Index() {
  const { vercelId } = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Products</h1>
      <div>{vercelId}</div>
    </div>
  );
}
