import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa6";
import { FiSearch, FiShieldOff, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const UsersManagement = () => {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      console.log(res.data);
      return res.data;
    },
  });

  const tableHeaders = ["Name", "Email", "Role", "Account created", "Actions"];

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Make <b>${user.displayName}</b> an admin?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const role = { role: "Admin" };
        axiosSecure.patch(`/users/${user._id}/role`, role).then((res) => {
          if (res.data.modifiedCount === 1) {
            refetch();
            console.log(res.data);
            Swal.fire({
              title: `${user.displayName} is now an admin.`,
              text: "",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: `Remove <b>${user.displayName}</b> from admins?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const role = { role: "User" };
        axiosSecure
          .patch(`/users/${user._id}/role-update`, role)
          .then((res) => {
            if (res.data.modifiedCount === 1) {
              refetch();
              console.log(res.data);
              Swal.fire({
                title: `${user.displayName} is no longer an admin.`,
                text: "",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
  };

  const handleClearSearch = () => {
    setSearch("");
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-16">
        <h2 className="font-extrabold text-[#03373D] text-5xl">
          Users Management
        </h2>

        <div className="w-[300px]">
          {/* Reduced width */}
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              value={search}
              onChange={handleSearch}
              className="w-full h-10 pl-10 pr-9 rounded-full
                border border-gray-300 bg-white
                focus:border-[#CAEB66] focus:ring-2 focus:ring-[#CAEB66]/30
                outline-none transition-all text-sm hide-search-clear"
              type="search"
              placeholder="Search by name or email"
            />

            {/* Custom clear button */}
            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2
                  p-1 text-gray-400 hover:text-gray-600 
                  rounded-full hover:bg-gray-100
                  transition-all duration-200"
                title="Clear search"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

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
                        alt=""
                      />
                    </div>
                    <div>
                      <p>{user.displayName}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-6 text-[#4D4D4D]">{user.email}</td>

                <td className="py-3.5 px-6">
                  {user.role === "Admin" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-300 shadow-sm">
                      👑 {user.role}
                    </span>
                  )}
                  {user.role === "Rider" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-300">
                      🚴 {user.role}
                    </span>
                  )}
                  {user.role === "User" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-300">
                      👤 {user.role}
                    </span>
                  )}
                </td>

                <td className="py-3.5 px-6 text-[#4D4D4D]">{user.createdAt}</td>
                <td className="py-3.5 px-6">
                  {user.role === "Admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      title="Remove from admin"
                      className="p-2 rounded-md hover:bg-red-50 text-red-600 cursor-pointer"
                    >
                      <FiShieldOff size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      title="Make Admin"
                      className="p-2 rounded-md hover:bg-green-50 text-green-600 cursor-pointer"
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
