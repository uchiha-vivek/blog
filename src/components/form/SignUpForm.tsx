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
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log('Form submitted:', data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type='text' placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                <Input type='email' placeholder="Enter your email" {...field} />
              </FormControl>
              <FormDescription>
                This is your email address.
              </FormDescription>
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
                <Input type='password' placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
                Enter your password.
              </FormDescription>
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
                <Input type='password' placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormDescription>
                Re-enter your password for confirmation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <GoogleSignInButton>

            Sign up with Google
        </GoogleSignInButton>
        <Button type="submit">Sign Up</Button>
      </form>
      <p>Already have an account?</p>
      <Link href='/sign-in' className='text-blue-500 hover:underline'>Sign-in</Link>
    </Form>
  )
}

export default SignUpForm
