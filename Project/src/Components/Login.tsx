import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/background.jpg"; 
import shesh from "../assets/shesh.png";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaFingerprint, FaEye, FaRegEyeSlash, FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user || { email }));
        navigate('/dashboard'); 
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="z-10 w-[90%] max-w-sm md:max-w-md bg-gray-900/90 flex flex-col items-center gap-6 p-8 rounded-2xl shadow-2xl border border-white/10">
        <img src={shesh} alt="Logo" className="w-20 h-auto object-contain" />
        <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Log In</h1>
        <p className="text-xs text-gray-400">
          Dont have an account? 
          <button onClick={() => navigate('/signup')} className="text-white text-xs active:scale-95 ml-1 hover:underline">Sign Up</button> 
        </p>
  
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div className="w-full flex items-center bg-gray-800/80 p-3 rounded-lg gap-3">
            <MdOutlineAlternateEmail className="text-gray-400" />
            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent w-full outline-none text-white text-sm" />
          </div>

          <div className="w-full flex items-center bg-gray-800/80 p-3 rounded-lg gap-3 relative">
            <FaFingerprint className="text-gray-400" />
            <input type={showPassword ? "text" : "password"} placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent w-full outline-none text-white text-sm" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-400">
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-2 active:scale-95 transition-all disabled:opacity-50">
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="relative w-full flex items-center justify-center py-2">
            <div className="flex-grow h-[1px] bg-gray-700"></div>
            <span className="text-xs px-3 text-gray-500 uppercase tracking-wider">Or</span>
            <div className="flex-grow h-[1px] bg-gray-700"></div>
          </div>

          <div className="relative w-full flex items-center justify-evenly py-2 gap-4">
            <div className="flex-1 flex justify-center p-3 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800"><FaFacebook className="text-white text-xl" /></div>
            <div className="flex-1 flex justify-center p-3 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800"><FaGoogle className="text-white text-xl" /></div>
            <div className="flex-1 flex justify-center p-3 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800"><FaTwitter className="text-white text-xl" /></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;