import { getDataInServer } from "./core/get-api";

export const getBookings = async (userId, page = 1) => {
  const api = `/api/my/bookings/${userId}?page=${page}`;
  const data = await getDataInServer(api);
  return data;
};
