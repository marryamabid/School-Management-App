import { currentUser } from "@clerk/nextjs/server";
import ClientMenu from "./ClientMenu";

export default async function MenuServer() {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string | undefined;

  if (!role) return null;

  return <ClientMenu role={role} />;
}
