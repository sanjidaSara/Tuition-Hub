import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./Providers/AuthProvider";
import Swal from 'sweetalert2'
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { useEffect } from "react";
const Teacher_login = () => {
  const {createUser,user,userRole,checkProfileExists}=useContext(AuthContext);

  const { signIn,setUser } = useContext(AuthContext); 
   // Access signIn from AuthContext
   const navigate = useNavigate();
   useEffect(() => {
    const checkAndNavigate = async () => {
      //console.log(user);
      console.log(userRole)
        if (userRole === 'teacher') {
            const profileExists = await checkProfileExists(user);
            //console.log(profileExists.exists)  // Check profile existence
            if (profileExists.exists) {
                navigate('/profile');
            } else {
                navigate('/AddProfile');
            }
        } else if (userRole === 'student') {
            navigate('/student_dashboard');
        }
    };

    if (userRole) {
        checkAndNavigate();  // Call the function when userRole is available
    }
}, [userRole, user]);  // Ensure it runs when userRole or user ID changes



const handleLogin = async (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  try {
      // Sign in with Firebase
      const result = await signIn(email, password);
      const User = result.user;
      setUser(User.uid)
     // console.log(user.uid);

      // Check if the user's profile exists in MongoDB
      const profileExists = await checkProfileExists(user);  // Check using Firebase user UID or email

      // Redirect based on profile existence
      if(userRole==='teacher'){
      if (profileExists) {
          navigate('/profile');  // Navigate to Profile Page
      } else {
          navigate('/AddProfile');  // Navigate to Add Profile Page
      }}
      else{
        navigate('/student_dashboard')
      }

      // Reset the form after a successful login
      form.reset();

  } catch (error) {
      Swal.fire({
          title: 'Not Valid',
          text: 'You have to register first!',
          icon: 'error',
          confirmButtonText: 'Try Again'
      });
  }
};


  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Log in now!</h1>
          <p className="py-6 text-xl">
            We value your skills. Log in to connect with us.
          </p>
          <div className="mt-2 text-center">
            <Link to='/'>
              <button className="btn btn-primary">Go Back</button>
            </Link>
          </div>
        </div>
        
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email" 
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
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
                value="Login"
              />
             
            </div>
          </form>
          <p className="text-center mb-4">
            New to TuitionHub? 
            <Link to="/signUpTeacher" className="text-orange-600 font-bold">
              Register
            </Link>
          </p>
          
        </div>
      </div>
      
       
    </div>
  );
};

export default Teacher_login;

