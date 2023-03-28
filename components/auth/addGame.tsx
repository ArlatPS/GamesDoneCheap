import { addGameForUser } from "@/lib/userLib/addGameForUser";
import { currentUser } from "@clerk/nextjs/app-beta";

// "use client";
export default async function AddGame(id: string) {
  const user = await currentUser();
  if (user?.id) {
    addGameForUser(id, user.id);
    return <h2>ADDed</h2>;
  } else {
    return null;
  }
}
