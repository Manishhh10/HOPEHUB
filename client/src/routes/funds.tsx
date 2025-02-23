// client/src/routes/funds.tsx
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../utils";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/funds")({
  component: FundsPage,
});

function FundsPage() {
  const [funds, setFunds] = useState<any[]>([]);

  useEffect(() => {
    const loadFunds = async () => {
      try {
        const response = await api.get("/api/v1/funds");
        setFunds(response.data.data);
      } catch (error) {
        console.error("Error loading funds:", error);
      }
    };
    loadFunds();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f7e8] p-8">
      <h1 className="text-3xl font-bold text-[#0b3d40] mb-8">Active Hope Funds</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funds.map((fund) => (
          <div key={fund.id} className="bg-white rounded-lg shadow-md p-6">
            <img src={fund.image} alt="" />
            <h3 className="text-xl font-semibold text-[#09442d]">{fund.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{fund.category}</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm"><span className="font-medium">Location:</span> {fund.city}, {fund.state}</p>
              <p className="text-sm"><span className="font-medium">Target:</span> NPR {fund.target_amount}</p>
              <p className="text-sm"><span className="font-medium">Duration:</span> {new Date(fund.start_date).toLocaleDateString()} - {new Date(fund.end_date).toLocaleDateString()}</p>
            </div>
            <button className="mt-4 w-full bg-[#0b3d40] text-[#b9ff66] py-2 rounded hover:opacity-90 transition">
              Donate Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}