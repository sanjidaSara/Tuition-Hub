import { useState } from "react";
import { Link } from "react-router-dom";

const Student_dashboard = () => {
  // State to hold the post input value
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]); // State to hold all posts
  const [isCreatingPost, setIsCreatingPost] = useState(false); // Toggle new post form

  // Handle the form submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postText.trim() === "") return; // Prevent empty posts

    // Add the new post to the list of posts
    setPosts([...posts, postText]);
    setPostText(""); // Clear the input field
    setIsCreatingPost(false); // Hide the text area
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link to="/update_profile_stu">Profile</Link>
            </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li><a>Log Out</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Student_dashboard;
