import React, { useState } from "react";
import { useForm } from "react-hook-form";
import riderImg from "../../assets/agent-pending.png";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedRegion, setSelectedRegion] = useState("");
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();

  const regions = [...new Set(serviceCenters.map((s) => s.region))];
  const districts = serviceCenters
    .filter((s) => s.region === selectedRegion)
    .map((s) => s.district);

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    console.log("Rider Application:", riderData);

    axiosSecure.post("/riders", riderData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your application is pending approval.",
        });
      }
    });
  };

  return (
    <div className="bg-white py-6 px-8 md:py-10 md:px-16 lg:px-28 lg:py-16 rounded-2xl shadow-md">
      <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-primary mb-4">
        Be a Rider
      </h2>
      <p className="text-gray-600 mb-10">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal <br className="hidden lg:block" /> packages to
        business shipments — we deliver on time, every time.
      </p>

      <div className="flex justify-between items-center">
        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tell us about yourself
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                disabled
                defaultValue={user?.displayName}
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Your Age
              </label>
              <input
                type="number"
                placeholder="Your Age"
                {...register("age", { required: "Age is required" })}
                className="input input-bordered w-full"
              />
              {errors.age && (
                <p className="text-red-500 text-sm">{errors.age.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                disabled
                defaultValue={user?.email}
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Your Region
              </label>
              <select
                {...register("region", { required: true })}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select your region</option>
                {regions.map((region, idx) => (
                  <option key={idx} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-500 text-sm">{errors.region.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700">NID No</label>
              <input
                type="text"
                {...register("nid", { required: "NID is required" })}
                className="input input-bordered w-full"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm">{errors.nid.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Contact</label>
              <input
                type="text"
                {...register("contact", { required: "Contact is required" })}
                className="input input-bordered w-full"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block font-medium text-gray-700">
                Preferred Warehouse
              </label>
              <select
                {...register("district", { required: true })}
                disabled={!selectedRegion}
                className="select select-bordered w-full"
              >
                <option value="">Select warehouse</option>
                {districts.map((district, idx) => (
                  <option key={idx} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.warehouse && (
                <p className="text-red-500 text-sm">
                  {errors.warehouse.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-neutral w-full hover:bg-lime-500 text-[#000000] font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Submit
          </button>
        </form>

        {/* Image Section */}
        <div className="hidden md:block flex-1">
          <img
            src={riderImg}
            alt="Rider Illustration"
            className="w-full max-w-sm mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
