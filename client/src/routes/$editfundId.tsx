// client/src/routes/editfund.$id.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { states, cities, State } from "../utils/locations"
import { api } from "../utils"
import { toast } from "react-hot-toast"

interface FundFormData {
  title: string
  category: string
  reason: string
  state: string
  city: string
  target_amount: number
  start_date: string
  end_date: string
  image?: FileList
}

export const Route = createFileRoute("/$editfundId")({
  component: EditFundPage,
})

function EditFundPage() {
  
  const { editfundId:id } = Route.useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, watch, setValue, reset } =
    useForm<FundFormData>()

  const selectedState = watch("state")

  useEffect(() => {
    if (selectedState) {
      const stateCities = cities[selectedState as State]
      if (stateCities && stateCities.length > 0) {
        setValue("city", stateCities[0])
      }
    }
  }, [selectedState, setValue])

  useEffect(() => {
    const fetchFund = async () => {
      try {
        const response = await api.get(`/api/v1/funds/${id}`)
        const fund = response.data.data
        reset({
          title: fund.title,
          category: fund.category,
          reason: fund.reason,
          state: fund.state,
          city: fund.city,
          target_amount: fund.target_amount,
          start_date: new Date(fund.start_date).toISOString().split("T")[0],
          end_date: new Date(fund.end_date).toISOString().split("T")[0],
        })
      } catch (error) {
        console.error("Error fetching fund data:", error)
        toast.error("Error fetching fund data")
      }
    }
    if (id) {
      fetchFund()
    }
  }, [id, reset])

  const categories = [
    "Medical",
    "Education",
    "Animals",
    "Environment",
    "Business",
    "Community",
    "Sports",
    "Other",
  ]

  const onSubmit = async (data: FundFormData) => {
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("category", data.category)
      formData.append("reason", data.reason)
      formData.append("state", data.state)
      formData.append("city", data.city)
      formData.append("target_amount", String(data.target_amount))
      formData.append("start_date", new Date(data.start_date).toISOString())
      formData.append("end_date", new Date(data.end_date).toISOString())
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0])
      }

      await api.put(`/api/v1/funds/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      toast.success("Fund updated successfully!")
      navigate({ to: "/funds" })
    } catch (error) {
      console.error("Fund update failed:", error)
      toast.error("Fund update failed")
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#f8f7e8] min-h-screen">
      <h1 className="text-3xl font-bold text-[#0b3d40] mb-8">Edit Hope Fund</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Fundraiser Info Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#09442d]">
            Fundraiser Information
          </h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#333]">
              Title
            </label>
            <input
              {...register("title")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#b9ff66]"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#333]">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#b9ff66]"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#333]">
              Reason
            </label>
            <textarea
              {...register("reason")}
              className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-[#b9ff66]"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#333]">
              Upload New Image (Optional)
            </label>
            <input
              type="file"
              {...register("image")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#b9ff66]"
              accept="image/*"
            />
          </div>
        </section>

        {/* Location Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#09442d]">Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333]">
                State
              </label>
              <select
                {...register("state")}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#b9ff66]"
                required
              >
                {(Object.keys(states) as State[]).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333]">
                City
              </label>
              <select
                {...register("city")}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#b9ff66]"
                required
                disabled={!selectedState}
              >
                {selectedState &&
                  cities[selectedState as State]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#09442d]">
            Donation Details
          </h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#333]">
              Target Amount (NPR)
            </label>
            <input
              type="number"
              {...register("target_amount")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#b9ff66]"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333]">
                Start Date
              </label>
              <input
                type="date"
                {...register("start_date")}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#b9ff66]"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333]">
                End Date
              </label>
              <input
                type="date"
                {...register("end_date")}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#b9ff66]"
                required
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-[#0b3d40] text-[#b9ff66] py-3 rounded hover:opacity-90 transition"
        >
          Update Fund
        </button>
      </form>
    </div>
  )
}

export default EditFundPage
