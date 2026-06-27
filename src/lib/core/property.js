import { authClient } from "../auth-client";

export const url = process.env.NEXT_PUBLIC_API_URL;

export const getFeaturedProperties = () => {
  const properties = fetch(`${url}/api/feature-properties`).then((res) =>
    res.json(),
  );

  return properties;
};

export const saveToFavorites = async (favorite) => {
  const { data: session } = await authClient.token();
  const res = await fetch(`${url}/api/add-to-favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify(favorite),
  });

  return res.json();
};


export const removeFromFavorites = async (favorite) => {
  const { data: session } = await authClient.token();
  const res = await fetch(`${url}/api/remove-from-favorite`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify(favorite),
  });

  return res.json();
};
