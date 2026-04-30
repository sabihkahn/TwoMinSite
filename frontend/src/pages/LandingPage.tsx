import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Rocket, Zap, ArrowRight, Users, Layout, ShieldCheck, Globe, PlayCircle } from 'lucide-react'
import Header from '../components/Header'

// Import Template Images
import darkblue from '../assets/webimg/darkblue.png'
import dark from '../assets/webimg/dark.png'
import defaultImg from '../assets/webimg/default.png'
import forest from '../assets/webimg/forest.png'
import gothic from '../assets/webimg/gothic.png'
import greenwoods from '../assets/webimg/greenwoods.png'
import neonfuture from '../assets/webimg/neonfuture.png'
import softglass from '../assets/webimg/softglass.png'

const LandingPage = () => {
  const navigate = useNavigate()

  // Centralized Navigation Function
  const goToDashboard = () => navigate('/dashboard');

  const templates = [
    { img: neonfuture, name: "Neon Future" },
    { img: darkblue, name: "Deep Ocean" },
    { img: softglass, name: "Soft Glass" },
    { img: gothic, name: "Gothic Noir" },
    { img: forest, name: "Forest Edge" },
    { img: dark, name: "Classic Dark" },
    { img: greenwoods, name: "Green Woods" },
    { img: defaultImg, name: "Standard" },
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-400 selection:text-black font-sans overflow-x-hidden">
      <Header />

      {/* Hero Section - Improved Mobile Padding */}
      <section className="pt-32 md:pt-48 pb-16 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-6 md:mb-8"
          >
            <Users size={14} className="text-yellow-400" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Trusted by <span className="text-white">11,000+</span> Community Members
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.95] md:leading-[0.9]"
          >
            Launch in <span className="text-yellow-400">Two</span> <br /> Minutes.
          </motion.h1>

          <motion.p 
            className="mt-6 md:mt-8 text-zinc-500 max-w-xl mx-auto font-bold text-sm md:text-lg uppercase tracking-tight px-4"
          >
            The world's fastest store engine. No complex setups. No coding. Just results.
          </motion.p>

          <motion.div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
            <button 
              onClick={goToDashboard}
              className="w-full sm:w-auto bg-yellow-400 text-black px-8 md:px-10 py-5 md:py-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-transform"
            >
              Build Your Store <Rocket size={20} />
            </button>
            <button 
              onClick={() => window.open('https://youtube.com/@sabihop36', '_blank')}
              className="w-full sm:w-auto bg-zinc-900 text-white border border-zinc-800 px-8 md:px-10 py-5 md:py-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-800 transition-colors"
            >
              Watch Demo <PlayCircle size={20} />
            </button>
          </motion.div>
        </div>

        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-yellow-400/10 blur-[80px] md:blur-[120px] rounded-full -z-10" />
      </section>

      {/* Stats - Responsive Grid */}
      <section className="py-12 md:py-20 border-y border-zinc-900 bg-zinc-950/30">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {[
            { label: "Active Stores", val: "500+" },
            { label: "Community", val: "11K+" },
            { label: "Page Speed", val: "99/100" },
            { label: "Success Rate", val: "100%" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <h4 className="text-4xl md:text-5xl font-black text-yellow-400 mb-1">{stat.val}</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates - Full Responsive Bento */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-6xl mx-auto mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="text-left">
            <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter">Premium Designs</h2>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-2">Responsive full-page architecture.</p>
          </div>
          <button 
            onClick={goToDashboard}
            className="text-yellow-400 font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2 hover:gap-4 transition-all"
          >
            Try These Templates <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {templates.map((temp, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="group relative bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-800"
            >
              <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                <img 
                  src={temp.img} 
                  alt={temp.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 sm:opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <span className="font-black uppercase italic tracking-tight text-base md:text-lg">{temp.name}</span>
                <button 
                   onClick={goToDashboard}
                   className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-black opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
                >
                  <Zap size={18} fill="currentColor" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Bento - Responsive Layout */}
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2 p-8 md:p-12 bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-end min-h-[250px] md:min-h-[350px]">
             <Globe size={32} className="text-yellow-400 mb-4 md:mb-6" />
             <h3 className="text-2xl md:text-4xl font-black uppercase italic">Custom Domains</h3>
             <p className="text-zinc-500 text-sm md:text-base font-medium mt-2">Connect your brand identity to a custom URL instantly.</p>
          </div>
          <div className="p-8 md:p-12 bg-yellow-400 text-black rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-end min-h-[250px] md:min-h-[350px]">
             <ShieldCheck size={32} className="mb-4 md:mb-6" />
             <h3 className="text-2xl md:text-4xl font-black uppercase italic">Secured</h3>
             <p className="font-bold text-sm md:text-base mt-2">SSL protection and secure manual payments as standard.</p>
          </div>
        </div>
      </section>

      {/* Responsive Final CTA */}
      <section className="py-20 md:py-32 px-4 md:px-6 text-center">
        <div className="bg-zinc-900 border border-zinc-800 max-w-4xl mx-auto rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 relative overflow-hidden">
          <h2 className="text-3xl md:text-6xl font-black uppercase italic mb-6 md:mb-10 relative z-10 leading-tight">
            Stop overthinking. <br /> Start <span className="text-yellow-400">Selling.</span>
          </h2>
          <button 
             onClick={goToDashboard}
             className="w-full sm:w-auto bg-white text-black px-10 md:px-14 py-5 md:py-7 rounded-full font-black uppercase tracking-[0.2em] text-sm md:text-base hover:bg-yellow-400 transition-colors relative z-10"
          >
            Get My Dashboard
          </button>
          <div className="absolute -bottom-20 -right-20 w-48 md:w-64 h-48 md:h-64 bg-yellow-400/10 blur-[60px] md:blur-[80px] rounded-full" />
        </div>
      </section>
    </div>
  )
}

export default LandingPage