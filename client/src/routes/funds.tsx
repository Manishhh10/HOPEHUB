import { createFileRoute } from "@tanstack/react-router";
import { api } from "../utils";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/funds")({
  component: FundsPage,
});

function FundsPage() {
  const [funds, setFunds] = useState<any[]>([]);
  const currentUser = useAuthStore((state) => state.userData);

  useEffect(() => {
    const loadFunds = async () => {
      try {
        const response = await api.get("/api/v1/funds");
        setFunds(response.data.data || []);
      } catch (error) {
        console.error("Error loading funds:", error);
      }
    };
    loadFunds();
  }, []);

  const deleteFund = async (fundId: number) => {
    try {
      await api.delete(`/api/v1/funds/${fundId}`);
      toast.success("Fund deleted successfully!");
      setFunds(funds.filter((fund) => fund.id !== fundId));
    } catch (error) {
      console.error("Error deleting fund:", error);
      toast.error("Error deleting fund");
    }
  };

  const editFund = (fundId: number) => {
    // Redirect to an edit page (implement edit page if needed)
    window.location.href = `/editfund/${fundId}`;
  };

  return (
    <div className="min-h-screen bg-[#f8f7e8] p-8">
      <h1 className="text-3xl font-bold text-[#0b3d40] mb-8">Active Hope Funds</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funds.map((fund) => (
          <div key={fund.id} className="bg-white rounded-lg shadow-md p-6">
            {fund.image_url && (
              <img
                src={`${fund.image_url}`}
                alt={fund.title}
                className="mb-4 w-full h-48 object-cover rounded"
              />
            )}
            <h3 className="text-xl font-semibold text-[#09442d]">{fund.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{fund.category}</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Location:</span> {fund.city}, {fund.state}
              </p>
              <p className="text-sm">
                <span className="font-medium">Target:</span> NPR {fund.target_amount}
              </p>
              <p className="text-sm">
                <span className="font-medium">Duration:</span>{" "}
                {new Date(fund.start_date).toLocaleDateString()} -{" "}
                {new Date(fund.end_date).toLocaleDateString()}
              </p>
            </div>
            {!currentUser ? (
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => editFund(fund.id)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded hover:opacity-90 transition flex items-center justify-center"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => deleteFund(fund.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:opacity-90 transition flex items-center justify-center"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            ) : (
              <button className="mt-4 w-full bg-[#0b3d40] text-[#b9ff66] py-2 rounded hover:opacity-90 transition">
                Donate Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
