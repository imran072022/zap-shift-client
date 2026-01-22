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
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
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
      console.log(res.data);
      return res.data;
    },
  });

  // 4️⃣ Convert backend array → UI lookup object (statsMap returns an object)
  const statsMap = statistics.reduce((acc, item) => {
    const uiLabel = statusKeyMap[item.deliveryStatus];
    if (uiLabel) {
      acc[uiLabel] = item.count;
    }
    return acc;
  }, {});
  console.log("statsMap: ", statsMap);

  const chartData = deliveryStatuses.map(({ label }) => {
    // Ensure we have a count for each status, default to 0
    const count = statsMap[label] || 0;
    // For the chart, we want to show the UI label but use the backend key for mapping if needed
    return {
      name: label,
      count: count,
      // Add a value key for the chart if you prefer
      value: count,
    };
  });
  console.log("chartdata: ", chartData);
  if (isLoading) return <Loading />;
  return (
    <div>
      {/*Parcel stats */}
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

      {/*Chart Section */}
      <div className="bg-white mt-6 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F] font-bold text-2xl">
            Shipment Statistics
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-300 rounded-full p-1">
              <button className="py-1.5 px-3.5 cursor-pointer">Income</button>{" "}
              <button className="py-1 px-3.5 rounded-full text-[#606060] font-medium bg-[#E8F6BD] border border-[#CAEB66] cursor-pointer ">
                Packages
              </button>
            </div>
            <fieldset className="relative flex items-center gap-2 border border-gray-300 rounded-full py-2.5 pl-[18px] pr-1.5 hover:border-gray-400 transition-colors">
              <SlCalender className="text-gray-600 shrink-0 " />

              <div className="relative flex-1 pr-1.5">
                <select className="appearance-none bg-transparent w-full outline-none cursor-pointer pr-[20px]  focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="today">Today</option>
                  <option value="thisWeek">This Week</option>
                  <option value="thisMonth">This Month</option>
                  <option value="lastQuarter">Last Quarter</option>
                  <option value="thisYear">This Year</option>
                </select>
                <IoIosArrowDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none w-5 h-5 text-slate-600" />
              </div>
            </fieldset>
            <div className="p-3 border border-gray-300 rounded-full text-[#606060] cursor-pointer">
              <BsThreeDotsVertical size={18} />
            </div>
          </div>
        </div>

        {/*Chart */}
        <div className="w-full min-h-[300px]  rounded-2xl ">
          <AreaChart
            style={{
              width: "100%",
              minHeight: "300px",
            }}
            className=" border border-gray-200 rounded-2xl"
            responsive
            margin={{ top: 28, bottom: 28, right: 30, left: 24 }}
            data={chartData}
          >
            <defs>
              {" "}
              {/*Gradient color */}
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CAEB66" stopOpacity={1} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.8} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="6 6"
              verticalStroke="#CAEB66"
              strokeWidth={0.5}
            />
            <XAxis
              dataKey="name"
              width={0}
              stroke="transparent"
              tick={{ fill: "#4D4D4D", fontSize: 12, fontWeight: "bold" }}
              interval={0} // Show all labels
              tickMargin={10} // Space between label and axis
            />
            <YAxis
              width={"auto"}
              stroke="transparent"
              tick={{ fill: "#4D4D4D" }}
              tickCount={6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              labelStyle={{
                color: "#374151",
                fontSize: "12px",
                fontWeight: "600",
                borderBottom: "1px solid #E5E7EB",
                paddingBottom: "4px",
              }}
              itemStyle={{
                color: "#4B5563",
                fontSize: "14px",
                padding: 0,
              }}
              cursor={{
                stroke: "#CAEB66",
                strokeDasharray: "4 4",
                strokeWidth: 2,
              }}
            />

            <Area
              type="linear"
              dataKey="count"
              stroke="#CAEB66"
              fill="url(#colorCount)"
              strokeWidth={2}
              activeDot={{
                r: 7, // Bigger radius on hover (default is 4)
                fill: "#CAEB66",
              }}
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
