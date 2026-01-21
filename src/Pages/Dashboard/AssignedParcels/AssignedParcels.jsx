import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";

const AssignedParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch parcels with all relevant statuses
  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["AssignedParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&status=Rider-assigned,Out-for-delivery,Picked-up`,
      );
      return res.data;
    },
  });

  // Group parcels by status
  const assignedParcels = parcels.filter(
    (parcel) => parcel.deliveryStatus === "Rider-assigned",
  );

  const outForDeliveryParcels = parcels.filter(
    (parcel) => parcel.deliveryStatus === "Out-for-delivery",
  );

  const pickedUpParcels = parcels.filter(
    (parcel) => parcel.deliveryStatus === "Picked-up",
  );

  const handleAccept = (parcel) => {
    const updateDeliveryStatus = {
      deliveryStatus: "Out-for-delivery",
      trackingId: parcel.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${parcel._id}/delivery-status`, updateDeliveryStatus)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          refetch();
          toast.success("Parcel accepted successfully");
        }
      });
  };

  const handleReject = (parcel) => {
    axiosSecure.patch(`/parcels/${parcel._id}/reject`).then((res) => {
      if (res.data.modifiedCount === 1) {
        refetch();
        toast.success("Parcel rejected successfully");
      }
    });
  };

  const handlePickedUp = (parcel) => {
    const updateDeliveryStatus = {
      deliveryStatus: "Picked-up",
      trackingId: parcel.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${parcel._id}/delivery-status`, updateDeliveryStatus)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          refetch();
          toast.success("Parcel Picked up");
        }
      });
  };

  const handleDelivered = (parcel) => {
    const updateDeliveryStatus = {
      deliveryStatus: "Delivered",
      trackingId: parcel.trackingId,
    };

    axiosSecure
      .patch(`/parcels/${parcel._id}/delivery-status`, updateDeliveryStatus)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          refetch();
          toast.success("Parcel delivered successfully");
        }
      });
  };

  if (isLoading) return <Loading></Loading>;

  const hasNoParcels = parcels.length <= 0;

  return (
    <div>
      <h2 className="font-extrabold text-[#03373D] text-5xl mb-10">
        My Parcels
      </h2>

      {hasNoParcels ? (
        <div className="my-28 text-center ">
          <p className="text-gray-500 text-xl">
            No assigned parcels available...
          </p>
        </div>
      ) : (
        <>
          {/* Assigned Parcels Section */}
          {assignedParcels.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#03373D] mb-6">
                New Assigned Parcels
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 text-sm">
                <table className="min-w-full ">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {["Parcel", "Actions"].map((th, i) => (
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
                    {assignedParcels.map((parcel, index) => (
                      <tr
                        key={parcel._id}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
                        }
                      >
                        <td className="py-3.5 px-6 text-[#4D4D4D]">
                          {parcel.parcelName}
                        </td>
                        <td className="py-3.5 px-6 flex gap-4 ">
                          <button
                            onClick={() => handleAccept(parcel)}
                            className="p-2 rounded-md bg-green-50 text-green-600 cursor-pointer hover:bg-green-100 hover:text-green-700 "
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(parcel)}
                            className="p-2 rounded-md bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Out for Delivery Parcels Section */}
          {(outForDeliveryParcels.length > 0 || pickedUpParcels.length > 0) && (
            <div>
              <h3 className="text-2xl font-bold text-[#03373D] mb-6">
                Parcels in Transit
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 text-sm">
                <table className="min-w-full ">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {["Parcel", "Sender", "Status", "Notify Admin"].map(
                        (th, i) => (
                          <th
                            key={i}
                            className="py-3.5 px-6 text-left font-medium text-[#282828]"
                          >
                            {th}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Out for Delivery parcels - Show both buttons, Deliver disabled */}
                    {outForDeliveryParcels.map((parcel, index) => (
                      <tr
                        key={parcel._id}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
                        }
                      >
                        <td className="py-3.5 px-6 text-[#4D4D4D]">
                          {parcel.parcelName}
                        </td>
                        <td className="py-3.5 px-6">{parcel.senderName}</td>
                        <td className="py-3.5 px-6">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Out for Delivery
                          </span>
                        </td>
                        <td className="py-3.5 px-6 flex gap-4 ">
                          <button
                            onClick={() => handlePickedUp(parcel)}
                            className="p-2 rounded-md bg-blue-50 text-blue-600 cursor-pointer hover:bg-blue-100 hover:text-blue-700 "
                          >
                            Picked Up
                          </button>
                          <button
                            disabled
                            className="p-2 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
                          >
                            Delivered
                          </button>
                        </td>
                      </tr>
                    ))}

                    {/* Picked Up parcels - Pick Up disabled, Deliver enabled */}
                    {pickedUpParcels.map((parcel, index) => (
                      <tr
                        key={parcel._id}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
                        }
                      >
                        <td className="py-3.5 px-6 text-[#4D4D4D]">
                          {parcel.parcelName}
                        </td>
                        <td className="py-3.5 px-6">{parcel.senderName}</td>
                        <td className="py-3.5 px-6">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            Picked Up
                          </span>
                        </td>
                        <td className="py-3.5 px-6 flex gap-4 ">
                          <button
                            disabled
                            className="p-2 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
                          >
                            Picked Up
                          </button>
                          <button
                            onClick={() => handleDelivered(parcel)}
                            className="p-2 rounded-md bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 cursor-pointer"
                          >
                            Delivered
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AssignedParcels;
