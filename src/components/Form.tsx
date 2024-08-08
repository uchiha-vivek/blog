"use client"
import { FormData } from '@/types/blog';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const inputClass = 'w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300';

const Form = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full mx-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Create a Blog Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="Enter the title"
                            name="title"
                            onChange={handleChange}
                            value={formData.title}
                        />
                    </div>
                    <div className="mb-6">
                        <TextareaAutosize
                            minRows={5}
                            name="content"
                            className={inputClass}
                            placeholder="Enter the post"
                            onChange={handleChange}
                            value={formData.content}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Form;
