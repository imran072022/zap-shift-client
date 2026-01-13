import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    data: parcel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const data = await axiosSecure.get(`/parcels/${parcelId}`);
      return data.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelName: parcel.parcelName,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) return <Loading></Loading>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <p className="font-semibold">
        Please pay ${parcel.cost} for your <span>{parcel.parcelName}</span>
      </p>
      <br />
      <button
        onClick={handlePayment}
        className="text-sm bg-[#CAEB66] font-medium px-4 py-2 rounded-md cursor-pointer"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
