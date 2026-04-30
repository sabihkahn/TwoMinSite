import React from 'react'
import { Rocket, Palette, Package, Image as ImageIcon, ClipboardList, Smartphone, LayoutDashboard, Zap, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const Feature = () => {
  const coreFeatures = [
    {
      title: "Instant Store Creation",
      desc: "Spin up a fully functional website in minutes. Add your shop name, description, logo, and you’re live.",
      icon: <Rocket className="text-yellow-400" size={28} />,
    },
    {
      title: "Beautiful Themes",
      desc: "Pick from modern, ready-made designs that instantly give your brand a polished, professional look.",
      icon: <Palette className="text-yellow-400" size={28} />,
    },
    {
      title: "Product Management",
      desc: "Add products with images, descriptions, and stock in seconds. Expand your catalog without complexity.",
      icon: <Package className="text-yellow-400" size={28} />,
    },
    {
      title: "Image-First Experience",
      desc: "Upload high-quality images for products and homepages to create a visually rich shopping experience.",
      icon: <ImageIcon className="text-yellow-400" size={28} />,
    },
    {
      title: "Order Tracking",
      desc: "Keep track of customer orders directly from your dashboard. Organized for total clarity.",
      icon: <ClipboardList className="text-yellow-400" size={28} />,
    },
    {
      title: "Mobile-Ready",
      desc: "Your store looks great on phones, tablets, and desktops automatically—no extra work needed.",
      icon: <Smartphone className="text-yellow-400" size={28} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-400 selection:text-black font-sans pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-yellow-400/10 to-transparent blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-yellow-400 text-xs font-black tracking-widest uppercase mb-8"
          >
            <Zap size={14} fill="currentColor" /> 2Min Site Evolution
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-[0.9]"
          >
            Launch in <span className="text-yellow-400 underline decoration-zinc-800">minutes</span>, <br /> not days.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-zinc-400 text-lg font-medium leading-relaxed"
          >
            A fast, no-friction platform that lets anyone create a complete, branded online store without writing a single line of code.
          </motion.p>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800 hover:border-yellow-400/50 transition-all duration-500 flex flex-col justify-between min-h-[300px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center border border-zinc-800 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-zinc-100">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">{f.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Large Dashboard Highlight Feature */}
          <motion.div className="md:col-span-2 lg:col-span-3 p-10 rounded-[3rem] bg-zinc-900/30 border border-zinc-800 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative group">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-block p-3 bg-yellow-400 text-black rounded-2xl">
                <LayoutDashboard size={32} />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter italic">All-in-one Dashboard</h2>
              <p className="text-zinc-400 text-lg">Manage your store, products, and orders from a single interface designed for speed and clarity. No setup headaches, no technical barriers.</p>
              <button className="flex items-center gap-2 text-yellow-400 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                Explore Dashboard <ArrowRight size={16} />
              </button>
            </div>
            <div className="lg:w-1/2 h-64 w-full bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl relative overflow-hidden">
               {/* Decorative dashboard element */}
               <div className="absolute top-4 left-4 right-4 h-8 bg-zinc-900 rounded-lg animate-pulse" />
               <div className="absolute top-16 left-4 w-1/3 h-32 bg-zinc-900 rounded-lg animate-pulse delay-75" />
               <div className="absolute top-16 right-4 w-1/2 h-32 bg-zinc-900 rounded-lg animate-pulse delay-150" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Built For Section */}
      <section className="py-20 px-6 bg-yellow-400 text-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
            Built for <br /> builders.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
            {[
              { label: "Small business owners", sub: "Launch without a large team." },
              { label: "Creators and sellers", sub: "Monetize your passion fast." },
              { label: "Idea Explorers", sub: "Test markets in minutes." },
              { label: "Non-Tech Founders", sub: "Zero code, total control." }
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-black pl-6 py-2">
                <h4 className="font-black uppercase text-xl">{item.label}</h4>
                <p className="font-bold opacity-70 text-sm">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-8">Ready to go live?</h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-zinc-100 text-black px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] flex items-center gap-4 mx-auto"
        >
          Create Your Store <Rocket fill="currentColor" />
        </motion.button>
      </section>
    </div>
  )
}

export default Feature