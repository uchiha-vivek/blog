import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import {HandMetal} from 'lucide-react'
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { signOut } from "next-auth/react"
import UserAccountNav from "./UserAccountNav"

const Header = async() => {
    const session = await getServerSession(authOptions)
    return (
        <>
        <header className="bg-blue-500 p-4">
            <nav className="flex justify-between items-center max-w-4xl mx-auto">
                 <Link href='/' className="text-white text-2xl font-bold " > <HandMetal/> </Link>
             
            <ul className="flex space-x-4">
                <li>
                    <Link href='/blogs' className="text-white hover:underline">
                    <HandMetal/>
                    </Link>
                </li>
                {/* <li>
                    <Link className={buttonVariants()} href='/sign-in'>
                    signin
                    </Link>
                </li> */}
                {session?.user ? (
                    <UserAccountNav/>
                ) : (
                     <Link className={buttonVariants()} href='sign-in' >
                     SignIn
                     </Link>
                ) }
            </ul>
            </nav>
        </header>
        </>
    )
}
export default Header