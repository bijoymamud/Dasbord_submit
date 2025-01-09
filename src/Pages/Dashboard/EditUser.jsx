import { ArrowLeft, Ellipsis, FileText, MoreVertical, UsersRound } from "lucide-react";
import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  console.log(id)

  const location = useLocation();
  const user = location.state?.user;
  console.log(user)


  const data = [
    { date: "1/8/2025", fileTitle: "AbbcdAbcde...", fileType: "pdf" },
    { date: "12/7/2025", fileTitle: "AbbcdAbcde...", fileType: "pdf" },
    { date: "10/5/2025", fileTitle: "AbbcdAbcde...", fileType: "pdf" },
    { date: "9/19/2025", fileTitle: "AbbcdAbcde...", fileType: "pdf" },
  ];

  return (
    <div className="min-h-screen px-10 p-6 py-16">
      <div className="  mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="p-6 flex items-center justify-between">
        <ArrowLeft
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      />       <div className="bg-[#1660B9] w-[120px] text-center py-2 rounded-full text-white font-bold tracking-wider cursor-pointer">
          Edit
       </div>
        </div>
        <div className="p-6 bg-white text-black">
            
           

          <div className="flex items-center justify-between border rounded-md py-5">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center font-bold text-3xl">
              <UsersRound size={32} />
              </div>
              <div className="flex items-center gap-20">
                <h2 className="text-xl font-bold">Name: { user.name}</h2>
                <p className="text-xl font-bold">Email: { user.email}</p>
                <p className="text-xl font-bold">Phone: 018*******</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-lg">
                  <th className="text-start">Date</th>
                  <th className="text-start">File Title</th>
                  <th className="text-start">File Type</th>
                  <th className="text-start">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="hover">
                    <td className="py-2 text-base">{item.date}</td>
                    <td className="text-base">{item.fileTitle}</td>
                    <td>
                      <div className="flex items-center gap-1 uppercase py-2 text-base cursor-pointer">
                      <span className="bg-[#4a4cf180] flex items-center gap-1  p-1 px-3 rounded-full text-white"><FileText size={18}/> {item.fileType}</span>
                      </div>
                    </td>
                    <td>
                      
                        <Ellipsis className="font-normal cursor-pointer text-base"/>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
