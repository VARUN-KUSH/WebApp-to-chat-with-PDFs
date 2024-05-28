import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ProjectCreation = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    const { title, description, pdfFile } = data;

    if (!pdfFile[0]) {
      setMessage('PDF file is required.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Step 1: Upload PDF to S3
      const formData = new FormData();
      formData.append('file', pdfFile[0]);
      formData.append('title', title);
      formData.append('description', description);

    //   const uploadResponse = await axios.post('/api/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });

    //   if (uploadResponse.status !== 200) {
    //     throw new Error('Failed to upload PDF.');
    //   }

    //   const pdfUrl = uploadResponse.data.url;

      // Step 2: Create project with PDF URL
      console.log("here i am")
      console.log(formData.title)
      const projectResponse = await axios.post('http://localhost:3000/api/createproject', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(projectResponse)
      if (projectResponse.status === 201) {
        setMessage('Project created successfully.');
      } else {
        setMessage('Failed to create project.');
      }
    } catch (error) {
      setMessage('An error occurred while creating the project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Create a New Project</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register('title', { required: true })}
          />
          {errors.title && <p className="text-red-600 text-sm">Title is required.</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register('description', { required: true })}
          ></textarea>
          {errors.description && <p className="text-red-600 text-sm">Description is required.</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">PDF File</label>
          <input
            type="file"
            accept="application/pdf"
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500"
            {...register('pdfFile', { required: true })}
          />
          {errors.pdfFile && <p className="text-red-600 text-sm">PDF file is required.</p>}
        </div>
        {message && (
          <div className={`mb-4 p-2 text-sm ${message.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </div>
        )}
        <div className="mb-4">
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectCreation;
