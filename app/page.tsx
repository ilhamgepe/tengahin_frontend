import { GetSession } from "@/actions/session";
import Navbar from "@/components/layout/Navbar";
export default async function Home() {
  const session = await GetSession();
  console.log({ ...session });

  return <Navbar>hello</Navbar>;
}
