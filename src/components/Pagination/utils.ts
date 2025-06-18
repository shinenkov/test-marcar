export function getPageNumbers(page: number, lastPage: number) {
  const maxButtons = 3;
  let start = Math.max(1, page - Math.floor(maxButtons / 2));
  let end = start + maxButtons - 1;

  if (end > lastPage) {
    end = lastPage;
    start = Math.max(1, end - maxButtons + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
