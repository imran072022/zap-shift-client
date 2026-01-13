import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdOutlineCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { PiTrashLight } from "react-icons/pi";
import { RiListView } from "react-icons/ri";
import toast from "react-hot-toast";
const RiderApplications = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      console.log(res.data);
      return res.data;
    },
  });

  const tableHeaders = [
    "Name",
    "Approval Status",
    "Applied at",
    "Email",
    "Actions",
  ];

  const handleUpdateStatus = (rider, status) => {
    const updateInfo = { approvalStatus: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast.success(`Rider has been ${status.toLowerCase()}`);
      }
    });
  };

  const handleApprove = (rider) => {
    handleUpdateStatus(rider, "Approved");
  };
  const handleReject = (rider) => {
    handleUpdateStatus(rider, "Rejected");
  };
  const handleDelete = (id) => {
    axiosSecure.delete(`/riders/${id}`).then((res) => {
      if (res.data.deletedCount === 1) {
        refetch();
        toast.success("Application deleted successfully");
      }
    });
  };
  return (
    <div>
      <h2 className="font-extrabold text-[#03373D] text-5xl mb-10">
        Riders' Applications
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 text-sm">
        <table className="min-w-full ">
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
            {riders.map((rider, index) => (
              <tr
                key={rider._id}
                className={index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}
              >
                <td className="py-3.5 px-6 text-[#4D4D4D]">{rider.name}</td>
                <td
                  className={`py-3.5 px-6 ${
                    rider.approvalStatus === "Pending"
                      ? "text-amber-600"
                      : rider.approvalStatus === "Approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {rider.approvalStatus}
                </td>
                <td className="py-3.5 px-6 text-[#4D4D4D]">
                  {rider.appliedAt}
                </td>
                <td className="py-3.5 px-6 text-[#4D4D4D]">{rider.email}</td>
                <td className="py-3.5 px-6 ">
                  <button
                    onClick={() => handleApprove(rider)}
                    title="Approve"
                    className="p-2 rounded-md hover:bg-green-50 text-gray-600 hover:text-green-600 cursor-pointer"
                  >
                    <MdOutlineCheck size={18} />
                  </button>

                  <button
                    onClick={() => handleReject(rider)}
                    title="Reject"
                    className="p-2 rounded-md hover:bg-red-50 text-gray-600 hover:text-red-600 cursor-pointer"
                  >
                    <RxCross2 size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(rider._id)}
                    title="Delete"
                    className=" p-2 rounded-md hover:bg-gray-200 text-gray-600 hover:text-red-600 cursor-pointer"
                  >
                    <PiTrashLight size={18} />
                  </button>
                  <button
                    className="p-2 rounded-md hover:bg-blue-50 text-gray-600 hover:text-blue-600 cursor-pointer"
                    title="View details"
                  >
                    <RiListView size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderApplications;
