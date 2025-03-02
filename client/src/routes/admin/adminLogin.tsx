// client/src/routes/admin/adminLogin.tsx
import React, { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "react-hot-toast"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/adminLogin")({
  component: adminLogin,
})

function adminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Check against static admin credentials
    if (username === "theAdmin1" && password === "admin10") {
      // You might store an admin flag in localStorage or in a global store
      localStorage.setItem("isAdmin", "true")
      toast.success("Admin logged in successfully!")
      navigate({ to: "/admin/AdminDashboard" })
    } else {
      toast.error("Invalid admin credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-off_white font-sans">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Admin Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:opacity-90 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default adminLogin;
