import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@radix-ui/themes/styles.css';
import App from './App.jsx'
import './index.css'
import { Theme } from '@radix-ui/themes';
import {createBrowserRouter,  RouterProvider,} from "react-router-dom";
import Dashboard from './pages/Dashboard.jsx';
import Common from './pages/Common.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Dashboard/>,
      },
      {
        path: "/test",
        element: <Common/>,
      }
    ]
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
