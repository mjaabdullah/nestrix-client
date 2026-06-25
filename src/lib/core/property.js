export const url = process.env.NEXT_PUBLIC_API_URL;

export const getFeaturedProperties = () => {
  const properties = fetch(`${url}/api/feature-properties`).then((res) =>
    res.json(),
  );

  return properties;
};


