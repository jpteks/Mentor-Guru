function extractIdFromUrl(url: string): string | null {
  const regex = /\/f\/([a-zA-Z0-9]+)/; // Regular expression to match the ID part
  const match = url.match(regex);
  return match ? match[1] : null; // Return the ID or null if not found
}
export default extractIdFromUrl;
