import React, { useState, useEffect } from "react";
import { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } from "../redux/features/baseApi/baseApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast

const PrivacyPolicy = () => {
  const { data, error, isLoading } = useGetPrivacyPolicyQuery();
  const [updatePrivacyPolicy, { isLoading: isUpdating }] = useUpdatePrivacyPolicyMutation();

  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  // Load terms from API when available
  useEffect(() => {
    if (data?.policy?.content) {
      setText(data.policy.content);
    }
  }, [data]);

  // Handle Save (Update the policy)
  const handleSave = async () => {
    if (!text.trim()) {
      toast.error("Content cannot be empty.");
      return;
    }

    toast.promise(
      updatePrivacyPolicy({ content: text }).unwrap(),
      {
        pending: "Updating...",
        success: "Privacy Policy updated!",
        error: "Failed to update policy. Please try again.",
      }
    ).then(() => {
      setIsEditing(false); // Disable edit mode after saving
    });
  };

  return (
    <section className="p-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <div className="shadow-md p-5 bg-white rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 text-black">Privacy Policy</h1>

        {/* Show loading state */}
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load privacy policy.</p>
        ) : (
          <>
            <textarea
              type="text"
              value={text}
              rows={8}
              onChange={(e) => setText(e.target.value)}
              disabled={!isEditing} // Disable when not in edit mode
              className={`border p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white text-gray-700 font-semibold"
              }`}
            />

            {/* Buttons */}
            <div className="mt-4 flex gap-2 justify-end">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)} // Enable editing
                  className="bg-green-500 text-white px-10 py-2 rounded-md hover:bg-green-600"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="bg-blue-500 text-white px-10 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PrivacyPolicy;
