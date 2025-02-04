// import React, { useState, useEffect } from "react";
// import { useGetTermsQuery, useUpdateTermsMutation } from "../redux/features/baseApi/baseApi";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import styles for toast

// const TermsCondition = () => {
//   const { data, error, isLoading } = useGetTermsQuery();
//   const [updateTerms, { isLoading: isUpdating }] = useUpdateTermsMutation();

//   const [text, setText] = useState("");

//   // Load terms from API when available
//   useEffect(() => {
//     if (data?.policy?.content) {
//       setText(data.policy.content);
//     }
//   }, [data]);

//   // Handle Save
//   const handleSave = async () => {
//     if (!text.trim()) {
//       toast.error("Content cannot be empty.");
//       return;
//     }

//     toast.promise(
//       updateTerms({ content: text }).unwrap(),
//       {
//         pending: "Saving...",
//         success: "Terms & Conditions updated!",
//         error: "Failed to update terms. Please try again.",
//       }
//     );
//   };

//   return (
//     <section className="p-8">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

//       <div className="shadow-md p-5 bg-white rounded-lg">
//         <h1 className="text-xl font-semibold mb-4">Terms and Conditions</h1>

//         {/* Show loading state */}
//         {isLoading ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-red-500">Failed to load terms.</p>
//         ) : (
//           <>
//             <textarea
//               type="text"
//               value={text}
//               rows={8}
//               onChange={(e) => setText(e.target.value)}
//               className="border p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//             />

//             {/* Save Button (Hidden if empty) */}
//             {text.trim() && (
//               <button
//                 onClick={handleSave}
//                 disabled={isUpdating}
//                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
//               >
//                 {isUpdating ? "Saving..." : "Edit"}
//               </button>
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default TermsCondition;


import React, { useState, useEffect } from "react";
import { useGetTermsQuery, useUpdateTermsMutation } from "../redux/features/baseApi/baseApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast

const TermsCondition = () => {
  const { data, error, isLoading } = useGetTermsQuery();
  const [updateTerms, { isLoading: isUpdating }] = useUpdateTermsMutation();

  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  // Load terms from API when available
  useEffect(() => {
    if (data?.policy?.content) {
      setText(data.policy.content);
    }
  }, [data]);

  // Handle Save (Update the terms)
  const handleSave = async () => {
    if (!text.trim()) {
      toast.error("Content cannot be empty.");
      return;
    }

    toast.promise(
      updateTerms({ content: text }).unwrap(),
      {
        pending: "Updating...",
        success: "Terms & Conditions updated!",
        error: "Failed to update terms. Please try again.",
      }
    ).then(() => {
      setIsEditing(false); // Disable edit mode after saving
    });
  };

  return (
    <section className="p-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <div className="shadow-md p-5 bg-white rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 text-black ">Terms and Conditions</h1>

        {/* Show loading state */}
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load terms.</p>
        ) : (
          <>
            <textarea
              type="text"
              value={text}
              rows={8}
              onChange={(e) => setText(e.target.value)}
              disabled={!isEditing} // Disable when not in edit mode
              className={`border p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white text-gray-700 font-medium"
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

export default TermsCondition;
