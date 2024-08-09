import Form from "@/components/Form";
import { buttonVariants } from "@/components/ui/button";
import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
export default async function Home() {
  const session  = await getServerSession(authOptions)
  return (
     <main>
     <Link className={buttonVariants()} href='/admin' >  Welcome to Admin Page </Link>

       <h2>Client Session</h2>
       <User/>
       <h2> Server Session</h2>
         {JSON.stringify(session)}
   
     </main>
  );
}
