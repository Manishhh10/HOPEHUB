// client/src/routes/createfund.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { states, cities, State } from "../utils/locations"; // adjust imports as needed
import { useAuthStore } from "../stores";
import { api } from "../utils";
import { useEffect } from "react";

export const Route = createFileRoute("/createfund")({
  component: CreateFundPage,
});

function CreateFundPage() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const selectedState = watch("state");
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (selectedState) {
      const stateCities = cities[selectedState as State];
      if (stateCities && stateCities.length > 0) {
        setValue("city", stateCities[0]);
      }
    }
  }, [selectedState, setValue]);

  const categories = [
    "Medical",
    "Education",
    "Animals",
    "Environment",
    "Business",
    "Community",
    "Sports",
    "Other",
  ];

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("reason", data.reason);
      formData.append("state", data.state);
      formData.append("city", data.city);
      formData.append("target_amount", data.target_amount);
      // Convert dates to ISO format
      formData.append("start_date", new Date(data.start_date).toISOString());
      formData.append("end_date", new Date(data.end_date).toISOString());
      // Append file: data.image is a FileList from the file input
      formData.append("image", data.image[0]);

      await api.post("/api/v1/funds", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Fund creation failed:", error);
    }
  };

  if (!isLoggedIn) return <div>Please login to create a fund</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#f8f7e8] min-h-screen">
      <h1 className="text-3xl font-bold text-[#0b3d40] mb-8">Create New Hope</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Fundraiser Info Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#09442d]">Fundraiser Information</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#333]">Title</label>
            <input
              {...register("title")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#b9ff66]"
              required
            />
          </div>
          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#333]">Category</label>
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
          {/* Reason Textarea */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#333]">Reason</label>
            <textarea
              {...register("reason")}
              className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-[#b9ff66]"
              required
            />
          </div>
          {/* File Input for Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#333]">Upload Image</label>
            <input
              type="file"
              {...register("image")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#b9ff66]"
              required
              accept="image/*"
            />
          </div>
        </section>

        {/* Location Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#09442d]">Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333]">State</label>
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
              <label className="block text-sm font-medium text-[#333]">City</label>
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
          <h2 className="text-xl font-semibold text-[#09442d]">Donation Details</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#333]">Target Amount (NPR)</label>
            <input
              type="number"
              {...register("target_amount")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#b9ff66]"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333]">Start Date</label>
              <input
                type="date"
                {...register("start_date")}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#b9ff66]"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333]">End Date</label>
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
          Create Hope Fund
        </button>
      </form>
    </div>
  );
}
