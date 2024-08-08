"use client"
import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'  // Import the resolver
import * as z from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'
import GoogleSignInButton from '../GoogleSignIn'

// Define the form validation schema using zod
const FormSchema = z.object({
   email:z.string().min(1,'Email is required').email("Invalid Email")  ,
   password:z.string().min(6,'Password must have minimum 6 words')
})

const SignInForm = () => {
  // Use useForm hook with zodResolver for validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),  // Apply the resolver
    defaultValues: {
      email: "",
      password:""
    },
  })

  // Form submission handler
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log('Form submitted:', data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <GoogleSignInButton>
              Sign in with Google
            </GoogleSignInButton>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md">
              Sign In
            </Button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <Link href='/sign-up' className='text-blue-500 hover:underline'>
              Sign up
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default SignInForm
