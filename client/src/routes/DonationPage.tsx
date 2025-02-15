import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Route as TanStackRoute, RootRoute } from "@tanstack/react-router";

// Define the root route (only if it's not already defined in __root.tsx)
export const rootRoute = new RootRoute({
  component: () => <div>Root Layout</div>,
});

export function DonationPage() {
  const [funds, setFunds] = useState<any[]>([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await fetch("/api/v1/funds");
        const data = await response.json();
        if (response.ok) {
          setFunds(data.data);
        } else {
          toast.error("Error fetching funds");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching funds");
      }
    };
    fetchFunds();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Available Funds</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {funds.map((fund) => (
          <div key={fund.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{fund.title}</h3>
            <p>Category: {fund.category}</p>
            <p>Reason: {fund.reason}</p>
            <p>
              Location: {fund.city}, {fund.state}
            </p>
            <p>Amount: ${fund.donation_amount}</p>
            <p>
              Donation Period:{" "}
              {new Date(fund.donation_start_date).toLocaleDateString()} -{" "}
              {new Date(fund.donation_end_date).toLocaleDateString()}
            </p>
            {fund.image_url && (
              <img
                src={`/${fund.image_url}`}
                alt={fund.title}
                className="mt-4 w-full h-auto object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Export with the name 'Route'
export const Route = new TanStackRoute({
  getParentRoute: () => rootRoute,
  path: "/DonationPage",
  component: DonationPage,
});
