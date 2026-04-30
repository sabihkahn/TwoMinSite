import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeft, Upload, Loader2, Package, CheckCircle2,
    Plus, X, Image as ImageIcon, Sparkles,
    Trash2
} from 'lucide-react'
import { uploadphoto } from '../cloudinary/cloudinary'
import apiClient from '../api/axiosapiinstance'
import toast from 'react-hot-toast'
import { useDashboardStore } from '../store/useDashboardStore'

interface ExtraPhoto {
    imagesproduct: string;
}

const AddProduct = () => {
    const navigate = useNavigate()
    const { selectedWebsite } = useDashboardStore()

    const [formData, setFormData] = useState({
        productname: '',
        quantity: 0,
        price: 0,
        productdescription: '',
        productmainphoto: '',
        productextraphotos: [] as ExtraPhoto[]
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isUploadingExtra, setIsUploadingExtra] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validate = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.productname.trim()) newErrors.productname = "Name is required"
        if (formData.price <= 0) newErrors.price = "Price must be greater than 0" // <--- Add this
        if (formData.quantity < 0) newErrors.quantity = "Stock cannot be negative"
        if (!formData.productmainphoto) newErrors.productmainphoto = "Main image is required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const tId = toast.loading("Uploading primary image...")
        try {
            const url = await uploadphoto(file)
            setFormData(prev => ({ ...prev, productmainphoto: url }))
            setErrors(prev => ({ ...prev, productmainphoto: "" }))
            toast.success("Primary image linked", { id: tId })
        } catch (err) {
            toast.error("Upload failed", { id: tId })
        }
    }

    const handleExtraImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        // Prevention logic: check if adding these files exceeds the limit
        if (formData.productextraphotos.length + files.length > 3) {
            toast.error("Maximum 3 gallery images allowed")
            return
        }

        setIsUploadingExtra(true)
        const tId = toast.loading(`Uploading gallery...`)
        try {
            const uploadPromises = Array.from(files).map(file => uploadphoto(file))
            const urls = await Promise.all(uploadPromises)
            const newPhotos = urls.map(url => ({ imagesproduct: url }))
            setFormData(prev => ({
                ...prev,
                productextraphotos: [...prev.productextraphotos, ...newPhotos]
            }))
            toast.success("Gallery updated", { id: tId })
        } catch (err) {
            toast.error("Gallery upload failed", { id: tId })
        } finally {
            setIsUploadingExtra(false)
        }
    }

    const removeExtraPhoto = (index: number) => {
        setFormData(prev => ({
            ...prev,
            productextraphotos: prev.productextraphotos.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        setIsSubmitting(true)
        try {
            await apiClient.post('/web/createproduct', {
                productdata: formData,
                webname: selectedWebsite?.shopname,
                webid: selectedWebsite?.shopid
            })
            toast.success("Product published!")
            navigate(-1)
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Server error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 p-4 md:p-8 font-sans selection:bg-yellow-500/30">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-zinc-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all active:scale-90"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-tighter text-white flex items-center gap-2">
                                New Artifact <Sparkles className="text-yellow-500" size={24} />
                            </h1>
                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">Deploying to: <span className="text-yellow-500/80">{selectedWebsite?.shopname || "Unknown"}</span></p>
                        </div>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Media Management - Left */}
                    <div className="lg:col-span-5 space-y-8">
                        <section className="bg-zinc-900/20 border border-zinc-800/50 p-6 rounded-[2.5rem] backdrop-blur-sm">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-6 px-2">Primary Visual</label>

                            <label className={`relative group cursor-pointer aspect-square rounded-[2rem] border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-500
                                ${errors.productmainphoto ? 'border-red-500/50 bg-red-500/5' : 'border-zinc-800 hover:border-yellow-500/50 hover:bg-yellow-500/5'}`}>

                                {formData.productmainphoto ? (
                                    <img src={formData.productmainphoto} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className="text-center space-y-2">
                                        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                                            <Upload className="text-zinc-600 group-hover:text-yellow-400" size={28} />
                                        </div>
                                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Upload Main Image</p>
                                    </div>
                                )}
                                <input type="file" className="hidden" accept="image/*" onChange={handleMainImageUpload} />
                            </label>
                            {errors.productmainphoto && <p className="text-red-500 text-[10px] mt-4 font-black uppercase text-center">{errors.productmainphoto}</p>}
                        </section>
                        {/* Price Field */}
                        <div className="group/input">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-3 ml-2 group-focus-within/input:text-yellow-500 transition-colors">
                                Price (USD)
                            </label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-yellow-500 font-bold">$</span>
                                <input
                                    type="number"
                                    className={`w-full bg-zinc-900/50 border ${errors.price ? 'border-red-500/50' : 'border-zinc-800 group-focus-within/input:border-yellow-500/50'} rounded-2xl p-5 pl-10 text-sm outline-none transition-all shadow-inner`}
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                            {errors.price && <p className="text-red-500 text-[9px] mt-2 font-bold uppercase ml-2 italic">{errors.price}</p>}
                        </div>

                        <section className="bg-zinc-900/20 border border-zinc-800/50 p-6 rounded-[2.5rem]">
                            <div className="flex justify-between items-center mb-6 px-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Gallery (Max 3)</label>
                                <span className="text-[10px] font-bold text-yellow-500/50">{formData.productextraphotos.length}/3</span>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {formData.productextraphotos.map((photo, index) => (
                                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 group animate-in fade-in zoom-in duration-300">
                                        <img src={photo.imagesproduct} className="w-full h-full object-cover" alt="" />
                                        <button
                                            type="button"
                                            onClick={() => removeExtraPhoto(index)}
                                            className="absolute top-2 right-2 p-1.5 bg-black/80 backdrop-blur-md text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}

                                {formData.productextraphotos.length < 3 && (
                                    <label className="aspect-square rounded-2xl border-2 border-dashed border-zinc-800 hover:border-yellow-500/30 flex flex-col items-center justify-center cursor-pointer bg-zinc-900/40 transition-all group">
                                        {isUploadingExtra ? (
                                            <Loader2 className="animate-spin text-yellow-500" size={20} />
                                        ) : (
                                            <Plus size={24} className="text-zinc-700 group-hover:text-yellow-500 transition-colors" />
                                        )}
                                        <input type="file" className="hidden" accept="image/*" multiple onChange={handleExtraImageUpload} disabled={isUploadingExtra} />
                                    </label>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Form Fields - Right */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-zinc-900/10 border border-zinc-800/40 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[80px] rounded-full pointer-events-none"></div>

                            <div className="space-y-8 relative z-10">
                                <div className="group/input">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-3 ml-2 group-focus-within/input:text-yellow-500 transition-colors">Product Identity</label>
                                    <input
                                        type="text"
                                        className={`w-full bg-zinc-900/50 border ${errors.productname ? 'border-red-500/50' : 'border-zinc-800 group-focus-within/input:border-yellow-500/50'} rounded-2xl p-5 text-sm outline-none transition-all shadow-inner`}
                                        placeholder="Ex: Obsidian Shard V2"
                                        value={formData.productname}
                                        onChange={(e) => setFormData({ ...formData, productname: e.target.value })}
                                    />
                                    {errors.productname && <p className="text-red-500 text-[9px] mt-2 font-bold uppercase ml-2 italic">{errors.productname}</p>}
                                </div>

                                <div className="group/input">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-3 ml-2 group-focus-within/input:text-yellow-500 transition-colors">Supply Count</label>
                                    <div className="relative">
                                        <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-yellow-500" size={20} />
                                        <input
                                            type="number"
                                            className="w-full bg-zinc-900/50 border border-zinc-800 group-focus-within/input:border-yellow-500/50 rounded-2xl p-5 pl-14 text-sm outline-none transition-all shadow-inner"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>

                                <div className="group/input">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-3 ml-2 group-focus-within/input:text-yellow-500 transition-colors">Lore / Description</label>
                                    <textarea
                                        rows={6}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 group-focus-within/input:border-yellow-500/50 rounded-3xl p-5 text-sm outline-none transition-all resize-none shadow-inner"
                                        placeholder="Describe the essence of this product..."
                                        value={formData.productdescription}
                                        onChange={(e) => setFormData({ ...formData, productdescription: e.target.value })}
                                    />
                                </div>

                                <button
                                    disabled={isSubmitting || isUploadingExtra}
                                    type="submit"
                                    className="w-full group/btn relative bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase py-6 rounded-[2rem] flex items-center justify-center gap-3 transition-all active:scale-[0.97] overflow-hidden disabled:opacity-50"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                                    {isSubmitting ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>Deploy Product <CheckCircle2 size={22} /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    )
}

export default AddProduct