import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const tableHeaders = [
    "Parcel Name",
    "Tracking ID",
    "Amount",
    "Transaction ID",
    "Action",
  ];
  return (
    <div>
      <h2 className="font-extrabold text-[#03373D] text-5xl mb-10">
        Payment History
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
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className={index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}
              >
                <td className="py-3.5 px-6 text-[#4D4D4D]">
                  {payment.parcelName}
                </td>
                <td className="py-3.5 px-6 text-[#4D4D4D]">
                  {payment.trackingId}
                </td>
                <td className="py-3.5 px-6 text-[#4D4D4D]">
                  ${payment.amount} ({payment.paymentStatus})
                </td>
                <td className="py-3.5 px-6 text-[#4D4D4D]">
                  {payment.transactionId}
                </td>
                <td className="py-3.5 px-6 ">
                  <button className="text-sm bg-[rgba(148,198,203,0.22)] font-medium px-4 py-2 rounded-md cursor-pointer ">
                    View
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

export default PaymentHistory;
