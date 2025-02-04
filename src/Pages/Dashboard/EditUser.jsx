// import { ArrowLeft, UsersRound, FileText } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import { FaTrashAlt } from "react-icons/fa";
// import { LuDownload } from "react-icons/lu";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import {
//   useDeleteSingleUserDocumentMutation,
//   useGetSingleUserQuery,
// } from "../redux/features/baseApi/baseApi";

// const EditUser = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { data, error, isLoading, refetch } = useGetSingleUserQuery(id);
//   const [deleteSingleUserDocument] = useDeleteSingleUserDocumentMutation();

//   // Store chat history in local state
//   const [chatList, setChatList] = useState([]);

//   // Update state when API data changes
//   useEffect(() => {
//     if (data?.chatHistory) {
//       setChatList(data.chatHistory);
//     }
//   }, [data]);

//   console.log("Chat history:", chatList);

//   // Function to format timestamp
//   const formatDate = (timestamp) => {
//     if (!timestamp) return "No date available";
//     const date = new Date(timestamp);
//     return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
//   };

//   // Handle chat deletion
//   const handleDelete = async (chatId) => {
//     try {
//       await deleteSingleUserDocument(chatId).unwrap();
//       setChatList((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
//       refetch();
//       alert("Chat deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting chat:", error);
//     }
//   };

//   // Function to generate Messenger-style chat PDF




// const handleDownloadPDF = (chat) => {
//   if (!chat?.chat_contents || chat.chat_contents.length === 0) {
//     alert("No chat data available to download.");
//     return;
//   }

//   const doc = new jsPDF();
//   doc.setFont("helvetica");

//   // Title
//   doc.setFontSize(16);
//   doc.text("Chat Conversation", 105, 15, { align: "center" });

//   let y = 30; // Start Y position for messages
//   const pageHeight = doc.internal.pageSize.height; // Get page height

//   chat.chat_contents.forEach((msg) => {
//     const isUser = msg.sent_by === "User";
//     const xPosition = isUser ? 110 : 15; // Right for user, left for bot
//     const bubbleWidth = 80;

//     // **Wrap text inside the bubble**
//     const wrappedText = doc.splitTextToSize(msg.text_content, bubbleWidth - 10);
//     const textHeight = wrappedText.length * 5; // Line height of 5
//     const bubbleHeight = textHeight + 10;

//     // **Check if the message fits on the current page**
//     if (y + bubbleHeight + 15 > pageHeight) {
//       doc.addPage();
//       y = 30; // Reset Y position for new page
//     }

//     // **Set colors for chat bubbles**
//     if (isUser) {
//       doc.setFillColor(0, 122, 255); // Blue for user
//       doc.setTextColor(255, 255, 255); // White text
//     } else {
//       doc.setFillColor(200, 200, 200); // Gray for bot
//       doc.setTextColor(0, 0, 0); // Black text
//     }

//     // **Draw chat bubble**
//     doc.roundedRect(xPosition, y, bubbleWidth, bubbleHeight, 5, 5, "F");

//     // **Add wrapped text inside the bubble**
//     doc.text(wrappedText, xPosition + 5, y + 7);

//     // **Add timestamp above message**
//     doc.setFontSize(9);
//     doc.setTextColor(100);
//     doc.text(new Date(msg.timestamp).toLocaleString(), xPosition, y - 3);

//     y += bubbleHeight + 15; // Move down for next message
//   });

//   // Save the PDF
//   doc.save(`chat_${chat._id}.pdf`);
// };

  

//   const user = data?.user;

//   return (
//     <div className="min-h-screen px-10 py-16">
//       <div className="mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
//         <div className="p-6 flex items-center justify-between">
//           <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
//         </div>

//         <div className="p-6 bg-white text-black">
//           {isLoading ? (
//             <p className="text-gray-500">Loading user details...</p>
//           ) : error ? (
//             <p className="text-red-500">Failed to load user data.</p>
//           ) : (
//             <div className="flex items-center justify-between border rounded-md py-5 px-6">
//               <div className="flex items-center space-x-4">
//                 <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center font-bold text-3xl">
//                   <UsersRound size={32} />
//                 </div>
//                 <div className="flex flex-col">
//                   <h2 className="text-xl font-bold">Name: {user?.name || "N/A"}</h2>
//                   <p className="text-xl font-bold">Email: {user?.email || "N/A"}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* User Files Table */}
//         <div className="p-6 h-screen overflow-x-auto">
//           <table className="table w-full">
//             <thead>
//               <tr className="text-lg">
//                 <th className="text-start w-[15%]">Date</th>
//                 <th className="text-start w-[40%]">File Title</th>
//                 <th className="text-start w-[20%]">File Type</th>
//                 <th className="text-start w-[15%]">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {chatList.length > 0 ? (
//                 chatList.map((chat, index) => (
//                   <tr key={index} className="hover border-b">
//                     <td className="py-2 text-base w-[15%] whitespace-nowrap">
//                       {formatDate(chat?.chat_contents?.at(-1)?.timestamp)}
//                     </td>
//                     <td className="text-base w-[40%] truncate">{chat.chat_name || "Untitled Chat"}</td>
//                     <td className="w-[20%]">
//                       <div className="flex items-center gap-1 uppercase text-base cursor-pointer">
//                         <span className="bg-[#4a4cf180] flex items-center gap-1 px-3 py-1 rounded-full text-white truncate">
//                           <FileText size={18} /> PDF
//                         </span>
//                       </div>
//                     </td>
//                     <td className="w-[15%]">
//                       <div className="dropdown dropdown-end">
//                         <div tabIndex={0} role="button" className="m-1">
//                           <BiDotsHorizontalRounded className="text-2xl" />
//                         </div>
//                         <ul className="dropdown-content menu bg-white border z-[50] w-36 shadow">
//                           <li className="hover:bg-gray-300 text-black font-medium">
//                             <button onClick={() => handleDelete(chat._id)} className="flex items-center space-x-2 px-2 py-1">
//                               <FaTrashAlt className="text-base text-red-500" />
//                               <span>Delete</span>
//                             </button>
//                           </li>
//                           <li className="hover:bg-gray-300 text-black font-medium">
//                             <button onClick={() => handleDownloadPDF(chat)} className="flex items-center space-x-2 px-2 py-1">
//                               <LuDownload className="text-base text-green-500" />
//                               <span>Download</span>
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr><td colSpan="4" className="text-center">No chat history available.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditUser;


import { ArrowLeft, UsersRound, FileText } from "lucide-react";
import React, { useState, useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { useParams, useNavigate, Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  useDeleteSingleUserDocumentMutation,
  useGetSingleUserQuery,
} from "../redux/features/baseApi/baseApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetSingleUserQuery(id);
  const [deleteSingleUserDocument] = useDeleteSingleUserDocumentMutation();
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    if (data?.chatHistory) {
      setChatList(data.chatHistory);
    }
  }, [data]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "No date available";
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleDelete = async (chatId) => {
    try {
      await deleteSingleUserDocument(chatId).unwrap();
      setChatList((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
      refetch();
      toast.success("Chat deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Failed to delete chat.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDownloadPDF = (chat) => {
    if (!chat?.chat_contents || chat.chat_contents.length === 0) {
      alert("No chat data available to download.");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text("Chat Conversation", 105, 15, { align: "center" });

    let y = 30;
    const pageHeight = doc.internal.pageSize.height;

    chat.chat_contents.forEach((msg) => {
      const isUser = msg.sent_by === "User";
      const xPosition = isUser ? 110 : 15;
      const bubbleWidth = 80;
      const wrappedText = doc.splitTextToSize(msg.text_content, bubbleWidth - 10);
      const textHeight = wrappedText.length * 5;
      const bubbleHeight = textHeight + 10;

      if (y + bubbleHeight + 15 > pageHeight) {
        doc.addPage();
        y = 30;
      }

      if (isUser) {
        doc.setFillColor(0, 122, 255);
        doc.setTextColor(255, 255, 255);
      } else {
        doc.setFillColor(200, 200, 200);
        doc.setTextColor(0, 0, 0);
      }

      doc.roundedRect(xPosition, y, bubbleWidth, bubbleHeight, 5, 5, "F");
      doc.text(wrappedText, xPosition + 5, y + 7);
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(new Date(msg.timestamp).toLocaleString(), xPosition, y - 3);
      y += bubbleHeight + 15;
    });

    doc.save(`chat_${chat._id}.pdf`);
  };

  const user = data?.user;

  return (
    <div className="min-h-screen px-10 py-16">
      <ToastContainer />
      <div className="mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        </div>

        <div className="p-6 bg-white text-black">
          {isLoading ? (
            <p className="text-gray-500">Loading user details...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load user data.</p>
          ) : (
            <div className="flex items-center justify-between border rounded-md py-5 px-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center font-bold text-3xl">
                  <UsersRound size={32} />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold">Name: {user?.name || "N/A"}</h2>
                  <p className="text-xl font-bold">Email: {user?.email || "N/A"}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 h-screen overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-lg">
                <th className="text-start w-[15%]">Date</th>
                <th className="text-start w-[40%]">File Title</th>
                <th className="text-start w-[20%]">File Type</th>
                <th className="text-start w-[15%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {chatList.length > 0 ? (
                chatList.map((chat, index) => (
                  <tr key={index} className="hover border-b">
                    <td className="py-2 text-base w-[15%] whitespace-nowrap">
                      {formatDate(chat?.chat_contents?.at(-1)?.timestamp)}
                    </td>
                    <td className="text-base w-[40%] truncate">{chat.chat_name || "Untitled Chat"}</td>
                    <td className="w-[20%]">
                      <div className="flex items-center gap-1 uppercase text-base cursor-pointer">
                        <span className="bg-[#4a4cf180] flex items-center gap-1 px-3 py-1 rounded-full text-white truncate">
                          <FileText size={18} /> PDF
                        </span>
                      </div>
                    </td>
                    <td className="w-[15%]">
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="m-1">
                          <BiDotsHorizontalRounded className="text-2xl" />
                        </div>
                        <ul className="dropdown-content menu bg-white border z-[50] w-36 shadow">
                          <li className="hover:bg-gray-300 text-black font-medium">
                            <button onClick={() => handleDelete(chat._id)} className="flex items-center space-x-2 px-2 py-1">
                              <FaTrashAlt className="text-base text-red-500" />
                              <span>Delete</span>
                            </button>
                          </li>
                          <li className="hover:bg-gray-300 text-black font-medium">
                            <button onClick={() => handleDownloadPDF(chat)} className="flex items-center space-x-2 px-2 py-1">
                              <LuDownload className="text-base text-green-500" />
                              <span>Download</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center">No chat history available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditUser;