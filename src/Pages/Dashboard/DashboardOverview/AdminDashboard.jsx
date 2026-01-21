import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaCreditCard,
  FaBoxOpen,
  FaTruck,
  FaShippingFast,
  FaCheckCircle,
} from "react-icons/fa";
import Loading from "../../Loading/Loading";

// 1️⃣ Hardcoded delivery statuses (UI source of truth)
const deliveryStatuses = [
  {
    label: "To Pay",
    icon: <FaCreditCard size={18} />,
  },
  {
    label: "Ready to Pick",
    icon: <FaBoxOpen size={18} />,
  },
  {
    label: "Picked Up",
    icon: <FaTruck size={18} />,
  },
  {
    label: "In Transit",
    icon: <FaShippingFast size={18} />,
  },
  {
    label: "Delivered",
    icon: <FaCheckCircle size={18} />,
  },
];

// 2️⃣ Backend → UI status mapping (NORMALIZATION LAYER)
const statusKeyMap = {
  "To-pay": "To Pay",
  "Pending-pickup": "Ready to Pick",
  "Picked-up": "Picked Up",
  "Out-for-delivery": "In Transit",
  Delivered: "Delivered",
};

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // 3️⃣ Fetch stats from backend
  const { data: statistics = [], isLoading } = useQuery({
    queryKey: ["statsOfDeliveryStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  // 4️⃣ Convert backend array → UI lookup object
  const statsMap = statistics.reduce((acc, item) => {
    const uiLabel = statusKeyMap[item._id];
    if (uiLabel) {
      acc[uiLabel] = item.count;
    }
    return acc;
  }, {});

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {deliveryStatuses.map(({ label, icon }) => (
          <div key={label} className="flex gap-4 bg-white p-6 rounded-2xl">
            <div className="bg-[#F5F5F5] p-2.5 border border-[#DADADA] rounded-full self-start text-[#606060]">
              {icon}
            </div>

            <div>
              <p className="text-sm text-gray-700 font-medium mb-1">{label}</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {statsMap[label] ?? 0}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
