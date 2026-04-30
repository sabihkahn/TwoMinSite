import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Globe, Info, MapPin, Phone, Mail, Image as ImageIcon, CheckCircle2, Rocket, Loader2, Plus, Trash2, Upload, Map } from 'lucide-react'
import apiClient from '../api/axiosapiinstance'
import { uploadphoto } from '../cloudinary/cloudinary'
import toast from 'react-hot-toast'

// Theme Assets
import dark from '../assets/webimg/dark.png'
import darkblue from '../assets/webimg/darkblue.png'
import defaultimg from '../assets/webimg/default.png'
import forest from '../assets/webimg/forest.png'
import gothic from '../assets/webimg/gothic.png'
import greenwoods from '../assets/webimg/greenwoods.png'
import neonfuture from '../assets/webimg/neonfuture.png'
import softglass from '../assets/webimg/softglass.png'

const THEMES = [
    { id: 'default', img: defaultimg, label: 'Standard' },
    { id: 'dark', img: dark, label: 'Obsidian' },
    { id: 'neonfuture', img: neonfuture, label: 'Cyberpunk' },
    { id: 'softglass', img: softglass, label: 'Aero Glass' },
    { id: 'darkblue', img: darkblue, label: 'Deep Sea' },
    { id: 'forest', img: forest, label: 'Evergreen' },
    { id: 'greenwoods', img: greenwoods, label: 'Nature' },
    { id: 'gothic', img: gothic, label: 'Eldritch' },
]

const CreateWebsite = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState<{ logo: boolean, hero: boolean }>({ logo: false, hero: false })

    const [formData, setFormData] = useState({
        theme: 'default',
        shopname: '',
        shopdescription: '',
        shoplogo: '',
        shopemail: '',
        shopadress: '', // Added missing field
        phone: '',
        city: '',
        country: '',
        mapLocation: '',
        shophomepageimg: '',
        shoplinks: [{ link: '' }]
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleLinkChange = (index: number, value: string) => {
        const newLinks = [...formData.shoplinks]
        newLinks[index].link = value
        setFormData({ ...formData, shoplinks: newLinks })
    }

    const addLinkField = () => {
        if (formData.shoplinks.length >= 3) {
            toast.error("Maximum 3 links allowed")
            return
        }
        setFormData({ ...formData, shoplinks: [...formData.shoplinks, { link: '' }] })
    }

    const removeLinkField = (index: number) => {
        if (formData.shoplinks.length <= 1) {
            toast.error("At least one link is required")
            return
        }
        const filtered = formData.shoplinks.filter((_, i) => i !== index)
        setFormData({ ...formData, shoplinks: filtered })
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'hero') => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(prev => ({ ...prev, [type]: true }))
        const tId = toast.loading(`Uploading ${type}...`)

        try {
            const url = await uploadphoto(file)
            setFormData(prev => ({
                ...prev,
                [type === 'logo' ? 'shoplogo' : 'shophomepageimg']: url
            }))
            toast.success(`${type} uploaded successfully`, { id: tId })
        } catch (error) {
            toast.error(`Failed to upload ${type}`, { id: tId })
        } finally {
            setUploading(prev => ({ ...prev, [type]: false }))
        }
    }

    const validateForm = () => {
        if (!/^[a-zA-Z\s]+$/.test(formData.shopname)) {
            toast.error("Shop name must only contain letters")
            return false
        }
        if (!formData.shoplogo || !formData.shophomepageimg) {
            toast.error("Please upload both logo and hero images")
            return false
        }
        if (formData.shoplinks.some(l => !l.link.startsWith('http'))) {
            toast.error("All social links must be valid URLs")
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setLoading(true)
        try {
            await apiClient.post('/web/createWebsite', formData)
            toast.success("Store Initialized Successfully!")
            navigate('/dashboard')
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Internal Server Error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 md:p-12 font-sans selection:bg-yellow-400 selection:text-black">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-yellow-400">Creation Room</h1>
                        <p className="text-zinc-500 font-bold tracking-widest text-[10px] md:text-xs mt-2 uppercase">Establish your digital domain</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="p-4 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-all border border-zinc-800">
                        <ArrowLeft size={24} />
                    </button>
                </header>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* Left: Theme Grid */}
                    <div className="lg:col-span-5 order-2 lg:order-1">
                        <div className="lg:sticky lg:top-10 space-y-6">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-3">
                                <span className="text-yellow-400">01</span> Visual Aesthetic
                            </h2>
                            <div className="grid grid-cols-2 gap-4 max-h-[50vh] lg:max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                                {THEMES.map((t) => (
                                    <div 
                                        key={t.id}
                                        onClick={() => setFormData({ ...formData, theme: t.id })}
                                        className={`relative cursor-pointer rounded-3xl overflow-hidden border-2 transition-all duration-500 group ${
                                            formData.theme === t.id ? 'border-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.1)]' : 'border-zinc-900 opacity-40 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={t.img} alt={t.label} className="w-full aspect-square object-cover" />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                                        <div className="absolute bottom-4 left-4">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-md">{t.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Form Data */}
                    <div className="lg:col-span-7 space-y-12 order-1 lg:order-2">
                        <section className="space-y-8">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-3">
                                <span className="text-yellow-400">02</span> Core Configuration
                            </h2>

                            <div className="space-y-6 bg-zinc-900/20 border border-zinc-800 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] backdrop-blur-sm">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-2">Brand Name</label>
                                    <input name="shopname" required onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-yellow-400 outline-none transition-all font-bold" placeholder="EX: NEOKORE" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-2">Manifesto (Description)</label>
                                    <textarea name="shopdescription" required onChange={handleChange} rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:border-yellow-400 outline-none transition-all resize-none text-sm" placeholder="Tell the world your story..." />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <input type="file" id="logo-up" hidden onChange={(e) => handleFileUpload(e, 'logo')} />
                                        <label htmlFor="logo-up" className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-3xl cursor-pointer group-hover:border-yellow-400/50 transition-all bg-zinc-950">
                                            {formData.shoplogo ? (
                                                <img src={formData.shoplogo} className="w-16 h-16 rounded-lg object-cover" />
                                            ) : (
                                                <Upload className="text-zinc-700 group-hover:text-yellow-400" />
                                            )}
                                            <span className="text-[9px] font-black uppercase mt-3 text-zinc-500">Shop Logo</span>
                                        </label>
                                    </div>
                                    <div className="relative group">
                                        <input type="file" id="hero-up" hidden onChange={(e) => handleFileUpload(e, 'hero')} />
                                        <label htmlFor="hero-up" className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-3xl cursor-pointer group-hover:border-yellow-400/50 transition-all bg-zinc-950">
                                            {formData.shophomepageimg ? (
                                                <img src={formData.shophomepageimg} className="w-16 h-16 rounded-lg object-cover" />
                                            ) : (
                                                <ImageIcon className="text-zinc-700 group-hover:text-yellow-400" />
                                            )}
                                            <span className="text-[9px] font-black uppercase mt-3 text-zinc-500">Hero Image</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Social Links Section */}
                        <section className="space-y-6">
                            <div className="flex justify-between items-center px-4">
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500">
                                    <span className="text-yellow-400">03</span> Neural Links
                                </h2>
                                <button type="button" onClick={addLinkField} className="bg-yellow-400/10 p-2 rounded-lg text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all">
                                    <Plus size={20} />
                                </button>
                            </div>
                            
                            <div className="space-y-4 px-2">
                                {formData.shoplinks.map((linkObj, index) => (
                                    <div key={index} className="flex gap-3 animate-in slide-in-from-right-4 duration-300">
                                        <input 
                                            value={linkObj.link}
                                            required
                                            onChange={(e) => handleLinkChange(index, e.target.value)}
                                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-xs focus:border-yellow-400 outline-none" 
                                            placeholder="https://social-link.com/yourbrand"
                                        />
                                        <button type="button" onClick={() => removeLinkField(index)} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Physical Presence Section */}
                        <section className="space-y-8">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-3">
                                <span className="text-yellow-400">04</span> Physical Presence
                            </h2>
                            <div className="bg-zinc-900/20 border border-zinc-800 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-2">Base Email</label>
                                        <input name="shopemail" type="email" required onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm outline-none focus:border-yellow-400" placeholder="hq@brand.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-2">Phone</label>
                                        <input name="phone" required onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm outline-none focus:border-yellow-400" placeholder="+1 234..." />
                                    </div>
                                    
                                    {/* Added Address Field */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-2">Street Address</label>
                                        <input name="shopadress" required onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm outline-none focus:border-yellow-400" placeholder="123 Cyber Lane, Sector 7G" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-2">City</label>
                                            <input name="city" required onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm outline-none focus:border-yellow-400" placeholder="Tokyo" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-2">Country</label>
                                            <input name="country" required onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm outline-none focus:border-yellow-400" placeholder="Japan" />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-2">Map URL</label>
                                        <input name="mapLocation" required onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm outline-none focus:border-yellow-400" placeholder="Google Maps Link" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <button 
                            disabled={loading}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase tracking-[0.3em] py-8 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center gap-4 transition-all active:scale-95 disabled:opacity-50 group"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <>
                                    Launch Brand <Rocket size={24} className="group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateWebsite