import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Rocket, ShieldCheck, Smartphone, MessageCircle, CreditCard, ArrowRight } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "250",
      desc: "Perfect for small shops just getting started.",
      features: ["Upload up to 20 products", "Full access to store tools", "Basic product management", "Mobile-ready storefront", "Standard support"],
      icon: <Zap size={24} />,
      color: "zinc-800"
    },
    {
      name: "Growth",
      price: "300",
      desc: "Best for growing businesses with a wider catalog.",
      features: ["Upload up to 50 products", "Everything in Starter", "Enhanced product management", "Faster updates & performance", "Priority support"],
      icon: <Rocket size={24} />,
      color: "yellow-400",
      popular: true
    },
    {
      name: "Pro",
      price: "500",
      desc: "Built for serious sellers and expanding brands.",
      features: ["Upload up to 100 products", "Everything in Growth", "Large catalog support", "Optimized performance", "Priority assistance"],
      icon: <ShieldCheck size={24} />,
      color: "zinc-800"
    }
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-400 selection:text-black font-sans pb-20">
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-yellow-400">Scale Your Brand</h1>
          <p className="text-zinc-500 font-bold tracking-[0.4em] uppercase text-xs mt-4">Simple pricing. No hidden fees. Just results.</p>
        </motion.div>
      </section>

      {/* Plans Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-8 rounded-[3rem] border ${plan.popular ? 'border-yellow-400 bg-zinc-900/50' : 'border-zinc-800 bg-zinc-900/20'} flex flex-col justify-between`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</span>
            )}
            
            <div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${plan.popular ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-yellow-400'}`}>
                {plan.icon}
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-2">{plan.name}</h3>
              <p className="text-zinc-500 text-sm font-medium mb-6">{plan.desc}</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-sm font-black text-zinc-500 uppercase">PKR</span>
                <span className="text-5xl font-black">{plan.price}</span>
                <span className="text-zinc-500 font-bold">/mo</span>
              </div>

              <div className="space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                    <Check size={16} className="text-yellow-400" /> {feature}
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => window.open('https://wa.me/923246310698', '_blank')}
              className={`w-full mt-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${plan.popular ? 'bg-yellow-400 text-black hover:bg-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
            >
              Get Started
            </button>
          </motion.div>
        ))}
      </section>

      {/* Payment Information Card */}
      <section className="max-w-5xl mx-auto px-6 mt-24">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-[3rem] p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black uppercase italic mb-6">Payment Method</h2>
              <p className="text-zinc-400 font-medium mb-8">All payments are handled manually for maximum accessibility and simplicity.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                  <CreditCard className="text-yellow-400" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-zinc-500">JazzCash Account</p>
                    <p className="font-bold text-lg">03006354512</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                  <MessageCircle className="text-green-500" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-zinc-500">WhatsApp Confirmation</p>
                    <p className="font-bold text-lg">03246310698</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-400 rounded-[2rem] p-8 text-black">
              <h3 className="font-black uppercase tracking-tight text-xl mb-6">How it works</h3>
              <div className="space-y-6">
                {[
                  "Choose your perfect plan",
                  "Send payment via JazzCash",
                  "Share payment screenshot on WhatsApp",
                  "Your plan gets activated instantly"
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="w-6 h-6 rounded-full bg-black text-yellow-400 flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</span>
                    <p className="font-bold leading-tight">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 px-8">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-yellow-400">
                <Smartphone size={20} />
              </div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Billed Monthly • Upgrade Anytime</p>
           </div>
           <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Activation after confirmation</p>
        </div>
      </section>

      {/* Simple Footer CTA */}
      <section className="mt-32 text-center px-6">
        <h2 className="text-4xl font-black uppercase italic mb-8">Focus on selling, <span className="text-yellow-400">not setup.</span></h2>
        <button className="bg-zinc-100 text-black px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform flex items-center gap-3 mx-auto">
          Start Your Store <ArrowRight size={20} />
        </button>
      </section>
    </div>
  )
}

export default Pricing