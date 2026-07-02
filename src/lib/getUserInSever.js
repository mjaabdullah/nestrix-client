import { auth } from "@/lib/auth";
import { cookies } from "next/headers";

export const getUser = async () => {
  const cookieStore = await cookies();

  const cookieString = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const session = await auth.api.getSession({
    headers: {
      cookie: cookieString,
    },
  });

  return session?.user || null;
};
