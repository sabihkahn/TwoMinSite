import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Send, Zap, MessageCircle } from 'lucide-react'

const Footer = () => {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  const quickLinks = [
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Features', path: '/features' },
    { name: 'Dashboard', path: '/dashboard' },
  ]

  return (
    <footer className="bg-[#050505] border-t border-zinc-900 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-black font-black italic">2</div>
              <span className="text-xl font-black uppercase italic tracking-tighter">Min Site</span>
            </div>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs">
              Empowering the next generation of brands with the world's fastest store engine.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/sabih_khan.dev" target="_blank" className="p-3 bg-zinc-900 rounded-xl text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 transition-all">
                <Box size={18} />
              </a>
              <a href="https://youtube.com/@sabihop36" target="_blank" className="p-3 bg-zinc-900 rounded-xl text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 transition-all">
                <Box size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-6">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => navigate(link.path)}
                    className="text-sm font-bold text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Support */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-6">Support</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-bold text-zinc-400">
                <MessageCircle size={16} className="text-yellow-400" />
                <span>+92 324 6310698</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-zinc-400">
                <Zap size={16} className="text-yellow-400" />
                <span>Multan, Pakistan</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="bg-zinc-900/50 p-6 rounded-[2rem] border border-zinc-800">
            <h4 className="text-sm font-black uppercase italic mb-4">Join the Community</h4>
            <p className="text-xs text-zinc-500 font-medium mb-6">Get notified about new templates and features.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-yellow-400 text-black py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              Start Free <Send size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">
            © {year} 2Min Site. All rights reserved.
          </p>
          <div className="flex gap-8">
            <button className="text-zinc-600 text-[10px] font-black uppercase tracking-widest hover:text-white">Privacy</button>
            <button className="text-zinc-600 text-[10px] font-black uppercase tracking-widest hover:text-white">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer