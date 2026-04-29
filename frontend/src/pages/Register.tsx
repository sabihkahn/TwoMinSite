import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Command, ArrowRight, Loader2, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import apiClient from '../api/axiosapiinstance';
import toast from 'react-hot-toast';

const Register = () => {
  // Added name state for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

      await apiClient.post(`/auth/user/register`, { name, email, password })
    .then((res) => {
      toast.success(res.data.message || "Account created successfully!");
      navigate('/dashboard');
    })
    .catch((err) => {
      const errorMessage = err.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    })
    .finally(() => {
      setLoading(false);
    });

      const userdata = await apiClient.get('auth/user/check')
      setUser(userdata.data.user);
      
    } catch (error) {
      console.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-yellow-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white p-2 rounded-lg mb-4">
            <Command size={28} className="text-black" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Create an account</h2>
          <p className="text-gray-400 text-sm mt-2">
            Join us today to get started
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label className="block text-[12px] font-medium uppercase tracking-wider text-gray-500 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-black border border-white/10 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-gray-700"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium uppercase tracking-wider text-gray-500 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-black border border-white/10 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-gray-700"
              />
            </div>

            <div>
              <label className="text-[12px] font-medium uppercase tracking-wider text-gray-500 mb-2 block">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-2.5 rounded-md text-sm flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>Sign Up <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold hover:text-yellow-400 transition">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
