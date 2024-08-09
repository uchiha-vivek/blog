"use client"
import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'  
import * as z from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'
import GoogleSignInButton from '../GoogleSignIn'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'

// Define the form validation schema using zod
const FormSchema = z.object({
   username: z.string().min(1, "Username is required").max(100),
   email: z.string().min(1, 'Email is required').email("Invalid Email"),
   password: z.string().min(6, 'Password must have a minimum of 6 characters'),
   confirmPassword: z.string().min(6, 'Password should be at least 6 characters')
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
});

const SignUpForm = () => {
  const router = useRouter()
  const { toast } = useToast() // Corrected useToast usage

  // Use useForm hook with zodResolver for validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),  // Apply the resolver
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/user',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password
      })
    })
    if(response.ok){
      router.push('/sign-in')
    } else {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <GoogleSignInButton>
              Sign up with Google
            </GoogleSignInButton>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md">
              Sign Up
            </Button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link href='/sign-in' className='text-blue-500 hover:underline'>
              Sign in
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default SignUpForm
 