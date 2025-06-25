import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const serviceCenters = useLoaderData();
  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];
  const getDistrictsByRegion = (region) =>
    serviceCenters.filter((w) => w.region === region).map((w) => w.district);

  const parcelType = watch("parcelType");
  const isDocument = parcelType === "document";
  const [cost, setCost] = useState(null);

  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const onSubmit = (data) => {
    const isSameDistrict = data.senderCenter === data.receiverCenter;
    const parcelType = data.parcelType;
    const isDocument = parcelType === "document";
    const weight = Number(data.parcelWeight) || 0;

    let baseCost = 0;
    let extraCost = 0;
    let breakdown = "";

    if (isDocument) {
      baseCost = isSameDistrict ? 60 : 80;
      breakdown = `
      <p>Type: <b>Document</b></p>
      <p>Location: <b>${isSameDistrict ? "Within City" : "Outside City"}</b></p>
      <p>Base Cost: <b>${baseCost} BDT</b></p>
    `;
    } else {
      if (weight <= 3) {
        baseCost = isSameDistrict ? 110 : 150;
        breakdown = `
        <p>Type: <b>Non-Document</b></p>
        <p>Weight: <b>${weight} kg</b></p>
        <p>Location: <b>${
          isSameDistrict ? "Within City" : "Outside City"
        }</b></p>
        <p>Base Cost: <b>${baseCost} BDT</b></p>
      `;
      } else {
        const extraWeight = weight - 3;
        extraCost = extraWeight * 40;
        baseCost = isSameDistrict ? 110 + extraCost : 150 + extraCost + 40;

        breakdown = `
        <p>Type: <b>Non-Document</b></p>
        <p>Weight: <b>${weight} kg</b> (3kg + ${extraWeight}kg extra)</p>
        <p>Location: <b>${
          isSameDistrict ? "Within City" : "Outside City"
        }</b></p>
        <p>Base Cost: <b>${isSameDistrict ? 110 : 150} BDT</b></p>
        <p>Extra Weight Cost: <b>${extraCost} BDT</b></p>
        ${
          !isSameDistrict
            ? "<p>Outside Area Extra Charge: <b>40 BDT</b></p>"
            : ""
        }
      `;
      }
    }

    Swal.fire({
      title: "📦 Review Delivery Cost",
      html: `
      <div style="text-align:left; font-size:16px;">
        ${breakdown}
        <div style="
          margin-top:10px;
          padding:10px;
          background:#e6ffed;
          border-left:5px solid #16a34a;
          font-size:18px;
          font-weight:bold;
          color:#14532d;
        ">
          ✅ Total Delivery Cost: ${baseCost} BDT
        </div>
      </div>
    `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "💸 Proceed to Payment",
      cancelButtonText: "🔁 Go Back & Edit",
      customClass: {
        popup: "rounded-xl p-6",
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setCost(baseCost);

        const parcelData = {
          ...data,
          type: isDocument ? "document" : "non-document",
          cost: baseCost,
          creation_date: new Date().toISOString(),
        };

        console.log("Saving to DB:", parcelData);
        toast.success("Parcel successfully created!");
        reset();
      } else {
        toast.info("You can edit your parcel details.");
      }
    });
  };

  return (
    <div className="px-10 py-8 md:py-16 md:px-20 rounded-2xl md:rounded-4xl bg-secondary mx-auto mb-20 max-w-6xl">
      <h1 className="text-3xl font-bold mb-4">Add Parcel</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Type Selection */}
        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="document"
              {...register("parcelType", { required: true })}
              className="radio checked:bg-green-500"
            />
            <span>Document</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="non-document"
              {...register("parcelType", { required: true })}
              className="radio checked:bg-green-500"
            />
            <span>Non-Document</span>
          </label>
        </div>
        {errors.parcelType && (
          <p className="text-sm text-red-500 mt-1">
            Please select a parcel type.
          </p>
        )}

        {/* Parcel Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Parcel Name</label>
            <input
              type="text"
              placeholder="Parcel Name"
              {...register("parcelName", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.parcelName && (
              <p className="text-sm text-red-500 mt-1">
                Parcel name is required
              </p>
            )}
          </div>
          <div>
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="number"
              step="0.1"
              placeholder="Parcel Weight"
              {...register("parcelWeight", {
                required: !isDocument ? "Weight is required" : false,
              })}
              disabled={isDocument}
              className={`input input-bordered w-full ${
                isDocument ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
            {!isDocument && errors.parcelWeight && (
              <p className="text-sm text-red-500 mt-1">
                {errors.parcelWeight.message}
              </p>
            )}
          </div>
        </div>

        {/* Sender & Receiver Side-by-Side */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sender Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Sender Details</h3>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Sender Name"
                {...register("senderName", { required: true })}
                className="input input-bordered w-full"
              />
              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register("senderCenter", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(senderRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Sender Address"
                {...register("senderAddress", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                placeholder="Sender Contact No"
                {...register("senderContact", { required: true })}
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Pickup Instruction"
                {...register("pickupInstruction")}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>

          {/* Receiver Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Receiver Details</h3>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Receiver Name"
                {...register("receiverName", { required: true })}
                className="input input-bordered w-full"
              />
              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register("receiverCenter", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(receiverRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Receiver Address"
                {...register("receiverAddress", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                placeholder="Receiver Contact No"
                {...register("receiverContact", { required: true })}
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Delivery Instruction"
                {...register("deliveryInstruction")}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>
        </div>

        {/* Note + Submit */}
        <p className="text-sm text-gray-500">* PickUp Time 4pm–7pm Approx.</p>

        <button className="btn bg-lime-400 hover:bg-lime-500 text-black">
          Proceed to Confirm Booking
        </button>
      </form>

      {/* Cost Display */}
      {cost !== null && (
        <div className="text-center mt-6">
          <p className="text-lg font-semibold">
            Estimated Delivery Cost:{" "}
            <span className="text-green-600">{cost} BDT</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SendParcel;
