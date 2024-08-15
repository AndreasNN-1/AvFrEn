export const getIdData = async (id: string) => {
   const res = await fetch(`https://av-fr-en-andys-projects-0c110f49.vercel.app/api/PageContent/${id}`);
  if (!res.ok) {
    throw new Error(`Error fetching data for ID ${id}: ${res.statusText}`);
  }
  const result = await res.json();
  if (!result.data) {
    throw new Error(`Data with ID ${id} not found`);
  }
  return result.data;
};
