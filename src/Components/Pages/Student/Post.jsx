import { useState } from "react";

const Post = () => {
  const [postText, setPostText] = useState(""); // State for the new post text
  const [posts, setPosts] = useState([]); // State to hold all posts
  const [isCreatingPost, setIsCreatingPost] = useState(false); // Toggle new post form

  // Handle form submission to add a new post
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postText.trim() === "") return; // Prevent empty posts

    // Add the new post to the list of posts
    setPosts([...posts, postText]);
    setPostText(""); // Clear the text area
    setIsCreatingPost(false); // Hide the text area after submission
  };

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Posts</h1> */}

      {/* Button to show text area for new post */}
      {!isCreatingPost && (
        <button
          onClick={() => setIsCreatingPost(true)}
          className="btn btn-primary mb-4"
        >
          New Post
        </button>
      )}

      {/* Text area for new post */}
      {isCreatingPost && (
        <form onSubmit={handlePostSubmit} className="mb-4">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Write your post here..."
            className="textarea textarea-bordered w-full"
            rows="4"
          ></textarea>
          <div className="flex justify-end mt-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsCreatingPost(false)}
              className="btn btn-ghost ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Display previous posts */}
      {posts.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Previous Posts</h3>
          <ul className="list-disc list-inside mt-2">
            {posts.map((post, index) => (
              <li key={index} className="mt-1 bg-base-100 p-2 rounded">
                {post}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No posts yet. Be the first to post!</p>
      )}
    </div>
  );
};

export default Post;
