import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Chat from './comp/Chatinterface.jsx';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //loader: rootLoader,
    
  },
  {
    path: "/chatpdf",
    element: <Chat />,
    //loader: rootLoader,
    
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
   
  </React.StrictMode>,
)
