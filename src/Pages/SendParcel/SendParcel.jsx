import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const { handleSubmit, register, control } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const regionsDuplicated = serviceCenters.map((c) => c.region);
  const uniqueRegions = [...new Set(regionsDuplicated)];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const districtsByRegion = (region) => {
    const regionWiseDistricts = serviceCenters.filter(
      (c) => c.region === region
    );
    const districts = regionWiseDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === document;
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraFee = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraFee;
      }
    }

    Swal.fire({
      title: "Are you sure about the cost?",
      text: `Your have to pay total ${cost} TK.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => console.log(res.data));
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your order has been placed!",
        //   icon: "success",
        // });
      }
    });
  };
  return (
    <div className="mt-12 bg-white rounded-3xl px-24 py-20">
      <h2 className="text-[#03373D] font-extrabold text-5xl mb-12">
        Send A Parcel
      </h2>
      <p className="font-extrabold text-2xl text-[#03373D]">
        Enter your parcel details
      </p>
      <hr className="border-b-[0.5] border-[#0000001f] my-7" />

      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/*Parcel Type  */}
        <div className="flex gap-12 mb-7">
          <label className="flex items-center font-semibold text-[#03373D] cursor-pointer">
            <input
              type="radio"
              value="document"
              {...register("parcelType")}
              className=" size-5 mr-2.5 cursor-pointer"
              defaultChecked
            />
            Document
          </label>
          <label className="flex items-center font-semibold text-[#03373D] cursor-pointer">
            <input
              type="radio"
              value="not-document"
              {...register("parcelType")}
              className=" size-5 mr-2.5 cursor-pointer"
            />
            Not-Document
          </label>
        </div>

        {/*Parcel Name + Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <fieldset>
            <div className="flex flex-col">
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Parcel Name
              </label>
              <input
                type="text"
                placeholder="Parcel Name"
                {...register("parcelName")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="flex flex-col">
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Parcel Weight (KG)
              </label>
              <input
                type="text"
                placeholder="Parcel Weight (KG)"
                {...register("parcelWeight")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              />
            </div>
          </fieldset>
        </div>
        <hr className="border-b-[0.5] border-[#0000001f] my-7" />
        {/*Sender and Receiver Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/*Sender Details */}
          <div>
            <h3 className="text-[#03373D] font-extrabold text-lg ">
              Sender Details
            </h3>
            <fieldset className="flex flex-col">
              {/*Sender Name */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Sender Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                defaultValue={user?.displayName}
                {...register("senderName")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              />
              {/*Sender Email */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Sender Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                defaultValue={user?.email}
                {...register("senderEmail")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              />
              {/*Sender Address */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Sender Address
              </label>
              <input
                type="text"
                placeholder="Your Address"
                {...register("senderAddress")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              />
              {/*Sender Phone No */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Sender Phone No
              </label>
              <input
                type="text"
                placeholder="Your Phone No"
                {...register("senderPhoneNo")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              />
              {/*Sender Region */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Your Region
              </label>
              <select
                {...register("senderRegion")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              >
                <option value="" disabled>
                  Select your Region
                </option>
                {uniqueRegions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {/*Sender District */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Your District
              </label>
              <select
                {...register("senderDistrict")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              >
                <option value="" disabled>
                  Select your District
                </option>
                {districtsByRegion(senderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              {/*Pickup Instruction */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Pickup Instruction
              </label>
              <textarea
                rows={4}
                placeholder="Pickup Instruction"
                {...register("pickupInfo")}
                className="resize-none border border-[#CBD5E1] rounded-lg px-3 py-2 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              ></textarea>
            </fieldset>
          </div>

          {/*Receiver Details */}
          <div>
            <h3 className="text-[#03373D] font-extrabold text-lg ">
              Receiver Details
            </h3>
            <fieldset className="flex flex-col">
              {/*Receiver Name */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Receiver Name
              </label>
              <input
                type="text"
                placeholder="Receiver Name"
                {...register("receiverName")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              />
              {/*Receiver Email */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Receiver Email
              </label>
              <input
                type="email"
                placeholder="Receiver Email"
                {...register("receiverEmail")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              />
              {/*Receiver Address */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Receiver Address
              </label>
              <input
                type="text"
                placeholder="Address"
                {...register("receiverAddress")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              />
              {/*Receiver Phone No */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Receiver Phone No
              </label>
              <input
                type="text"
                placeholder="Receiver Phone No"
                {...register("receiverPhoneNo")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              />
              {/*Receiver Region */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Receiver Region
              </label>
              <select
                {...register("receiverRegion")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              >
                <option value="" disabled>
                  Select Region
                </option>

                {uniqueRegions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {/*Receiver District */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Receiver District
              </label>
              <select
                {...register("receiverDistrict")}
                className=" h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              >
                <option value="" disabled>
                  Select Receiver District
                </option>
                {districtsByRegion(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {/*Delivery Instruction */}
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Delivery Instruction
              </label>
              <textarea
                rows={4}
                placeholder="Delivery Instruction"
                {...register("deliveryInfo")}
                className="resize-none border border-[#CBD5E1] rounded-lg px-3 py-2 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              ></textarea>
            </fieldset>
          </div>
        </div>
        <p className="my-12">* PickUp Time 4pm-7pm Approx.</p>
        <button className="w-[375px] h-10 bg-[#CAEB66] flex items-center justify-center font-semibold rounded-lg text-sm cursor-pointer">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
