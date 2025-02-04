import { Ellipsis, User } from "lucide-react";
import React, { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useGetAllUsersQuery } from "../redux/features/baseApi/baseApi";
import { Link } from "react-router-dom";
import UserIcons from "../../assets/userIcons.png";

const monthNames = {
  1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
  7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec",
};

const DashboardHome = () => {
  // Fetch Users from API
  const { data } = useGetAllUsersQuery();
  console.log(data?.growth);

  const users = data?.users || [];

  // Transform API growth data into recharts format
  const Graphdata = useMemo(() => {
    if (!data?.growth) return [];
    return data.growth.map((item) => ({
      name: monthNames[item._id] || `Month ${item._id}`, // Convert month ID to name
      users: item.count, // Set user count
    }));
  }, [data?.growth]);

  // Pagination State
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Slice users for the current page
  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-10 bg-gray-100">
      {/* Total Free User Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white shadow rounded-lg p-10 w-2/6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-black">Total Free User</h4>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <User size={40} />
          </div>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-black">Total User Growth</h3>
          {/* <select className="select select-bordered select-sm">
            <option>This Year</option>
            <option>Last Year</option>
          </select> */}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={Graphdata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* User List Section with Daisy UI Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-black">User List</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-200 text-black text-base">
                <th className="w-16">Img</th>
                <th className="w-48 text-left">Name</th>
                <th className="w-40 text-left">Subscription</th>
                <th className="w-64 text-left">Email</th>
                <th className="w-20 text-center">Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src={UserIcons} alt={`${user.name} avatar`} />
                        </div>
                      </div>
                    </td>
                    <td className="truncate">{user.name}</td>
                    <td>{user.subscription || "N/A"}</td>
                    <td className="truncate">{user.email}</td>
                    <td className="text-center">
                      <Link to={`/editUser/${user._id}`} state={{ user }} className="btn btn-ghost btn-sm">
                        <Ellipsis />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-600 py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Right-Aligned Pagination */}
        <div className="flex justify-end mt-6">
          <div className="join">
            <button
              className={`join-item btn btn-sm ${currentPage === 1 ? "btn-disabled" : ""}`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <button className={`join-item btn btn-sm ${currentPage === 1 ? "btn-active" : ""}`} onClick={() => setCurrentPage(1)}>
              1
            </button>

            {totalPages > 3 && currentPage > 2 && <button className="join-item btn btn-disabled btn-sm">...</button>}

            {currentPage > 1 && currentPage < totalPages && (
              <button className="join-item btn btn-sm btn-active">{currentPage}</button>
            )}

            {totalPages > 3 && currentPage < totalPages - 1 && <button className="join-item btn btn-disabled btn-sm">...</button>}

            <button className={`join-item btn btn-sm ${currentPage === totalPages ? "btn-active" : ""}`} onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </button>

            <button
              className={`join-item btn btn-sm ${currentPage === totalPages ? "btn-disabled" : ""}`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
