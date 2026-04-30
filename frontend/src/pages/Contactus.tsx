import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle, Mail, MapPin, Loader2, CheckCircle2, Box } from 'lucide-react'
import toast from 'react-hot-toast'
import apiClient from '../api/axiosapiinstance'

const Contact = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Constructing the query parameters as required by your GET route
        const subject = `Contact Form: ${formData.name} (${formData.email})`
        const text = formData.message

        try {
            // Backend endpoint: /mail/send?subject=...&text=...
            await apiClient.get(`/mail/send`, {
                params: { subject, text }
            })
            
            toast.success("Message transmitted successfully!")
            setFormData({ name: '', email: '', message: '' })
        } catch (error: any) {
            toast.error("Transmission failed. Please use WhatsApp.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-400 selection:text-black font-sans pb-20">
            
            {/* Header */}
            <section className="pt-32 pb-16 px-6 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-yellow-400">Get In Touch</h1>
                    <p className="text-zinc-500 font-bold tracking-[0.4em] uppercase text-xs mt-4">Direct channels to the 2Min Site HQ</p>
                </motion.div>
            </section>

            <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Side: Contact Info & Social Proof */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[3rem] space-y-8">
                        <div>
                            <h3 className="text-xl font-black uppercase italic mb-6">Direct Channels</h3>
                            <div className="space-y-4">
                                <a 
                                    href="https://wa.me/923246310698" 
                                    target="_blank" 
                                    className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-green-500/50 transition-all group"
                                >
                                    <div className="p-3 bg-green-500/10 text-green-500 rounded-xl group-hover:bg-green-500 group-hover:text-white transition-all">
                                        <MessageCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">WhatsApp Business</p>
                                        <p className="font-bold text-sm">+92 324 6310698</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                                    <div className="p-3 bg-yellow-400/10 text-yellow-400 rounded-xl">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Location</p>
                                        <p className="font-bold text-sm">Multan, Pakistan</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* YouTube Proof Box */}
                        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-[2rem] flex items-center gap-4">
                            <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
                                <Box size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-lg">11K+ Community</h4>
                                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-tight">Watching our growth on YouTube</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="lg:col-span-7">
                    <form onSubmit={handleSubmit} className="bg-zinc-900/20 border border-zinc-800 p-8 md:p-12 rounded-[3rem] space-y-6 backdrop-blur-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-2">Your Name</label>
                                <input 
                                    name="name" 
                                    required 
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-yellow-400 outline-none transition-all text-sm font-bold" 
                                    placeholder="Sabih ur Rehman" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-2">Email Address</label>
                                <input 
                                    name="email" 
                                    type="email" 
                                    required 
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-yellow-400 outline-none transition-all text-sm font-bold" 
                                    placeholder="contact@example.com" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-2">Message</label>
                            <textarea 
                                name="message" 
                                required 
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-yellow-400 outline-none transition-all text-sm resize-none font-medium" 
                                placeholder="How can we help your brand grow?" 
                            />
                        </div>

                        <button 
                            disabled={loading}
                            className="w-full bg-yellow-400 hover:bg-white text-black font-black uppercase tracking-[0.3em] py-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 group"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <>
                                    Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Contact