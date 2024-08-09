import { Button } from "./ui/button";
import { FC, ReactNode, useState } from "react";
import { signIn } from "next-auth/react";
import { boolean } from "zod";
interface GoogleSignInButtonProps {
    children :ReactNode 
}

const GoogleSignInButton : FC<GoogleSignInButtonProps> = ({children}) => {
    
    const[loading,setLoading]= useState<boolean>(false)

    const loginWithGoogle = () => signIn('google',{callbackUrl:'http://localhost:3000/admin'})
      
    
    return (
        <>
        <Button onClick={loginWithGoogle}  className="w-full" >
            {children}
        </Button>
        </>
    )
}
export default GoogleSignInButton