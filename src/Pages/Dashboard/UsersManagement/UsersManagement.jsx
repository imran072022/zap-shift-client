import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import toast from "react-hot-toast";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      console.log(res.data);
      return res.data;
    },
  });

  const tableHeaders = ["Name", "Email", "Role", "Account created", "Actions"];

  const handleMakeAdmin = (user) => {
    const role = { role: "Admin" };
    axiosSecure.patch(`/users/${user._id}`, role).then((res) => {
      if (res.data.modifiedCount === 1) {
        console.log(res.data);
        refetch();
        toast.success(`${user.displayName} has been promoted to Admin`);
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const role = { role: "User" };
    axiosSecure.patch(`/users/${user._id}`, role).then((res) => {
      if (res.data.modifiedCount === 1) {
        console.log(res.data);
        refetch();
        toast.success(`${user.displayName} removed from Admin`);
      }
    });
  };
  return (
    <div>
      <h2 className="font-extrabold text-[#03373D] text-5xl mb-10">
        Users Management
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 text-sm">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {tableHeaders.map((th, i) => (
                <th
                  key={i}
                  className="py-3.5 px-6 text-left font-medium text-[#282828]"
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}
              >
                <td className="py-3.5 px-6 text-[#4D4D4D]">
                  <div className="flex gap-1.5 items-center">
                    <div>
                      <img
                        src={user.photoURL}
                        className="w-9 h-9 rounded-full"
                        alt={user.displayName}
                      />
                    </div>
                    <div>
                      <p>{user.displayName}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-6 text-[#4D4D4D]">{user.email}</td>

                <td className="py-3.5 px-6 text-[#4D4D4D]">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {user.role}
                  </span>
                </td>

                <td className="py-3.5 px-6 text-[#4D4D4D]">{user.createdAt}</td>
                <td className="py-3.5 px-6 ">
                  {user.role === "Admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      title="Remove from admin"
                      className="p-2 rounded-md hover:bg-red-50  text-red-600 cursor-pointer"
                    >
                      {}
                      <FiShieldOff size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      title="Make Admin"
                      className="p-2 rounded-md  hover:bg-green-50 text-green-600 cursor-pointer"
                    >
                      <FaUserShield size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
