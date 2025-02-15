import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "../stores";
import { Link } from "@tanstack/react-router";

// Create your route if using file-based routing:
export const Route = createFileRoute("/")({
  component: HomePage,
});
function HomePage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f8f7e8]">
      {/* Hero section */}
      <section className="rounded-2xl relative w-[95%] bg-[#09442d] text-white overflow-hidden pt-16 pb-24 h-[650px] max-w-[1350px]">
        {/* Left decorative shape - kept */}
        <div
          className="absolute top-0 left-0 w-60 h-60 bg-[#b9ff66] rounded-full"
          style={{ transform: "translate(-30%, -30%)" }}
        ></div>

        {/* Right decorative shape - kept */}
        <div
          className="absolute bottom-6 right-14 w-48 h-48 bg-[#b9ff66] rounded-tl-[100%]"
          style={{ transform: "translate(30%, 30%)" }}
        ></div>

        {/* Content container with centered alignment */}
        <div className="max-w-7xl mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl text-[#f8f7e8] md:text-7xl font-bold mb-6">
            Fundraising, simplified
          </h1>
          <p className="mb-8 text-xl md:text-2xl text-[#f8f7e8]">
            Build intelligent fundraising campaigns
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <Link
              to="/start"
              className="bg-[#b9ff66] text-[#09442d] font-semibold px-6 py-3 rounded hover:opacity-80 transition"
            >
              Start Fundraising
            </Link>
            <Link
              to="/learn"
              className="bg-white text-[#09442d] font-semibold px-6 py-3 rounded hover:opacity-80 transition"
            >
              Find out more
            </Link>
          </div>
        </div>
      </section>

      {/* Example content area */}
      {/* <section className="bg-[#f8f7e8] text-[#333] py-10">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center">
            {isLoggedIn
              ? "You're logged in!"
              : "You're not logged in. Sign up or log in to start a hope."}
          </p>
        </div>
      </section> */}
    </main>
  );
}