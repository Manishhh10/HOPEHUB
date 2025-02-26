import { createFileRoute } from "@tanstack/react-router"
import React from "react";
import { useAuthStore } from "../stores";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/Account")({
    component: AccountPage,
  })

function AccountPage() {
  const { userData, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
    toast.success("Logged out successfully");
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-off_white flex items-center justify-center font-sans">
        <p className="text-lg text-dark_text">No user data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off_white p-8 font-sans">
      <h1 className="text-3xl font-bold text-primary mb-8">My Account</h1>
      <div className="bg-[#edffd6] border border-secondary rounded-lg shadow-lg p-6 max-w-xl mx-auto">
        <div className="mb-4">
          <p className="text-lg font-semibold text-dark_text">First Name:</p>
          <p className="text-xl text-dark_text">{userData.first_name}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-dark_text">Last Name:</p>
          <p className="text-xl text-dark_text">{userData.last_name}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-dark_text">Email:</p>
          <p className="text-xl text-dark_text">{userData.email}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-secondary text-white px-4 py-2 rounded hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
