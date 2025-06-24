import { useForm } from "react-hook-form";
import { useState } from "react";

const AddParcelForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isDocument, setIsDocument] = useState(true);

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="px-10 py-8 md:py-16 md:px-20 rounded-2xl md:rounded-4xl bg-secondary mx-auto mb-20">
      <h1 className="text-3xl font-bold mb-4">Add Parcel</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Type Selection */}
        <div>
          <p className="text-lg font-semibold">Enter your parcel details</p>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={isDocument}
                onChange={() => setIsDocument(true)}
                className="radio checked:bg-green-500"
              />
              <span>Document</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={!isDocument}
                onChange={() => setIsDocument(false)}
                className="radio checked:bg-green-500"
              />
              <span>Not-Document</span>
            </label>
          </div>
        </div>

        {/* Parcel Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Parcel Name"
            {...register("parcelName")}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            placeholder="Parcel Weight (KG)"
            {...register("parcelWeight")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Sender & Receiver side-by-side */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sender Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Sender Details</h3>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Sender Name"
                {...register("senderName")}
                className="input input-bordered w-full"
              />
              <select
                {...register("senderWarehouse")}
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Select Wire house
                </option>
                <option>Dhaka</option>
                <option>Chattogram</option>
              </select>
              <input
                type="text"
                placeholder="Address"
                {...register("senderAddress")}
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                placeholder="Sender Contact No"
                {...register("senderContact")}
                className="input input-bordered w-full"
              />
              <select
                {...register("senderRegion")}
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Select your region
                </option>
                <option>Barisal</option>
                <option>Khulna</option>
              </select>
              <textarea
                placeholder="Pickup Instruction"
                {...register("pickupInstruction")}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
          </div>

          {/* Receiver Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Receiver Details</h3>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Receiver Name"
                {...register("receiverName")}
                className="input input-bordered w-full"
              />
              <select
                {...register("receiverWarehouse")}
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Select Wire house
                </option>
                <option>Dhaka</option>
                <option>Chattogram</option>
              </select>
              <input
                type="text"
                placeholder="Address"
                {...register("receiverAddress")}
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                placeholder="Receiver Contact No"
                {...register("receiverContact")}
                className="input input-bordered w-full"
              />
              <select
                {...register("receiverRegion")}
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Select your region
                </option>
                <option>Barisal</option>
                <option>Khulna</option>
              </select>
              <textarea
                placeholder="Delivery Instruction"
                {...register("deliveryInstruction")}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer Note + Submit */}
        <p className="text-sm text-gray-500">* PickUp Time 4pm–7pm Approx.</p>

        <button className="btn bg-lime-400 hover:bg-lime-500 text-black">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AddParcelForm;
