export async function searchService() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  return response.json();
}