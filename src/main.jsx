import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Roots from './Components/Roots/Roots.jsx';
import Home from './Components/Pages/Home.jsx';

import Teachers_info from './Components/Pages/Teachers_info.jsx';
import Contact_us from './Components/Pages/Contact_us.jsx';
import About_us from './Components/Pages/About_us.jsx';

import Teacher_login from './Components/Pages/Authentication/Teacher_login.jsx';
//import Student_login from './Components/Pages/Authentication/Student_login.jsx';
import SignUpTeacher from './Components/Pages/Authentication/SignUpTeacher.jsx';
import AuthProvider from './Components/Pages/Authentication/Providers/AuthProvider.jsx';
import Postpage from './Components/Teacher/Postpage.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import Profile from './Components/Teacher/Profile.jsx';

import AddProfile from './Components/Teacher/AddProfile.jsx';
import UpdateProfile from './Components/Teacher/UpdateProfile.jsx';
import Post from './Components/Pages/Student/Post.jsx';
import Student_dashboard from './Components/Pages/Student/Student_Dashboard.jsx';
import Update_Profile_Stu from './Components/Pages/Student/Update_Profile_Stu.jsx'
import Log_Out from './Components/Pages/Student/Log_Out.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:<Roots></Roots>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        
      },
      {
        path: "/teacher_info",

        element: <PrivateRoute><Teachers_info></Teachers_info></PrivateRoute>,
        loader: ()=>fetch('http://localhost:3000/tuitionHub'),
        

      },
      {
        path: "/contact",
        element:<Contact_us></Contact_us>
        
      },
      {
        path: "/about",
        element:<About_us></About_us>
        
      },
      {
        path: "/teacher_login",
    element:<Teacher_login></Teacher_login>, 
       
      },
     
      {
        path: "/signUpTeacher",
    element:<SignUpTeacher></SignUpTeacher>, 
       
      },
      {
        path: "/Postpage",
    element:<PrivateRoute ><Postpage></Postpage></PrivateRoute>, 
       
      },
      {

        path: "/profile/:id",
    element:/*<PrivateRoute requiredRole="teacher" >*/<Profile></Profile>/*</PrivateRoute>*/, 
    loader: ({ params }) => fetch(`http://localhost:3000/tuitionHub/${params.id}`)
      },
      {
        path: "/AddProfile",
    element:<AddProfile></AddProfile>, 
       
      },
      {
        path: "/UpdateProfile/:id",
    element:<UpdateProfile></UpdateProfile>, 
    loader: ({params})=>fetch(`http://localhost:3000/tuitionHub/${params.id}`)
      },
      {

        path: "/profile",
        element:<PrivateRoute requiredRole="teacher" ><Profile></Profile></PrivateRoute>, 
       
      },
      {
        path: "/student_dashboard",
        element:<Student_dashboard/>, 
       
      },
      {
        path: "/update_profile_stu",
        element:<Update_Profile_Stu></Update_Profile_Stu>,
        loader: ({params})=>fetch(`http://localhost:3000/tuitionHub/${params.id}`) 
       
      },
      {
        path: "/posts",
        element:<Post/>, 
       
      },
    

      
      
     
    
    ],
    
    
  },
 
]);


createRoot(document.getElementById('root')).render(
 <div className='max-w-full '>
 <StrictMode>
   <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
  </div>
)
