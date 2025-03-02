// client/src/routes/admin/AdminFundCard.tsx
import React, { useState } from "react"
import { api } from "../../utils"
import { toast } from "react-hot-toast"
import { createFileRoute } from "@tanstack/react-router"

const AdminFundCard: React.FC<AdminFundCardProps> = ({
  fund,
  refreshFunds,
}) => {
  const [status, setStatus] = useState(fund.status || "pending")
  const [failureReason, setFailureReason] = useState(fund.failure_reason || "")
  const [isSaving, setIsSaving] = useState(false)

  const updateStatus = async () => {
    setIsSaving(true)
    try {
      const payload: any = { status }
      if (status === "failed") {
        payload.failure_reason = failureReason
      }
      const response = await api.put(`/api/v1/funds/${fund.id}/status`, payload)
      toast.success("Fund status updated!")
      refreshFunds()
    } catch (error) {
      console.error("Failed to update status", error)
      toast.error("Failed to update status")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {fund.image_url && (
        <img
          src={`${import.meta.env.VITE_API_ENDPOINT}/uploads/${fund.image_url}`}
          alt={fund.title}
          className="mb-4 w-full h-56 object-cover rounded-lg"
        />
      )}
      <h3 className="text-xl font-semibold text-primary">{fund.title}</h3>
      <p className="text-sm text-dark_text mt-1">{fund.category}</p>
      <p className="text-sm text-dark_text mt-1">
        <span className="font-medium">Location:</span> {fund.city}, {fund.state}
      </p>
      <p className="text-sm text-dark_text mt-1">
        <span className="font-medium">Target:</span> NPR {fund.target_amount}
      </p>
      <p className="text-sm text-dark_text mt-1">
        <span className="font-medium">Raised:</span> NPR{" "}
        {fund.amount_raised || 0}
      </p>
      <div className="mt-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="failed">Failed</option>
        </select>
      </div>
      {status === "failed" && (
        <textarea
          value={failureReason}
          onChange={(e) => setFailureReason(e.target.value)}
          placeholder="Enter failure reason..."
          className="w-full p-2 border rounded mt-2"
        ></textarea>
      )}
      <button
        onClick={updateStatus}
        disabled={isSaving}
        className="w-full bg-primary text-white py-2 rounded hover:opacity-90 transition mt-4"
      >
        {isSaving ? "Saving..." : "Confirm"}
      </button>
    </div>
  )
}

export const Route = createFileRoute("/admin/AdminFundCard")({
  component: AdminFundCard,
})

// 3. Export props interface (if needed)
export interface AdminFundCardProps {
  fund: any
  refreshFunds: () => void
}

export default AdminFundCard // Default export at the end
