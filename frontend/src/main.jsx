import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@radix-ui/themes/styles.css';
import App from './App.jsx'
import './index.css'
import { Theme } from '@radix-ui/themes';
import {createBrowserRouter,  RouterProvider,} from "react-router-dom";
import Layout from './Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <App/>,
      },
      {
        path: "/",
        element: <Dashboard/>,
      }
    ]
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
