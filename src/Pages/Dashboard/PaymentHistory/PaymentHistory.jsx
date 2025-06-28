import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner";

const formatDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-neutral text-[#606060] font-bold text-base uppercase tracking-wide">
          <tr>
            <th scope="col" className="px-6 py-4 text-left">
              #
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Parcel ID
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Amount
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Transaction
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Paid At
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments?.length > 0 ? (
            payments.map((p, index) => (
              <tr
                key={p.transactionId}
                className="hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">
                  {index + 1}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap max-w-xs truncate cursor-pointer text-indigo-700"
                  title={p.parcelId}
                >
                  {p.parcelId}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">
                  ৳{p.amount}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-600 max-w-xs truncate cursor-pointer"
                  title={p.transactionId}
                >
                  {p.transactionId}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {formatDate(p.paid_at_string)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center text-gray-400 py-8 italic font-light"
              >
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
