import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Code2, Heart, Send, Coffee, Terminal, Users, Box, BoxSelectIcon } from 'lucide-react'

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-400 selection:text-black font-sans pb-20">
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-yellow-400"
          >
            The Architect
          </motion.h1>
          <p className="text-zinc-500 font-bold tracking-[0.4em] uppercase text-xs mt-4">Behind the 2Min Site Engine</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Profile Card */}
        <div className="lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[3rem] sticky top-32"
          >
            <div className="w-24 h-24 bg-yellow-400 rounded-3xl mb-8 flex items-center justify-center text-black">
              <Terminal size={40} strokeWidth={3} />
            </div>
            
            <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Sabih ur Rehman</h2>
            <p className="text-yellow-400 font-bold uppercase tracking-widest text-xs mb-6">Software Developer</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 text-zinc-400">
                <MapPin size={18} className="text-yellow-400" />
                <span className="text-sm font-medium">Multan, Pakistan</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <Code2 size={18} className="text-yellow-400" />
                <span className="text-sm font-medium">Full-Stack Architecture</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <Coffee size={18} className="text-yellow-400" />
                <span className="text-sm font-medium">Problem Solver</span>
              </div>
            </div>

            {/* SOCIAL LINKS UPDATED */}
            <div className="flex gap-4">
               <button 
                onClick={() => window.location.href = 'mailto:your-email@example.com'}
                className="flex-1 bg-white text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-yellow-400 transition-colors"
               >
                  Contact
               </button>
               <div className="flex gap-2">
                 <a 
                    href="https://www.instagram.com/sabih_khan.dev?igsh=Mmx1NHJ3YWxweHpt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-zinc-800 rounded-2xl hover:text-yellow-400 transition-all"
                 >
                    <Box size={18}/>
                 </a>
                 <a 
                    href="https://youtube.com/@sabihop36?si=tvP87WAzdgejjQOD" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-zinc-800 rounded-2xl hover:text-yellow-400 transition-all"
                 >
                    <BoxSelectIcon size={18}/>
                 </a>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Story Content */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase italic tracking-tight text-zinc-200">The Vision</h3>
              <p className="text-zinc-400 leading-relaxed text-lg">
                I built <strong>2Min Site</strong> with a simple goal: to make launching a website as fast and effortless as possible. I’ve seen too many people with great ideas struggle because building a site felt complicated, slow, or expensive. I wanted to change that.
              </p>
            </div>

            {/* YOUTUBE FOLLOWER STATS BOX */}
            <div className="p-8 bg-zinc-900 border-2 border-yellow-400/20 rounded-[2.5rem] flex items-center gap-6 group hover:border-yellow-400 transition-colors">
              <div className="p-4 bg-yellow-400 rounded-2xl text-black group-hover:scale-110 transition-transform">
                <Users size={32} />
              </div>
              <div>
                <h4 className="text-3xl font-black text-white">11K+</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Subscribers on YouTube</p>
              </div>
            </div>

            <div className="p-8 bg-yellow-400 rounded-[2.5rem] text-black">
              <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                <Heart size={20} fill="currentColor" /> Local Roots, Global Tools
              </h3>
              <p className="font-bold leading-relaxed">
                Living and working in Multan has shaped how I think about technology. I’ve seen how small businesses often don’t have access to expensive tools. That’s why I focused on building something lightweight and practical.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase italic tracking-tight text-zinc-200">Continuous Growth</h3>
              <p className="text-zinc-400 leading-relaxed text-lg">
                2Min Site isn’t just a project—it’s a journey I’m continuously refining based on real user needs. Every feature is built with intention: <strong>simplicity, speed, and usability.</strong>
              </p>
              <p className="text-zinc-500 font-black uppercase tracking-widest text-sm pt-4 italic">
                — Sabih ur Rehman
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 border border-zinc-800 rounded-3xl">
                <h4 className="text-yellow-400 font-black text-3xl mb-1">Zero</h4>
                <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Code Required</p>
             </div>
             <div className="p-6 border border-zinc-800 rounded-3xl">
                <h4 className="text-yellow-400 font-black text-3xl mb-1">100%</h4>
                <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Focused on Speed</p>
             </div>
          </div>
        </div>
      </section>

      {/* Footer CTA UPDATED TO DASHBOARD */}
      <section className="mt-32 px-6">
        <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 text-center">
          <h2 className="text-3xl font-black uppercase italic mb-6">Want to be part of the journey?</h2>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-yellow-400 text-black px-10 py-5 rounded-full font-black uppercase tracking-widest flex items-center gap-3 mx-auto hover:scale-105 transition-transform"
          >
            Launch Your Store <Send size={18} />
          </button>
        </div>
      </section>
    </div>
  )
}

export default About