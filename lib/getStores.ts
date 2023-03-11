export default async function getStores() {
  // revalidate stores every 24h
  const response = await fetch("http://localhost:3000/api/stores", {
    next: { revalidate: 24 * 60 * 60 },
  });
  const responseAfterJSON = await response.json();
  return responseAfterJSON;
}
