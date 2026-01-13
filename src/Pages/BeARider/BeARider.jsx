import React from "react";
import rider from "../../assets/agent-pending.png";
import { IoIosArrowDown } from "react-icons/io";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
const BeARider = () => {
  const { handleSubmit, register, control } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const duplicatedRegions = serviceCenters.map((c) => c.region);
  const uniqueRegions = [...new Set(duplicatedRegions)];
  console.log(uniqueRegions);
  const districtsByRegion = (region) => {
    const regionWiseDistricts = serviceCenters.filter(
      (c) => region === c.region
    );
    const districts = regionWiseDistricts.map((d) => d.district);
    return districts;
  };
  const region = useWatch({ control, name: "region" });

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/be-rider", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has been submitted. Updates will be sent to your email.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="bg-white mt-7 mb-28 rounded-4xl py-20 px-24 shadow-sm">
      <h2 className="text-5xl text-[#03373D] font-extrabold">Be a Rider</h2>
      <p className="text-[#606060]  mt-4 mb-12 w-1/2">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <div className="flex">
        <div className="flex-1">
          <p className="text-[#03373D] font-extrabold text-2xl mb-5">
            Tell us about yourself
          </p>

          <form
            onSubmit={handleSubmit(handleRiderApplication)}
            className="flex flex-col"
          >
            {/*Name */}
            <label className="font-medium text-sm text-[#0F172A] mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name")}
              className="w-full h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
            />
            {/*Driving license */}
            <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-4">
              Driving License Number
            </label>
            <input
              type="number"
              placeholder="Driving License Number"
              min={0}
              {...register("drivingLicense")}
              className="w-full h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
            />
            {/*Email */}
            <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-4">
              Your Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              className="w-full h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
            />
            {/*Region */}
            <fieldset className="flex flex-col relative">
              <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                Your Region
              </label>
              <div className="relative">
                <select
                  {...register("region")}
                  className="
      w-full h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 
      focus:bg-[#f0f9ff] transition-all duration-300 ease-in-out 
      focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1
      appearance-none pr-10 cursor-pointer 
    "
                >
                  <option value="" disabled selected>
                    Select your Region
                  </option>
                  {uniqueRegions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown
                  className="
      absolute right-3 top-1/2 -translate-y-1/2 
      pointer-events-none w-5 h-5 text-slate-600
    "
                />
              </div>
            </fieldset>

            {/*District */}
            {region && (
              <fieldset className="flex flex-col relative">
                <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
                  Your District
                </label>
                <div className="relative">
                  <select
                    {...register("district")}
                    className="
      w-full h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 
      focus:bg-[#f0f9ff] transition-all duration-300 ease-in-out 
      focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1
      appearance-none pr-10  cursor-pointer
    "
                  >
                    <option value="" disabled selected>
                      Select your District
                    </option>
                    {districtsByRegion(region).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <IoIosArrowDown
                    className="
      absolute right-3 top-1/2 -translate-y-1/2 
      pointer-events-none w-5 h-5 text-slate-600
    "
                  />
                </div>
              </fieldset>
            )}
            {/*NID no */}
            <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-4">
              NID No
            </label>
            <input
              type="number"
              placeholder="NID"
              min={0}
              {...register("NID")}
              className="w-full h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
            />
            {/*Phone Number */}
            <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-4">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Phone Number"
              min={0}
              {...register("phoneNo")}
              className="w-full h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
            />
            {/*Bike Brand model and year */}
            <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-4">
              Bike Brand Model and Year
            </label>
            <input
              type="number"
              placeholder="Bike Brand Model and Year"
              min={0}
              {...register("brandModelYear")}
              className="w-full h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
            />
            {/*Bike Registration Number */}
            <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-4">
              Bike Registration Number
            </label>
            <input
              type="number"
              placeholder="Bike Registration Number"
              min={0}
              {...register("bikeRegisterNo")}
              className="w-full h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
            />
            {/*Tell us about yourself */}
            <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
              Tell Us About Yourself
            </label>
            <textarea
              rows={4}
              placeholder="Tell Us About Yourself"
              {...register("aboutYourself")}
              className="resize-none border border-[#CBD5E1] rounded-lg px-3 py-2 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 mb-4"
            ></textarea>
            <button className="w-full h-10 bg-[#CAEB66] flex items-center justify-center font-semibold rounded-lg text-sm cursor-pointer">
              Submit
            </button>
          </form>
        </div>
        <div className="flex-1 flex justify-end ">
          <img
            src={rider}
            alt="Rider application illustration"
            className="self-start sticky" /*self-start overrides container's items-stretch */
          />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
