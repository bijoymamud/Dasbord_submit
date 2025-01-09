// import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";
// import React from "react";

// const TermsAndConditions = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Terms & Condition</h1>

//               <div className="flex justify-end gap-10 mb-5">
//                   <div className="">
//                   <select className="select select-bordered ">
//   <option disabled selected>12</option>
//   <option>14</option>
//   <option>16</option>
// </select>
//                   </div>
                  
//                   <div className="flex items-center gap-2">
//                       <Bold className="cursor-pointer"/>
//                       <Italic className="cursor-pointer"/>
//                       <Underline className="cursor-pointer"/>
//                   </div>

//                   <div className="flex items-center gap-2">
//                       <AlignLeft className="cursor-pointer"/>
//                       <AlignCenter className="cursor-pointer"/>
//                       <AlignRight className="cursor-pointer"/>
//                   </div>
//               </div>
//         <textarea
//           className="w-full h-96 border border-blue-500 rounded-lg p-4 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Enter your terms and conditions here..."
//           defaultValue={`Welcome to CleverTalk. By using our services, you agree to abide by the terms and conditions outlined below. These terms govern your access to and use of CleverTalk’s tools and services, so please review them carefully before proceeding.

// CleverTalk provides innovative tools designed to enhance how you capture and manage voice recordings. Our services include voice-to-text transcription and AI-driven summarization, which are intended for lawful, ethical purposes only. You must ensure compliance with applicable laws, including obtaining consent from all participants when recording conversations. CleverTalk disclaims liability for any misuse of its tools.`}
//         ></textarea>

//         <div className="flex gap-3 items-center mt-6">
//           <button className="bg-blue-500 text-white font-medium py-2 px-8 rounded-lg hover:bg-blue-600 transition duration-300">
//             SAVE
//           </button>

//           <button className="bg-red-500 text-white font-medium py-2 px-8 rounded-lg hover:bg-red-600 transition duration-300">
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsAndConditions;



import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import ReactQuill styles
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";

const TermsAndConditions = () => {
  const [editorValue, setEditorValue] = useState(`
    Welcome to CleverTalk. By using our services, you agree to abide by the terms and conditions outlined below. These terms govern your access to and use of CleverTalk’s tools and services, so please review them carefully before proceeding.<br/>
    CleverTalk provides innovative tools designed to enhance how you capture and manage voice recordings. Our services include voice-to-text transcription and AI-driven summarization, which are intended for lawful, ethical purposes only. You must ensure compliance with applicable laws, including obtaining consent from all participants when recording conversations. CleverTalk disclaims liability for any misuse of its tools.
  `);

  const handleSave = () => {
    console.log("Saved Content:", editorValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Terms & Conditions</h1>

        <div className="flex justify-end gap-10 mb-5">
          <div>
            <select className="select select-bordered">
              <option disabled selected>
                12
              </option>
              <option>14</option>
              <option>16</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Bold className="cursor-pointer" />
            <Italic className="cursor-pointer" />
            <Underline className="cursor-pointer" />
          </div>

          <div className="flex items-center gap-2">
            <AlignLeft className="cursor-pointer" />
            <AlignCenter className="cursor-pointer" />
            <AlignRight className="cursor-pointer" />
          </div>
        </div>

        {/* ReactQuill Editor */}
        <ReactQuill
          value={editorValue}
          onChange={setEditorValue}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"], // Text formatting
              [{ list: "ordered" }, { list: "bullet" }], // Lists
              [{ align: [] }], // Alignment
              ["link", "image"], // Media
              ["clean"], // Clear formatting
            ],
          }}
          className="border border-blue-500 rounded-lg"
          placeholder="Enter your terms and conditions here..."
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

export default TermsAndConditions;
