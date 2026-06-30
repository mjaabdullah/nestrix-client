import { authClient } from "../auth-client";

export const url = process.env.NEXT_PUBLIC_API_URL;

export const getFeaturedProperties = () => {
  const properties = fetch(`${url}/api/feature-properties`).then((res) =>
    res.json(),
  );

  return properties;
};



export const getFavorites = async (favorite) => {
  const { data: session } = await authClient.token();
  const res = await fetch(
    `${url}/api/favorites?userId=${favorite.userId}&propertyId=${favorite.propertyId}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.token}`,
      },
    },
  );
  return res.json();
};



export const getFavoritesByUser = async (userId) => {
  const { data: session } = await authClient.token();
  const res = await fetch(`${url}/api/favorites-by-user?userId=${userId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.token}`,
    },
  });
  return res.json();
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


export const getTopReviews = async () => {
  const res = await fetch(`${url}/api/top-reviews`);
  return res.json();
};
