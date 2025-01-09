import { Ellipsis, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const DashboardHome = () => {
  const data = [
    { name: "Jan", users: 20000 },
    { name: "Feb", users: 40000 },
    { name: "Mar", users: 30000 },
    { name: "Apr", users: 50000 },
    { name: "May", users: 60000 },
    { name: "Jun", users: 80000 },
    { name: "Jul", users: 70000 },
    { name: "Aug", users: 90000 },
    { name: "Sep", users: 85000 },
    { name: "Oct", users: 95000 },
    { name: "Nov", users: 100000 },
    { name: "Dec", users: 120000 },
  ];

  const users = [
    {
      id: 1,
      img: "https://via.placeholder.com/40",
      name: "John Doe",
      subscription: "Premium",
      email: "john.doe@gmail.com",
    },
    {
      id: 2,
      img: "https://via.placeholder.com/40",
      name: "Jane Smith",
      subscription: "Free",
      email: "jane.smith@gmail.com",
    },
    {
      id: 3,
      img: "https://via.placeholder.com/40",
      name: "Michael Brown",
      subscription: "Premium",
      email: "michael.brown@gmail.com",
    },
    {
      id: 4,
      img: "https://via.placeholder.com/40",
      name: "Emily Davis",
      subscription: "Free",
      email: "emily.davis@gmail.com",
    },
  ];

  return (
    <div className="p-10 bg-gray-100 ">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white shadow rounded-lg p-10 w-2/6">
          <div className="flex items-center justify-between">
          
            <div>
              <h4 className="text-lg font-semibold">Total Free User</h4>
              <p className="text-2xl font-bold">500</p>
            </div>
            <User size={40}/>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Total User</h3>
          <select className="select select-bordered select-sm">
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">User</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-base text-black">
                <th>Img</th>
                <th>Name</th>
                <th>Subscription</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={user.img} alt={`${user.name} avatar`} />
                      </div>
                    </div>
                  </td>
                  <td className="text-base text-gray-600">{user.name}</td>
                  <td className="text-base text-gray-600">{user.subscription}</td>
                  <td className="text-base text-gray-600">{user.email}</td>
                  <td>
                    <Link
                      to={`/dashboard/editUser/${user.id}`}
                      state={{ user }}
                      className="btn-ghost">
                      <Ellipsis />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
