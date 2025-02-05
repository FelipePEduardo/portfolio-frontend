export function mountUrl(url: string, queryParams: Record<string, unknown>) {
  const params = Object.entries(queryParams).reduce(
    (acc, [key, value]) => {
      if (!key || !value) return acc;

      if (!acc.length) {
        acc += `?${key}=${value}`;
        return acc;
      }

      acc += `&${key}=${value}`;

      return acc;
    },
    ''
  );

  return `${url}${params}`;
}
