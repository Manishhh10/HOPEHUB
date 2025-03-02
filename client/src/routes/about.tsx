import { FaHandHoldingHeart, FaUsers, FaShieldAlt, FaRupeeSign } from "react-icons/fa";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
})

export function AboutPage() {
  return (
    <div className="min-h-screen bg-off_white font-sans">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About HopeHub Nepal</h1>
          <p className="text-xl md:text-2xl text-secondary">
            Empowering Communities Through Collective Compassion
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <FaHandHoldingHeart className="w-12 h-12 text-secondary mb-4"/>
              <h3 className="text-xl font-semibold text-primary mb-2">Community Support</h3>
              <p className="text-dark_text">Connecting donors with verified local causes to create real impact</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaUsers className="w-12 h-12 text-secondary mb-4"/>
              <h3 className="text-xl font-semibold text-primary mb-2">Transparent Giving</h3>
              <p className="text-dark_text">100% donation tracking with regular updates</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaShieldAlt className="w-12 h-12 text-secondary mb-4"/>
              <h3 className="text-xl font-semibold text-primary mb-2">Secure Platform</h3>
              <p className="text-dark_text">Bank-grade security for all transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-accent/10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">How HopeHub Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {title: "1. Create", text: "Start a verified campaign"},
              {title: "2. Share", text: "Spread awareness in your community"},
              {title: "3. Support", text: "Receive donations securely"},
              {title: "4. Impact", text: "Withdraw funds when goal is met"},
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-dark_text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Why Choose HopeHub</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">For Donors</h3>
              <ul className="list-disc pl-6 text-dark_text space-y-2">
                <li>Verified local campaigns</li>
                <li>Transparent fund tracking</li>
                <li>Tax-deductible donations</li>
                <li>Secure payment gateway</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">For Campaigners</h3>
              <ul className="list-disc pl-6 text-dark_text space-y-2">
                <li>Zero platform fees</li>
                <li>24/7 campaign support</li>
                <li>Social media integration</li>
                <li>Withdrawal protection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-secondary">85%</p>
            <p className="mt-2">Campaign Success Rate</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-secondary">10M+</p>
            <p className="mt-2">NPR Raised</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-secondary">500+</p>
            <p className="mt-2">Verified Campaigns</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-secondary">25K+</p>
            <p className="mt-2">Active Donors</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">Join the Movement</h2>
        <div className="flex justify-center gap-6">
          <button className="bg-secondary text-primary px-8 py-3 rounded-full font-semibold hover:bg-secondary/90 transition">
            Start a Campaign
          </button>
          <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-accent transition">
            Become a Donor
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;