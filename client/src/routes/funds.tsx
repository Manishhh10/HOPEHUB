// client/src/routes/funds.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "../utils";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/funds")({
  component: FundsPage,
});

function FundsPage() {
  const navigate = useNavigate();
  const [funds, setFunds] = useState<any[]>([]);
  const currentUser = useAuthStore((state) => state.userData);

  // Donation modal state
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [selectedFund, setSelectedFund] = useState<any>(null);
  const [donationAmount, setDonationAmount] = useState("");

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
    navigate({
      to: "/editfund/$editfundId",
      params: { editfundId: fundId.toString() },
    });
  };

  const openDonationModal = (fund: any) => {
    setSelectedFund(fund);
    setDonationAmount("");
    setDonationModalOpen(true);
  };

  const confirmDonation = async () => {
    if (!donationAmount || isNaN(Number(donationAmount))) {
      toast.error("Please enter a valid donation amount.");
      return;
    }
    try {
      const response = await api.post(`/api/v1/funds/${selectedFund.id}/donate`, {
        amount: Number(donationAmount),
      });
      toast.success("Donation successful!");
      // Update funds state with the updated fund data from the donation response
      setFunds((prev) =>
        prev.map((fund) =>
          fund.id === selectedFund.id ? response.data.data : fund
        )
      );
      setDonationModalOpen(false);
    } catch (error) {
      console.error("Donation failed:", error);
      toast.error("Donation failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7e8] p-8">
      <h1 className="text-3xl font-bold text-[#0b3d40] mb-8">Active Hope Funds</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funds.map((fund) => {
          // Calculate progress percentage
          const progress = Math.min(100, (fund.amount_raised / fund.target_amount) * 100);
          const isCompleted = fund.amount_raised >= fund.target_amount;
          return (
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
                  <span className="font-medium">Raised:</span> NPR {fund.amount_raised || 0}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Donations:</span> {fund.donation_count || 0}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm">
                  <span className="font-medium">Remaining:</span> NPR {Math.max(0, fund.target_amount - (fund.amount_raised || 0))}
                </p>
              </div>
              {isCompleted ? (
                <button className="mt-4 w-full bg-gray-500 text-white py-2 rounded">
                  Completed
                </button>
              ) : currentUser && currentUser.id === fund.userId ? (
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
                <button
                  onClick={() => openDonationModal(fund)}
                  className="mt-4 w-full bg-[#0b3d40] text-[#b9ff66] py-2 rounded hover:opacity-90 transition"
                >
                  Donate Now
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Donation Modal */}
      {donationModalOpen && selectedFund && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">
              Donate to {selectedFund.title}
            </h2>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="Enter donation amount in NPR"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDonationModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:opacity-90"
              >
                Cancel
              </button>
              <button
                onClick={confirmDonation}
                className="px-4 py-2 rounded bg-green-500 text-white hover:opacity-90"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { FundsPage, FundsPage as default };
