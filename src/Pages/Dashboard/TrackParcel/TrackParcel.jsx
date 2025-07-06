import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TrackParcel = () => {
  const [trackingIdInput, setTrackingIdInput] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: updates = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tracking-updates", trackingId],
    queryFn: async () => {
      if (!trackingId) return [];
      const res = await axiosSecure.get(`/trackings/${trackingId}`);
      return res.data;
    },
    enabled: false, // fetch manually
  });

  const handleTrack = () => {
    if (!trackingIdInput.trim()) return;
    setTrackingId(trackingIdInput.trim());
    refetch();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Track Your Parcel</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={trackingIdInput}
          onChange={(e) => setTrackingIdInput(e.target.value)}
          placeholder="Enter Tracking ID"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleTrack}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Track
        </button>
      </div>

      {isLoading && <p>Loading tracking updates...</p>}
      {isError && <p className="text-red-500">{error.message}</p>}

      {updates.length > 0 && (
        <div className="space-y-3">
          {updates.map((update, index) => (
            <div key={index} className="p-3 border rounded shadow">
              <p>
                <span className="font-semibold">Status:</span> {update.status}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {update.location || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Time:</span>{" "}
                {new Date(update.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {!isLoading && trackingId && updates.length === 0 && (
        <p className="text-yellow-600">No tracking updates found.</p>
      )}
    </div>
  );
};

export default TrackParcel;
