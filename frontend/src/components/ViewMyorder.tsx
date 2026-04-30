import React, { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, User, MapPin, Phone, Mail, Package, ShieldCheck, Zap, Loader2 } from 'lucide-react'
import apiClient from '../api/axiosapiinstance'
import toast from 'react-hot-toast'

const ViewMyorder = () => {
    const navigate = useNavigate()
    const { webname, productid } = useParams()
    const location = useLocation()

    // Retrieve order data from navigation state
    const order = location.state?.orderData

    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const fetchProductDetails = useCallback(async () => {
        // Prevent API call if params are missing
        if (!webname || !productid) return;

        try {
            setLoading(true)
            const res = await apiClient.get(`/web/viewmyorder/${webname}/${productid}`)
            
            if (res.data.productdata && res.data.productdata.length > 0) {
                setProduct(res.data.productdata[0])
            } else {
                toast.error("Product details not found in database")
            }
        } catch (error: any) {
            console.error("Fetch Error:", error)
            toast.error(error.response?.data?.message || "Failed to sync product info")
        } finally {
            setLoading(false)
        }
    }, [webname, productid])

    useEffect(() => {
        if (webname && productid) {
            fetchProductDetails()
        }
    }, [fetchProductDetails, webname, productid])

    // If the "body" data (order) is missing because of a direct URL visit/refresh
    if (!order) return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
            <Package size={48} className="text-zinc-800 mb-4" />
            <h2 className="text-zinc-500 font-black uppercase tracking-widest mb-4">Order Session Expired</h2>
            <button 
                onClick={() => navigate(-1)}
                className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold uppercase text-xs transition-transform active:scale-95"
            >
                Return to Store
            </button>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-yellow-400 transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Back to Store Management</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Side: Order Manifest (From Navigation Body) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-2xl font-black uppercase tracking-tighter text-yellow-400 italic">Order Manifest</h2>
                            <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Confirmed</span>
                            </div>
                        </div>

                        <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-[2.5rem] backdrop-blur-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <ShieldCheck size={100} className="text-yellow-500" />
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-zinc-800 text-yellow-400 rounded-2xl border border-zinc-700"><User size={20} /></div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-1">Customer</p>
                                        <p className="text-lg font-bold text-zinc-100">{order.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-zinc-800 text-yellow-400 rounded-2xl border border-zinc-700"><MapPin size={20} /></div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-1">Shipping Destination</p>
                                        <p className="text-sm text-zinc-300 leading-relaxed max-w-[250px]">{order.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-zinc-800 text-yellow-400 rounded-2xl border border-zinc-700"><Phone size={20} /></div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-1">Direct Contact</p>
                                        <p className="text-sm text-zinc-200 font-mono tracking-tight">{order.phoneno}</p>
                                        <p className="text-[11px] text-zinc-500 flex items-center gap-1.5 mt-2 bg-zinc-950 w-fit px-2 py-0.5 rounded border border-zinc-800">
                                            <Mail size={12} className="text-yellow-500/50" /> {order.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Product Intelligence (From API) */}
                    <div className="lg:col-span-7 space-y-6">
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-white px-2">Product Sync</h2>

                        {loading ? (
                            <div className="h-[400px] flex flex-col items-center justify-center bg-zinc-900/10 border border-zinc-800/50 rounded-[3rem] border-dashed">
                                <Loader2 className="animate-spin text-yellow-400 mb-4" size={32} />
                                <span className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em]">Accessing Inventory Data...</span>
                            </div>
                        ) : product ? (
                            <div className="bg-zinc-900/20 border border-zinc-800/40 rounded-[3rem] overflow-hidden group hover:border-yellow-500/20 transition-all duration-500">
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <img
                                        src={product.productmainphoto}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        alt={product.productname}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                                    <div className="absolute bottom-6 left-8">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-yellow-400 text-black text-[9px] font-black px-3 py-1 rounded-md uppercase tracking-tighter shadow-xl">
                                                In Stock: {product.quantity}
                                            </span>
                                            <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-md uppercase border border-white/10 tracking-tighter">
                                                ID: {productid?.slice(-6)}
                                            </span>
                                        </div>
                                        <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{product.productname}</h3>
                                    </div>
                                </div>

                                <div className="p-8 space-y-8">
                                    <div className="relative">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Zap size={16} className="text-yellow-400" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Item Specifications</p>
                                        </div>
                                        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 shadow-inner">
                                            <p className="text-zinc-400 text-sm leading-relaxed italic">
                                                {product.productdescription || "No description provided."}
                                            </p>
                                        </div>
                                    </div>

                                    {product.productextraphotos?.length > 0 && (
                                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4 ml-2">Alternate Perspectives</p>
                                            <div className="grid grid-cols-3 gap-4">
                                                {product.productextraphotos.map((photo: any, i: number) => (
                                                    <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-400/50 transition-colors bg-zinc-950">
                                                        <img src={photo.imagesproduct} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Extra" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="p-20 text-center border-2 border-dashed border-zinc-900 rounded-[3rem] flex flex-col items-center">
                                <Package className="text-zinc-800 mb-4" size={48} />
                                <p className="text-zinc-600 font-black uppercase text-[10px] tracking-widest">Metadata Sync Failed</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewMyorder