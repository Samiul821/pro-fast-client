import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useTrackingLogger from "../../../hooks/useTrackingLogger";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { logTracking } = useTrackingLogger();
  const { user } = useAuth();

  // Fetch rider parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderParcels"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Mutation for updating parcel status
  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ parcel, status }) => {
      const res = await axiosSecure.patch(`/parcels/${parcel._id}/status`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["riderParcels"]);
    },
  });

  const handleUpdate = (parcel, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Mark parcel as ${newStatus.replace("_", " ")}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ parcel, status: newStatus })
          .then(async () => {
            Swal.fire("Updated!", "Parcel status updated.", "success");

            // log tracking
            let trackDetails = `Picked up by ${user.displayName}`;
            if (newStatus === "delivered") {
              trackDetails = `Delivered by ${user.displayName}`;
            }
            await logTracking({
              tracking_id: parcel.tracking_id,
              status: newStatus,
              details: trackDetails,
              updated_by: user.email,
            });
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to update status.", "error");
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : parcels.length === 0 ? (
        <p className="text-gray-500">No assigned deliveries.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                <th className="px-4 py-2">Tracking ID</th>
                <th className="px-4 py-2">Parcel</th>
                <th className="px-4 py-2">Sender</th>
                <th className="px-4 py-2">Receiver</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id.$oid} className="border-t text-sm">
                  <td className="px-4 py-2">{parcel.tracking_id}</td>
                  <td className="px-4 py-2">{parcel.parcelName}</td>
                  <td className="px-4 py-2">
                    <div>{parcel.senderName}</div>
                    <div className="text-xs text-gray-500">
                      {parcel.senderCenter}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div>{parcel.receiverName}</div>
                    <div className="text-xs text-gray-500">
                      {parcel.receiverCenter}
                    </div>
                  </td>
                  <td className="px-4 py-2 capitalize text-blue-600">
                    {parcel.delivery_status.replace("_", " ")}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {parcel.delivery_status === "rider_assigned" && (
                      <button
                        className="btn btn-sm btn-neutral text-[#606060]"
                        onClick={() => handleUpdate(parcel, "in_transit")}
                      >
                        Mark Picked Up
                      </button>
                    )}
                    {parcel.delivery_status === "in_transit" && (
                      <button
                        className="btn btn-sm btn-success text-[#606060]"
                        onClick={() => handleUpdate(parcel, "delivered")}
                      >
                        Mark Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingDeliveries;
