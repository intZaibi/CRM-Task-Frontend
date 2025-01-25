import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = {
      fullName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://crm-task-backend-1.onrender.com/api/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form }),
      });

      if (response.ok) {
        router("/signIn");
      } else {
        const data = await response.json();
        setError(data.error);
        setTimeout(() => {
          setError(null);
          setLoading(false);
        }, 1500);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setTimeout(() => {
        setError(null);
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto bg-white border border-gray-300 rounded-2xl p-8">
        <h2 className="text-gray-800 text-center mb-4 text-2xl font-bold">
          Sign up
        </h2>

        <form onSubmit={handleSignUp}>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Full Name
              </label>
              <input
                name="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-[#00cc88]"
                placeholder="Full name"
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Email Id
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-[#00cc88]"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-[#00cc88]"
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-[#00cc88]"
                placeholder="Confirm password"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="!mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-[#00cc88] hover:bg-[#00cc88cf] focus:outline-none"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create an account"}
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Already have an account?{" "}
              <a
                href="/signIn"
                className="text-[#00cc88] font-semibold hover:underline ml-1"
              >
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
