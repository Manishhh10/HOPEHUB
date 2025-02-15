import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { Route as TanStackRoute, RootRoute } from "@tanstack/react-router";

export const rootRoute = new RootRoute({
  component: () => <div>Root Layout</div>,
});

const categories = [
  "Animals",
  "Business",
  "Community",
  "Competitions",
  "Creative",
  "Education",
  "Emergencies",
  "Environment",
  "Events",
  "Faith",
  "Family",
  "Funerals & Memorials",
  "Medical",
  "Monthly Bills",
  "Newlyweds",
  "Other",
  "Sports",
  "Travel",
  "Ukraine Relief",
  "Volunteer",
  "Wishes",
];

const states = [
  "Province No. 1",
  "Province No. 2",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
];

const citiesByState: Record<string, string[]> = {
  "Province No. 1": ["Biratnagar", "Illam"],
  "Province No. 2": ["Janakpur", "Birgunj"],
  "Bagmati": ["Kathmandu", "Lalitpur", "Bhaktapur"],
  "Gandaki": ["Pokhara", "Baglung"],
  "Lumbini": ["Butwal", "Nepalgunj"],
  "Karnali": ["Birendranagar", "Chhayanath Rara"],
  "Sudurpashchim": ["Mahendranagar", "Dadeldhura"],
};

export function CreateFund() {
  const [formData, setFormData] = useState({
    title: "",
    category: categories[0],
    reason: "",
    state: states[0],
    city: citiesByState[states[0]][0],
    donation_amount: "",
    donation_start_date: "",
    donation_end_date: "",
  });

  // Separate state for the image file
  const [imageFile, setImageFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // When state changes, update city automatically:
      ...(name === "state" && { city: citiesByState[value][0] }),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("category", formData.category);
      form.append("reason", formData.reason);
      form.append("state", formData.state);
      form.append("city", formData.city);
      form.append("donation_amount", formData.donation_amount);
      form.append("donation_start_date", formData.donation_start_date);
      form.append("donation_end_date", formData.donation_end_date);
      form.append("image", imageFile);

      // Log the data being sent
    console.log("Form data being sent:", form);

      const response = await fetch("/api/v1/funds", {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Fund created successfully!");
        // Navigate to DonationPage (as defined in your route tree)
        navigate({ to: "/DonationPage" });
      } else {
        toast.error(data.message || "Error creating fund");
      }
    } catch (error) {
      console.error("Error creating fund:", error);
      toast.error("Error creating fund");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a Fund</h2>
      <form onSubmit={handleSubmit}>
        {/* Section 1: Fundraiser's Information */}
        <div className="mb-6 border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Fundraiser's Information</h3>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          {/* File Input for image */}
          <div className="mb-4">
            <label className="block mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>

        {/* Section 2: Fundraising Location */}
        <div className="mb-6 border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Fundraising Location</h3>
          <div className="mb-4">
            <label className="block mb-1">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              {citiesByState[formData.state].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 3: Donation Information */}
        <div className="mb-6 border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Donation Information</h3>
          <div className="mb-4">
            <label className="block mb-1">Amount</label>
            <input
              type="number"
              name="donation_amount"
              value={formData.donation_amount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Donation Start Date</label>
            <input
              type="date"
              name="donation_start_date"
              value={formData.donation_start_date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Donation End Date</label>
            <input
              type="date"
              name="donation_end_date"
              value={formData.donation_end_date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#0b3d40] text-[#b9ff66] py-2 rounded hover:opacity-80 transition"
        >
          Create Fund
        </button>
      </form>
    </div>
  );
}

export const Route = new TanStackRoute({
  getParentRoute: () => rootRoute,
  path: "/CreateFund",
  component: CreateFund,
});
