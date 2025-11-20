import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="flex w-[340px] flex-col items-center rounded-xl bg-white shadow-xl p-6">
        
        <h1 className="text-4xl font-semibold text-cyan-600 drop-shadow-sm mb-6">
          TaskHub
        </h1>

        <div className="flex flex-col w-full text-center gap-3">
          <Link
            to="/login"
            className="w-full py-2 rounded-md bg-cyan-500 text-white font-medium transition hover:bg-cyan-600 active:scale-95"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="w-full py-2 rounded-md border border-cyan-500 text-cyan-600 font-medium transition hover:bg-cyan-50 active:scale-95"
          >
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}
