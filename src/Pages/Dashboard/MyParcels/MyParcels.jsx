import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleView = (id) => {
    console.log("View parcel", id);
  };

  const handlePay = (id) => {
    console.log("Proceed to payment for", id);
    navigate(`/dashboard/payment/${id}`)
  };

  const handleDelete = async (id) => {
    const confim = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this parcel permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });
    if (confim.isConfirmed) {
      try {
        axiosSecure.delete(`/my-parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Parcel has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
          refetch();
        });
      } catch (err) {
        Swal.fire("Error", err.message || "Failed to delete parcel", "error");
      }
    }
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleString();
  };

  return (
    <div className="w-full overflow-auto rounded-xl shadow-md">
      <table className="min-w-[700px] md:min-w-[900px] w-full text-sm sm:text-base">
        <thead className="bg-base-200 text-[13px] sm:text-[15px] font-semibold text-left">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Parcel</th>
            <th className="px-4 py-3">From → To</th>
            <th className="px-4 py-3">Cost</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 hidden md:table-cell">Date</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {parcels.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-6">
                No parcels found.
              </td>
            </tr>
          )}

          {parcels.map((parcel, index) => (
            <tr key={parcel._id} className="border-b hover:bg-base-100">
              <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>

              <td className="max-w-[180px] truncate px-4 py-3">
                <div className="font-semibold capitalize text-primary">
                  {parcel.parcelName}
                </div>
                <div className="text-xs text-gray-500 truncate max-w-[140px]">
                  {parcel.parcelType}
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="whitespace-nowrap font-semibold text-primary">
                  {parcel.senderRegion} → {parcel.receiverRegion}
                </div>
                <div className="text-xs text-gray-500 truncate max-w-[160px]">
                  {parcel.senderCenter} → {parcel.receiverCenter}
                </div>
              </td>

              <td className="px-4 py-3 whitespace-nowrap">৳{parcel.cost}</td>

              <td className="px-4 py-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 gap-1">
                  <span className="badge badge-warning text-black text-[11px] sm:text-xs">
                    {parcel.delivery_status}
                  </span>
                  <span className="badge badge-error text-white capitalize text-[11px] sm:text-xs">
                    {parcel.payment_status}
                  </span>
                </div>
              </td>

              <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">
                {formatDate(parcel.creation_date)}
              </td>

              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <button
                    onClick={() => handleView(parcel._id)}
                    className="btn btn-xs btn-info text-white"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </button>
                  {parcel.payment_status.toLowerCase() === "unpaid" && (
                    <button
                      onClick={() => handlePay(parcel._id)}
                      className="btn btn-xs btn-success text-white"
                    >
                      Pay
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
