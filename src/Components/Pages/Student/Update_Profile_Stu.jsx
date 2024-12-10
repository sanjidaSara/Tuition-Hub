import { useState } from "react";

const Profile = () => {
  // Initial student data (you can replace it with data from an API later)
  const [studentInfo, setStudentInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    age: 20,
    institution: "XYZ University",
  });

  // State to manage the form inputs
  const [editMode, setEditMode] = useState(false); // Toggle between view and edit mode
  const [updatedInfo, setUpdatedInfo] = useState(studentInfo);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo({ ...updatedInfo, [name]: value });
  };

  // Handle form submission to update student information
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStudentInfo(updatedInfo); // Update student information
    setEditMode(false); // Switch back to view mode
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {editMode ? (
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={updatedInfo.fullName}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={updatedInfo.email}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={updatedInfo.age}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Institution</label>
            <input
              type="text"
              name="institution"
              value={updatedInfo.institution}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="btn btn-ghost ml-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Full Name:</strong> {studentInfo.fullName}</p>
          <p><strong>Email:</strong> {studentInfo.email}</p>
          <p><strong>Age:</strong> {studentInfo.age}</p>
          <p><strong>Institution:</strong> {studentInfo.institution}</p>

          <button
            onClick={() => setEditMode(true)}
            className="btn btn-primary mt-4"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
