import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="flex w-[340px] flex-col items-center rounded-xl bg-white p-6 shadow-xl">
        <h1 className="mb-6 text-4xl font-semibold text-cyan-600 drop-shadow-sm">
          TaskHub
        </h1>

        <div className="flex w-full flex-col gap-3 text-center">
          <Link
            to="/login"
            className="w-full rounded-md bg-cyan-500 py-2 font-medium text-white transition hover:bg-cyan-600 active:scale-95"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="w-full rounded-md border border-cyan-500 py-2 font-medium text-cyan-600 transition hover:bg-cyan-50 active:scale-95"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
