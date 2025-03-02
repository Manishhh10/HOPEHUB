import {
    createFileRoute,
    useParams,
    useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "../utils";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../stores";
import { FaEdit, FaTrash, FaShieldAlt } from "react-icons/fa";

export const Route = createFileRoute("/fund-details/$fundId")({
    component: FundDetailsPage,
});

function FundDetailsPage() {
    const { fundId } = useParams({ from: "/fund-details/$fundId" });
    const navigate = useNavigate();
    const [fund, setFund] = useState<any>(null);
    const currentUser = useAuthStore((state) => state.userData);
    const [donationModalOpen, setDonationModalOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState("");

    useEffect(() => {
        const loadFund = async () => {
            try {
                const response = await api.get(`/api/v1/funds/${fundId}`);
                setFund(response.data.data);
            } catch (error) {
                console.error("Error loading fund:", error);
                toast.error("Error loading fund");
            }
        };
        if (fundId) loadFund();
    }, [fundId]);

    const confirmDonation = async () => {
        if (!donationAmount || isNaN(Number(donationAmount))) {
            toast.error("Please enter a valid donation amount.");
            return;
        }
        try {
            const response = await api.post(`/api/v1/funds/${fundId}/donate`, {
                amount: Number(donationAmount),
            });
            toast.success("Donation successful!");
            setFund(response.data.data);
            setDonationModalOpen(false);
        } catch (error) {
            console.error("Donation failed:", error);
            toast.error("Donation failed");
        }
    };

    const editFund = () => {
        navigate({
            to: "/editfund/$editfundId",
            params: { editfundId: fundId || "" },
        });
    };

    const deleteFund = async () => {
        try {
            await api.delete(`/api/v1/funds/${fundId}`);
            toast.success("Fund deleted successfully!");
            navigate({ to: "/funds" });
        } catch (error) {
            console.error("Error deleting fund:", error);
            toast.error("Error deleting fund");
        }
    };

    if (!fund) {
        return (
            <div className="min-h-screen bg-off_white flex items-center justify-center font-sans">
                <p className="text-lg text-dark_text">
                    Loading fund details...
                </p>
            </div>
        );
    }

    const progress = Math.min(
        100,
        (fund.amount_raised / fund.target_amount) * 100,
    );
    const isCompleted = fund.amount_raised >= fund.target_amount;
    const organizerName =
        currentUser?.id === fund.userId
            ? `${currentUser?.first_name} ${currentUser?.last_name}`
            : "Anonymous";

    return (
        <div className="min-h-screen bg-off_white p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
                {/* Left Section */}
                <div className="flex-1">
                    {fund.image_url && (
                        <img
                            src={`${import.meta.env.VITE_API_ENDPOINT}/uploads/${fund.image_url}`}
                            alt={fund.title}
                            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                        />
                    )}

                    <div className="mt-6 space-y-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary">
                            {fund.title}
                        </h1>

                        {/* Campaign Info Grid */}
                        <div className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Category
                                </p>
                                <p className="font-medium text-primary">
                                    {fund.category}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Location
                                </p>
                                <p className="font-medium text-primary">
                                    {fund.city}, {fund.state}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Donations
                                </p>
                                <p className="font-medium text-primary">
                                    {fund.donation_count}
                                </p>
                            </div>
                        </div>

                        {/* Progress Section */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <p className="text-2xl font-bold text-primary">
                                        NPR {fund.amount_raised}
                                    </p>
                                    <p className="text-gray-500">
                                        raised of NPR {fund.target_amount} goal
                                    </p>
                                </div>
                                <span className="bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                                    {Math.round(progress)}% funded
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-secondary h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Story Section */}
                        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                            <h2 className="text-xl font-semibold text-primary">
                                Campaign Story
                            </h2>
                            <p className="text-dark_text leading-relaxed whitespace-pre-line">
                                {fund.reason}
                            </p>
                        </div>

                        {/* Organizer Section */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-lg">
                                    {organizerName[0]}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Organized by
                                    </p>
                                    <p className="capitalize font-medium text-dark_text">
                                        {organizerName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-96">
                    <div className="bg-white p-6 rounded-xl shadow-sm sticky top-6 space-y-6">
                        {/* Status & Failure Reason */}
                        <div className="space-y-4">
                            <div
                                className={`p-4 rounded-lg ${
                              fund.status === 'verified' 
                                  ? 'bg-green-50 text-green-700'
                                  : fund.status === 'pending'
                                  ? 'bg-yellow-50 text-yellow-700'
                                  : 'bg-red-50 text-red-700'
                          }`}
                            >
                                <h3 className="font-semibold mb-1">
                                    Campaign Status
                                </h3>
                                <p
                                    className={`capitalize px-2 py-1 rounded${
                                        fund.status === "verified"
                                            ? "bg-green-100 text-green-800"
                                            : fund.status === "pending"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {fund.status}
                                </p>
                            </div>

                            {fund.status === "failed" &&
                                fund.failure_reason && (
                                    <div className="bg-red-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-red-700 mb-2">
                                            Campaign Not Successful
                                        </h3>
                                        <p className="text-red-600 text-sm">
                                            {fund.failure_reason}
                                        </p>
                                    </div>
                                )}
                        </div>

                        {isCompleted ? (
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <p className="font-semibold text-green-700">
                                    Campaign Completed
                                </p>
                            </div>
                        ) : currentUser?.id === fund.userId ? (
                            <div className="space-y-4">
                                <button
                                    onClick={editFund}
                                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg hover:bg-accent transition-colors"
                                >
                                    <FaEdit className="text-lg" />
                                    Edit Campaign
                                </button>
                                <button
                                    onClick={deleteFund}
                                    className="w-full flex items-center justify-center gap-2 bg-danger_red text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <FaTrash className="text-lg" />
                                    Delete Campaign
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4">
                                    <button
                                        onClick={() =>
                                            setDonationModalOpen(true)
                                        }
                                        className="w-full bg-secondary text-primary py-4 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
                                    >
                                        Donate Now
                                    </button>
                                    <div className="text-center text-sm text-gray-500">
                                        <p className="inline-flex items-center gap-2">
                                            <FaShieldAlt className="w-4 h-4 text-green-500" />
                                            Donation protected
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        {fund.donation_count} people have
                                        supported this campaign
                                    </p>
                                </div>
                            </>
                        )}

                        {/* Campaign Dates */}
                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex justify-between text-sm">
                                <div>
                                    <p className="text-gray-500">Start date</p>
                                    <p className="text-dark_text">
                                        {new Date(
                                            fund.start_date,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500">End date</p>
                                    <p className="text-dark_text">
                                        {new Date(
                                            fund.end_date,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Donation Modal */}
            {donationModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md mx-4">
                        <h2 className="text-2xl font-bold text-primary mb-4">
                            Support {fund.title}
                        </h2>
                        <input
                            type="number"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            placeholder="Enter amount (NPR)"
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                        <div className="mt-6 flex gap-3 justify-end">
                            <button
                                onClick={() => setDonationModalOpen(false)}
                                className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDonation}
                                className="px-6 py-2 bg-secondary text-primary rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
                            >
                                Confirm Donation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FundDetailsPage;
