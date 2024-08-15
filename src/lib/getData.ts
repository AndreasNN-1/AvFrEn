export const getData = async () => {
  const res = await fetch("http://localhost:3000/api/PageContent/" );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const result = await res.json();
  return result.data; // Ensure this returns an array
};
