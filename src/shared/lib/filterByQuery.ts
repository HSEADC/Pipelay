export const filterByQuery = <T>(
  items: T[],
  query: string,
  makeSearchString: (item: T) => string,
): T[] => {
  const q = query.trim().toLowerCase();

  if (!q) {
    return items;
  }

  return items.filter((item) => {
    const haystack = makeSearchString(item).toLowerCase();
    return haystack.indexOf(q) !== -1;
  });
};

