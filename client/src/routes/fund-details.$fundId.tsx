import { createFileRoute, useParams, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { api } from "../utils"
import { toast } from "react-hot-toast"
import { useAuthStore } from "../stores"
import { FaEdit, FaTrash } from "react-icons/fa"

export const Route = createFileRoute("/fund-details/$fundId")({
  component: FundDetailsPage,
})

function FundDetailsPage() {
  const { fundId } = useParams({ from: "/fund-details/$fundId" })
  const navigate = useNavigate()
  const [fund, setFund] = useState<any>(null)
  const currentUser = useAuthStore((state) => state.userData)

  const [donationModalOpen, setDonationModalOpen] = useState(false)
  const [donationAmount, setDonationAmount] = useState("")

  useEffect(() => {
    const loadFund = async () => {
      try {
        const response = await api.get(`/api/v1/funds/${fundId}`)
        setFund(response.data.data)
      } catch (error) {
        console.error("Error loading fund:", error)
        toast.error("Error loading fund")
      }
    }
    if (fundId) loadFund()
  }, [fundId])

  const confirmDonation = async () => {
    if (!donationAmount || isNaN(Number(donationAmount))) {
      toast.error("Please enter a valid donation amount.")
      return
    }
    try {
      const response = await api.post(`/api/v1/funds/${fundId}/donate`, {
        amount: Number(donationAmount),
      })
      toast.success("Donation successful!")
      setFund(response.data.data) // updated fund data
      setDonationModalOpen(false)
    } catch (error) {
      console.error("Donation failed:", error)
      toast.error("Donation failed")
    }
  }

  const editFund = () => {
    navigate({
      to: "/editfund/$editfundId",
      params: { editfundId: fundId || "" },
    })
  }

  const deleteFund = async () => {
    try {
      await api.delete(`/api/v1/funds/${fundId}`)
      toast.success("Fund deleted successfully!")
      navigate({ to: "/funds" })
    } catch (error) {
      console.error("Error deleting fund:", error)
      toast.error("Error deleting fund")
    }
  }

  if (!fund) {
    return (
      <div className="min-h-screen bg-off_white flex items-center justify-center font-sans">
        <p className="text-lg text-dark_text">Loading fund details...</p>
      </div>
    )
  }

  const progress = Math.min(
    100,
    (fund.amount_raised / fund.target_amount) * 100,
  )
  const isCompleted = fund.amount_raised >= fund.target_amount

  return (
    <div className="min-h-screen bg-off_white p-8 font-sans flex flex-col lg:flex-row gap-8">
      {/* Left Section: Title, Image, Reason */}
      <div className="bg-white p-6 rounded-lg flex-1">
        <h1 className="text-3xl font-bold text-primary mb-4">{fund.title}</h1>
        {fund.image_url && (
          <img
            src={`${import.meta.env.VITE_API_ENDPOINT}/uploads/${fund.image_url}`}
            alt={fund.title}
            className="mb-4 w-full h-auto object-cover rounded"
          />
        )}
        <p className="text-dark_text text-base leading-relaxed">
          {fund.reason}
        </p>
      </div>

      {/* Right Section: Donation info */}
      <div className="bg-white p-6 rounded-lg w-full lg:w-[400px] flex flex-col justify-start">
        <div className="mb-4">
          <p className="text-xl font-semibold text-dark_text">
            NPR {fund.amount_raised} raised
          </p>
          <p className="text-sm text-gray-500">
            out of NPR {fund.target_amount}
          </p>
          <div className="mt-2 w-full bg-gray-200 h-3 rounded-full">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {Math.round(progress)}% raised
          </p>
        </div>
        <p className="text-sm text-dark_text mb-4">
          <span className="font-medium">From:</span>{" "}
          {new Date(fund.start_date).toLocaleDateString()} &nbsp;–&nbsp;
          <span className="font-medium">To:</span>{" "}
          {new Date(fund.end_date).toLocaleDateString()}
        </p>

        {isCompleted ? (
          <button className="w-full bg-gray-500 text-white py-2 rounded">
            Completed
          </button>
        ) : currentUser && currentUser.id === fund.userId ? (
          <div className="flex flex-col space-y-4">
            <button
              onClick={editFund}
              className="bg-primary text-white py-2 rounded hover:opacity-90 transition"
            >
              <FaEdit className="inline-block mr-2" />
              Edit
            </button>
            <button
              onClick={deleteFund}
              className="bg-danger_red text-white py-2 rounded hover:opacity-90 transition"
            >
              <FaTrash className="inline-block mr-2" />
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={() => setDonationModalOpen(true)}
            className="bg-primary text-off_white py-2 rounded hover:opacity-90 transition"
          >
            Donate Now
          </button>
        )}
      </div>

      {/* Donation Modal */}
      {donationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Donate to {fund.title}
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
  )
}

export default FundDetailsPage
