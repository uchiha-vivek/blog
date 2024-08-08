import Link from "next/link"
import { buttonVariants } from "./ui/button"
import {HandMetal} from 'lucide-react'

const Header = () => {
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
                <li>
                    <Link className={buttonVariants()} href='/sign-in'>
                    signin
                    </Link>
                </li>
            </ul>
            </nav>
        </header>
        </>
    )
}
export default Header