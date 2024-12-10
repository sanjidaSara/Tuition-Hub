
import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2/src/sweetalert2.js';
import { AuthContext } from "../Pages/Authentication/Providers/AuthProvider";

const Profile = () => {
  const[userProfile,setUserProfile]=useState({});
  const [profile,setProfile]=useState(false);
 
  const { checkProfileExists,user } = useContext(AuthContext); 

  useEffect(()=>{
    checkProfileExists(user).then(res=>{
     // console.log(res);
      setProfile(res.exists)
      if(res.exists){
        setUserProfile(res.data);
      }
      //console.log(profile);
      //console.log(userProfile);
    });

  },[])

  if (!profile) {
    return <div>No profile data found.</div>;  // Handle case where no data is returned
  }

  const { _id, fullName, institution, age, phone, email, subjects, availabilityDays, profileImage } = profile;
 
  return (
    <div className="card align-text-bottom mx-4 my-10 mt-6 mb-10 w-96 text-center  glass w-3/8">
    <figure>
          <img
            src={`http://localhost:3000/image/`+userProfile?.image}
            alt="car!" />
        </figure>
   

        <div className="card-body ali font-semibold text-justify">
        <h1><span className="font-black">Name:         </span>  {userProfile.fullName}   </h1>
        <h1><span className="font-black">Age:             </span>  {userProfile.age}</h1>
        <h1><span className="font-black">Institution:     </span>  {userProfile.institution}</h1>
        <h1><span className="font-black">Phone:           </span>   {userProfile.phone}</h1>
        <h1><span className="font-black">Email:           </span>      {userProfile.email}</h1>
        <h1><span className="font-black">Subjects:        </span>{userProfile.subjects}</h1>
        <h1><span className="font-black">AvailabilityDays:</span>{userProfile.availabilityDays}</h1>

         <div className="flex">
        <Link to={`UpdateProfile/${_id}`}>
         <button 
          className="btn btn-secondary">Edit</button>
        </Link>
         </div>
          
        </div>
      </div>
  );
};

export default Profile;



