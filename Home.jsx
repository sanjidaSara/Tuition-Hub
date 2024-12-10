import { NavLink } from "react-router-dom";
import Banner from "./Banner";




const Home = () => {


    return (
        <div className="w-full v-screen">
         <Banner></Banner>
         <div className="dropdown dropdown-hover p-3 text-center">
  <div  tabIndex={0} role="button" className="btn m-1 bg-purple-400 ">Get Started</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <NavLink to='/teacher_login'><li><a>Sign up as a teacher</a></li></NavLink>
    <NavLink to='/student_login'><li><a>Sign up as a student</a></li></NavLink>
  </ul>
</div>
        </div>
    );
};

export default Home;