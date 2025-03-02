
// client/src/routes/admin/adminDashboard.tsx
import { useEffect, useState, useMemo } from "react"
import { api } from "../../utils"
import { toast } from "react-hot-toast"
import adminFundCard from "./adminFundCard"
import { useNavigate, createFileRoute } from "@tanstack/react-router"

// export const Route = createFileRoute("/admin/adminDashboard")({
//   component: adminDashboard,
// })

function adminDashboard() {
  const [funds, setFunds] = useState<any[]>([])
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "verified" | "failed"
  >("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadFunds = async () => {
      try {
        const response = await api.get("/api/v1/funds")
        setFunds(response.data.data || [])
      } catch (error) {
        console.error("Error loading funds:", error)
        toast.error("Error loading funds")
      }
    }
    loadFunds()
  }, [])

  const filteredFunds = useMemo(() => {
    return funds.filter((fund) => {
      if (filterStatus !== "all" && fund.status !== filterStatus) {
        return false
      }
      if (
        searchQuery.trim() !== "" &&
        !fund.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      return true
    })
  }, [funds, filterStatus, searchQuery])

  return (
    <div className="min-h-screen bg-off_white p-8 font-sans">
      <h1 className="text-3xl font-bold text-primary mb-8">Admin Dashboard</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search funds by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/3"
        />
        <div className="flex space-x-4 mt-4 md:mt-0">
          {["all", "pending", "verified", "failed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-4 py-2 rounded border ${
                filterStatus === status
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFunds.map((fund) => (
          <adminFundCard
            key={fund.id}
            fund={fund}
            refreshFunds={() => {
              // Optionally, refresh funds after status update
              setFunds((prev) => prev.map((f) => (f.id === fund.id ? fund : f)))
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default adminDashboard