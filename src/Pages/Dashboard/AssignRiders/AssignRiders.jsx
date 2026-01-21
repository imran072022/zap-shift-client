import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  MdClose,
  MdCheckCircle,
  MdDirectionsBike,
  MdLocationOn,
  MdPhone,
  MdEmail,
} from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa6";
import toast from "react-hot-toast";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);
  /* Fetching unassigned paid parcels data for the page */
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", "Pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=Pending-pickup",
      );
      return res.data;
    },
  });
  /*Fetching riders data for the modal */
  const { data: riders = [], isLoading: ridersLoading } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict],
    enabled: isModalOpen && !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?approvalStatus=Approved&district=${selectedParcel.senderDistrict}&workingStatus=Available`,
      );
      return res.data;
    },
  });

  const handleOpenModal = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
    setSelectedRider(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
    setSelectedRider(null);
  };

  const handleAssignRider = () => {
    console.log("rider selected: ", selectedRider);
    console.log("for parcel: ", selectedParcel);

    const assignedRiderInfo = {
      riderId: selectedRider._id,
      riderName: selectedRider.name,
      riderPhone: selectedRider.phoneNo,
      riderEmail: selectedRider.email,
      trackingId: selectedParcel.trackingId,
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, assignedRiderInfo)
      .then((res) => {
        if (
          res.data.updatedParcel.modifiedCount === 1 &&
          res.data.updatedRider.modifiedCount === 1
        ) {
          refetch();
          toast.success("Rider assigned successfully!");
          console.log(res.data);
        }
      });
    handleCloseModal();
  };

  return (
    <div>
      <h2 className="font-extrabold text-[#03373D] text-5xl">
        Rider Assignment
      </h2>
      <p className="text-gray-700 mt-2 mb-10">Parcels to be assigned</p>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 text-sm">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {[
                "Parcel",
                "Amount",
                "Pickup",
                "Destination",
                "Assign a Rider",
              ].map((h) => (
                <th key={h} className="py-3.5 px-6 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, idx) => (
              <tr
                key={parcel._id}
                className={idx % 2 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3.5 px-6 text-[#4D4D4D]">
                  {parcel.parcelName}
                </td>
                <td className="py-3.5 px-6 text-[#4D4D4D]">${parcel.cost}</td>
                <td className="py-3.5 px-6 text-[#4D4D4D]">
                  {parcel.senderDistrict}
                </td>
                <td className="py-3.5 px-6 text-[#4D4D4D]">
                  {parcel.receiverDistrict}
                </td>
                <td className="py-3.5 px-6 text-[#4D4D4D]">
                  <button
                    onClick={() => handleOpenModal(parcel)}
                    className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center cursor-pointer"
                    title="Assign Rider"
                  >
                    <MdDirectionsBike size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-4xl rounded-2xl shadow-xl flex flex-col max-h-[80vh]">
            {/* Header */}
            <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-gray-500">
              <div>
                <h3 className="text-2xl font-bold">Assign Rider to Parcel</h3>
                <p className="text-gray-700 ">
                  {selectedParcel?.senderDistrict} →{" "}
                  {selectedParcel?.receiverDistrict}
                </p>
                <p className="text-gray-700">
                  Parcel: {selectedParcel.parcelName}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="cursor-pointer bg-red-400 hover:bg-red-500 transition-colors duration-300 ease-in-out rounded-full text-white"
              >
                <MdClose size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {ridersLoading ? (
                <p className="text-center text-gray-600">Loading riders...</p>
              ) : riders.length === 0 ? (
                <div className="text-center py-12">
                  <FaMotorcycle className="mx-auto text-4xl text-gray-300 mb-4" />
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">
                    No Riders Available
                  </h4>
                  <p className="text-gray-600">
                    No riders are currently available in{" "}
                    {selectedParcel.senderDistrict}.
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Try expanding your search to nearby districts.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {riders.map((rider) => (
                    <div
                      key={rider._id}
                      onClick={() => setSelectedRider(rider)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition ${
                        selectedRider?._id === rider._id /*Compare IDs */
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex items-center gap-3">
                          {/* Profile Image */}
                          <img
                            src={rider.photoURL || "/avatar-placeholder.png"}
                            alt={rider.name}
                            className="w-12 h-12 rounded-full object-cover border"
                          />

                          <div>
                            <h5 className="font-bold">{rider.name}</h5>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <MdLocationOn /> {rider.district}
                            </p>
                          </div>
                        </div>

                        {selectedRider?._id === rider._id && (
                          <MdCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                        )}
                      </div>

                      <div className="mt-4 text-sm space-y-1">
                        <p className="flex items-center gap-2">
                          <MdPhone /> {rider.phoneNo}
                        </p>
                        <p className="flex items-center gap-2">
                          <MdEmail /> {rider.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <MdDirectionsBike />
                          {rider.bikeRegisterNo}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 border border-gray-500 rounded-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                disabled={!selectedRider}
                onClick={handleAssignRider}
                className={`px-6 py-2 rounded-lg cursor-pointer transition-colors duration-300 ease-in-out ${
                  selectedRider
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRiders;
