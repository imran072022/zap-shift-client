import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  /*Delete Parcel */
  const handleParcelDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          refetch();
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel order has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  /*Payment */
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelName: parcel.parcelName,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      trackingId: parcel.trackingId,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data.url);
    window.location.assign(res.data.url);
  };
  return (
    <div>
      My Parcels {parcels.length}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Ordered at</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Tracking ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.createdAt}</td>
                <td
                  className={`font-medium text-sm ${
                    parcel?.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-amber-600"
                  }`}
                >
                  {parcel?.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                </td>
                <td>{parcel?.deliveryStatus}</td>
                <td>
                  <Link to={`/tracking-parcel/${parcel?.trackingId}`}>
                    {parcel?.trackingId}
                  </Link>
                </td>
                <td className="flex gap-2.5 ">
                  <button
                    onClick={() => handlePayment(parcel)}
                    className={`text-sm bg-[#CAEB66] font-medium px-4 py-2 rounded-md  ${
                      parcel?.paymentStatus === "paid"
                        ? " cursor-not-allowed opacity-10"
                        : ""
                    }`}
                  >
                    Pay
                  </button>
                  <button className="text-sm bg-[rgba(148,198,203,0.22)] font-medium px-4 py-2 rounded-md cursor-pointer">
                    View
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="text-sm bg-[#E833301A] text-[#E83330] hover:bg-[#e8333036] font-medium px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 linear"
                  >
                    Delete
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

export default MyParcels;
