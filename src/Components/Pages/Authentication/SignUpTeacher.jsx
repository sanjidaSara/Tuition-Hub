

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Providers/AuthProvider";
import Swal from 'sweetalert2'
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const SignUpTeacher = () => {

    const {createUser,user,userRole}=useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUp = event => {
        event.preventDefault();
        const form=event.target;
       const name=form.name.value;
       const email=form.email.value;
       const password=form.password.value;
       console.log(name,email,password)
       const userRole=form.userRole.value

       createUser(email, password,userRole)
   .then(result => {
      const user = result.user;
      console.log(user);
      form.reset(); 
       // Correcting the form reset
       if (userRole === 'teacher') {
        navigate('/profile');  // Navigate to Profile for teachers
    } else if (userRole === 'student') {
        navigate('/student_dashboard');  // Navigate to PostPage for students
    }

     // navigate('/profile');  // Ensure this route exists in your React Router setup
   })
   .catch(error => {
    Swal.fire({
     // title: 'Error!',
      text: 'Not Valid !',
      icon: 'error',
      confirmButtonText: 'Try Again'
    })
  });

      };

    return (
        <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6 text-xl">
            We value your skills. Sign Up to begin your journey with us.
          </p>
          <div className="mt-2 text-center">
            <Link to='/'>
              <button className="btn btn-primary">Go Back</button>
            </Link>
          </div>
        </div>
        
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignUp} className="card-body">

          <div className="form-control">
              <label className="label">
                <span className="label-text" >Name</span>
              </label>
              <input
               name="name"
                type="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>





            <div className="form-control">
              <label className="label">
                <span className="label-text" >Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>



            <div className="form-control">
              <label className="label">
                <span className="label-text" >Sign Up as</span>
              </label>
              <input
               name="userRole"
                type="name"
                placeholder="'teacher' or 'student'"
                className="input input-bordered"
                required
              />
            </div>



            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                 name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              
              <input
                className="btn btn-primary"
                type="submit"
                value="SignUp"
              />
            
            </div>
          </form>
          <p className="text-center mb-4 ">
            Already have an account? 
            <Link to= "/teacher_login" className="text-orange-600 font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
    )
};


export default SignUpTeacher;