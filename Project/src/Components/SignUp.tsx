import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/background.jpg"; 
import shesh from "../assets/shesh.png";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaFingerprint, FaEye, FaRegEyeSlash } from "react-icons/fa";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        alert("Account created!");
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="z-10 w-[90%] max-w-sm md:max-w-md bg-gray-900/90 flex flex-col items-center gap-6 p-8 rounded-2xl shadow-2xl border border-white/10">
        <img src={shesh} alt="Logo" className="w-20 h-auto object-contain" />
        <h1 className="text-2xl font-bold text-white">Sign Up</h1>
        <p className="text-xs text-gray-400">
          Already have an account? 
          <button onClick={() => navigate('/')} className="text-white text-xs active:scale-95 ml-1 hover:underline">Log In</button>
        </p>

        <form onSubmit={handleSignUp} className="w-full flex flex-col gap-4">
          <div className="w-full flex items-center bg-gray-800/80 p-3 rounded-lg gap-3">
            <MdOutlineAlternateEmail className="text-gray-400" />
            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent w-full outline-none text-white" />
          </div>

          <div className="w-full flex items-center bg-gray-800/80 p-3 rounded-lg gap-3 relative">
            <FaFingerprint className="text-gray-400" />
            <input type={showPassword ? "text" : "password"} placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent w-full outline-none text-white" />
          </div>

          <div className={`w-full flex items-center bg-gray-800/80 p-3 rounded-lg gap-3 relative border ${confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-transparent'}`}>
            <FaFingerprint className="text-gray-400" />
            <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-transparent w-full outline-none text-white" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-400">
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="text-red-500 text-[10px] text-center">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-2 active:scale-95">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;