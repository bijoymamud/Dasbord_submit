import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

const PrivacyPolicy = () => {
  
  const [editorValue, setEditorValue] = useState("");

  
  const handleSave = () => {
    console.log("Saved Content:", editorValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Privacy Policy</h1>

     
        <ReactQuill
          value={editorValue}
          onChange={setEditorValue}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"], 
              [{ list: "ordered" }, { list: "bullet" }], 
              [{ align: [] }], 
              ["link", "image"], 
              ["clean"], 
            ],
          }}
          className="rounded-2xl"
          placeholder="Write down your Privacy Policy here..."
        />

    
        <div className="flex gap-3 items-center mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white font-medium py-2 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            SAVE
          </button>

          <button className="bg-red-500 text-white font-medium py-2 px-8 rounded-lg hover:bg-red-600 transition duration-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
