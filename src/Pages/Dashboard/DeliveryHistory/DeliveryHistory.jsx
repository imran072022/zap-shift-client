// DeliveryHistory.jsx
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import { FaMoneyBillWave } from "react-icons/fa6";

const DeliveryHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["deliveryHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=Delivered`,
      );
      return res.data;
    },
  });
  /*Calculate rider's profit */
  const calculateProfit = (parcel) => {
    const { senderDistrict, receiverDistrict, parcelWeight, cost } = parcel;

    const sameDistrict = senderDistrict === receiverDistrict;
    const isLightWeight = parcelWeight > 0 && parcelWeight < 5;

    if (sameDistrict) {
      return cost * (isLightWeight ? 0.5 : 0.6);
    } else {
      return cost * (isLightWeight ? 0.7 : 0.8);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="font-extrabold text-[#03373D] text-5xl mb-10">
        Delivery History
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="min-w-full text-center">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 ">
              <th className="py-3 px-6  ">Parcel Name</th>
              <th className="py-3 px-6 ">Status</th>
              <th className="py-3 px-6 ">Parcel Cost</th>
              <th className="py-3 px-6 ">Your Profit</th>
              <th className="py-3 px-6 ">Cash Out</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="border-b border-gray-100">
                <td className="py-3 px-6">{parcel.parcelName}</td>

                <td className="py-3 px-6">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      parcel.deliveryStatus === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {parcel.deliveryStatus}
                  </span>
                </td>
                <td className="py-3 px-6">{parcel.cost}</td>
                <td className="py-3 px-6">{calculateProfit(parcel)}</td>
                <td className="py-3 px-6">
                  <div className="inline-block items-center justify-center text-green-700 bg-green-50 rounded-lg py-2 px-6 hover:bg-green-100 transition-colors duration-200 cursor-pointer">
                    <FaMoneyBillWave size={18} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryHistory;
