import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Signup submitted", { email, password });
    // For now, we'll just log a success message
    alert("Signup successful! (This is a demo)");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full h-full bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Left side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center mb-6">
              Sign up for Fundraising
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Join our community and start making a difference today!
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {error && (
                <div className="p-3 text-red-700 bg-red-50 rounded-lg">
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Right side - Image */}
          <div className="w-full md:w-1/2 relative min-h-[500px]">
            <img
              className="w-full h-full object-cover absolute inset-0"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
              alt="Community helping together"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Make a Difference
              </h2>
              <p className="text-lg md:text-xl max-w-[500px] mx-auto">
                Your contribution can change lives. Join us in our mission to
                create positive change in the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}