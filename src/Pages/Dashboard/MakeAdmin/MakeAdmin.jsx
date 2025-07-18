import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");

  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchedUsers", emailQuery],
    enabled: !!emailQuery,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
      return res.data;
    },
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleRoleChange = async (id, currentRole) => {
    const action = currentRole === "admin" ? "Remove admin" : "Make admin";
    const newRole = currentRole === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: `${action}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: newRole });
      Swal.fire("Success", `${action} successful`, "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Manage Admin Access
        </h2>

        <div className="relative mb-6 w-full max-w-lg">
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search user by email"
            value={emailQuery}
            onChange={(e) => setEmailQuery(e.target.value)}
          />
        </div>

        {isFetching && <p className="text-gray-600">Loading users...</p>}

        {!isFetching && users.length === 0 && emailQuery && (
          <p className="text-gray-500 italic">No users found for this email.</p>
        )}

        {users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table w-full text-left border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="p-3">Email</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          u.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {u.role || "user"}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() =>
                          handleRoleChange(u._id, u.role || "user")
                        }
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-md font-semibold transition duration-200 ${
                          u.role === "admin"
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-neutral text-black hover:bg-blue-200"
                        }`}
                      >
                        {u.role === "admin" ? (
                          <>
                            <FaUserTimes />
                            Remove Admin
                          </>
                        ) : (
                          <>
                            <FaUserShield />
                            Make Admin
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeAdmin;
