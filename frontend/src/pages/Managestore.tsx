import React, { useEffect, useState } from 'react'
import { useDashboardStore } from '../store/useDashboardStore'
import { useNavigate } from 'react-router-dom'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import {
    Package, ShoppingCart, Link, Boxes, ArrowLeft, User, MapPin,
    Phone, Trash2, Plus, Palette, Loader2, Settings, Save, Globe
} from 'lucide-react'
import apiClient from '../api/axiosapiinstance'
import toast from 'react-hot-toast'

const Managestore = () => {
    const navigate = useNavigate()
    const { analytics, setorders, setproducts, orders, products, selectedWebsite, setSelectedWebsite } = useDashboardStore()

    const [isUpdatingTheme, setIsUpdatingTheme] = useState(false)
    const [isUpdatingStore, setIsUpdatingStore] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    // Local state for the update form
    const [editData, setEditData] = useState<any>(null)

    const themes = ["default", "forest", "dark", "greenwoods", "softglass", "neonfuture", "darkblue", "gothic"]

    useEffect(() => {
        if (!analytics) {
            navigate('/dashboard')
        } else if (selectedWebsite) {
            setEditData({ ...selectedWebsite })
        }
    }, [analytics, selectedWebsite, navigate])

    const fetchproduct = async () => {
        try {
            const res = await apiClient.get(`/web/getproductsandorders/${analytics.shopName}`)
            setorders(res.data.orders)
            setproducts(res.data.products)
        } catch (error: any) {
            toast.error("Failed to fetch store items")
        }
    }

    // --- UPDATE WEBSITE LOGIC ---
    const handleUpdateStore = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUpdatingStore(true)
        const tId = toast.loading("Updating store configuration...")
        try {
            await apiClient.put(`/web/updatewebsite/${analytics.shopName}`, editData)
            toast.success("Store updated successfully", { id: tId })
            setSelectedWebsite(editData) // Sync zustand store
            setShowSettings(false)
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Update failed", { id: tId })
        } finally {
            setIsUpdatingStore(false)
        }
    }

    // --- DELETE WEBSITE LOGIC ---
    const handleDeleteWebsite = async () => {
        const confirm = window.confirm(`DANGER: Are you sure you want to delete "${analytics.shopName}"? This will remove all products and orders permanently.`)
        if (!confirm) return

        const tId = toast.loading("Deconstructing digital domain...")
        try {
            await apiClient.delete(`/web/deletewebsite/${analytics.shopName}`)
            toast.success("Website deleted successfully", { id: tId })
            navigate('/dashboard')
        } catch (error: any) {
            toast.error("Failed to delete website", { id: tId })
        }
    }

    const handleThemeChange = async (newTheme: string) => {
        setIsUpdatingTheme(true)
        const tId = toast.loading(`Applying ${newTheme} aesthetic...`)
        try {
            await apiClient.put('/web/updatetheme', {
                webname: analytics.shopName,
                newtheme: newTheme
            })
            toast.success("Theme updated", { id: tId })
        } catch (error: any) {
            toast.error("Theme update failed", { id: tId })
        } finally {
            setIsUpdatingTheme(false)
        }
    }

    const handleDeleteProduct = async (productId: string) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await apiClient.delete(`/web/deleteproduct/${analytics.shopName}/${productId}`);
            toast.success("Product removed");
            fetchproduct();
        } catch (error) {
            toast.error("Delete failed");
        }
    }

    useEffect(() => {
        if (analytics?.shopName) fetchproduct()
    }, [analytics?.shopName])

    if (!analytics || !editData) return null

    const chartData = [
        { name: 'Products', value: analytics.totalProducts },
        { name: 'Orders', value: analytics.totalOrders },
        { name: 'Links', value: analytics.totallinks },
        { name: 'Stock', value: analytics.totalStockQuantity },
    ]

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-yellow-400 italic">Store Terminal</h1>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Active System: <span className="text-white">{analytics.shopName}</span></p>
                        </div>
                    </div>

                    <div className='flex flex-wrap items-center gap-3 w-full xl:w-auto'>
                        {/* Theme Dropdown */}
                        <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 group hover:border-yellow-400/50 transition-all">
                            <Palette size={16} className="text-yellow-400 mr-2" />
                            <select
                                disabled={isUpdatingTheme}
                                onChange={(e) => handleThemeChange(e.target.value)}
                                className="bg-transparent text-xs font-black uppercase tracking-widest outline-none cursor-pointer pr-4"
                                defaultValue={analytics.theme || "default"}
                            >
                                {themes.map(t => <option key={t} value={t} className="bg-zinc-900">{t}</option>)}
                            </select>
                        </div>

                        {/* Settings Toggle */}
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={`p-2.5 rounded-full border transition-all ${showSettings ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-yellow-400'}`}
                        >
                            <Settings size={20} className={isUpdatingStore ? "animate-spin" : ""} />
                        </button>

                        <div className="h-8 w-[1px] bg-zinc-800 mx-1 hidden sm:block"></div>

                        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
                            <ArrowLeft size={16} /> Hub
                        </button>

                        <button onClick={() => navigate('/dashboard/managestore/addproducts')} className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all">
                            <Plus size={16} />
                        </button>
                    </div>
                </header>

                {/* --- UPDATE MODAL / SECTION --- */}
                {showSettings && (
                    <div className="mb-12 bg-zinc-900/80 border-2 border-yellow-400/30 rounded-[2.5rem] p-8 backdrop-blur-md animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black uppercase tracking-widest text-yellow-400">Core Matrix Override</h2>
                            <button onClick={handleDeleteWebsite} className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-500/10 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all">
                                <Trash2 size={14} /> Terminate Brand
                            </button>
                        </div>

                        <form onSubmit={handleUpdateStore} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Description</label>
                                    <textarea
                                        value={editData.shopdescription}
                                        onChange={(e) => setEditData({ ...editData, shopdescription: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-sm focus:border-yellow-400 outline-none h-32 resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Email</label>
                                        <input value={editData.shopemail} onChange={(e) => setEditData({ ...editData, shopemail: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Phone</label>
                                        <input value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs outline-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Address</label>
                                    <input value={editData.shopadress} onChange={(e) => setEditData({ ...editData, shopadress: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">City</label>
                                        <input value={editData.city} onChange={(e) => setEditData({ ...editData, city: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-zinc-500 ml-2">Country</label>
                                        <input value={editData.country} onChange={(e) => setEditData({ ...editData, country: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs outline-none" />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-400 text-black font-black uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all mt-2"
                                >
                                    <Save size={18} /> Update Configuration
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard icon={<Package />} label="Inventory" value={analytics.totalProducts} />
                    <StatCard icon={<ShoppingCart />} label="Orders" value={analytics.totalOrders} />
                    <StatCard icon={<Link />} label="Shortlinks" value={analytics.totallinks} />
                    <StatCard icon={<Boxes />} label="Total Stock" value={analytics.totalStockQuantity} />
                </div>

                {/* Analytics & Products Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                            <h2 className="text-xl font-bold text-yellow-400 uppercase tracking-widest mb-6">Visual Metrics</h2>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 11 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 11 }} />
                                        <Tooltip cursor={{ fill: 'rgba(251, 191, 36, 0.05)' }} contentStyle={{ backgroundColor: '#18181b', borderRadius: '12px', border: '1px solid #3f3f46' }} />
                                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                                            {chartData.map((_, index) => <Cell key={index} fill={index % 2 === 0 ? '#fbbf24' : '#f59e0b'} />)}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black uppercase text-yellow-400 mb-4 tracking-tighter">Live Products</h2>
                            <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-4">
                                {products?.map((product: any) => (
                                    <div key={product._id} className="group bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex gap-4 h-fit relative">
                                        <button onClick={() => handleDeleteProduct(product._id)} className="absolute top-2 right-2 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14} /></button>
                                        <img src={product.productmainphoto} alt="" className="w-20 h-20 object-cover rounded-xl border border-zinc-700" />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-sm text-white truncate">{product.productname}</h3>
                                            <p className="text-zinc-500 text-[10px] line-clamp-2">{product.productdescription}</p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-yellow-400 text-[10px] font-black uppercase">Qty: {product.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Orders Sidebar */}
                    <div className="lg:col-span-1 h-full">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden sticky top-8">
                            <div className="bg-yellow-400 p-5">
                                <h2 className="text-black font-black uppercase tracking-tighter flex items-center gap-2 text-lg">
                                    <ShoppingCart size={20} strokeWidth={3} /> Recent Orders
                                </h2>
                            </div>
                            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                                {orders?.length > 0 ? (
                                    orders.map((order: any) => (
                                        <div key={order._id} onClick={() => navigate(`/dashboard/managestore/vieworder/${analytics.shopName}/${order.productid}`, {
                                            state: { orderData: order }
                                        })} className="p-5 border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors cursor-pointer">
                                            <p className="font-bold text-sm text-zinc-100 flex items-center gap-2"><User size={14} className="text-yellow-400" /> {order.name}</p>
                                            <p className="text-zinc-500 text-[10px] mt-2 flex items-center gap-2"><MapPin size={12} /> {order.location}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 text-center text-zinc-600 text-[10px] font-black uppercase">No Orders</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) => (
    <div className="group bg-zinc-900 border border-zinc-800 p-6 rounded-3xl hover:border-yellow-500/50 transition-all">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 group-hover:text-yellow-400">{label}</p>
                <p className="text-3xl font-black text-white tabular-nums">{value.toLocaleString()}</p>
            </div>
            <div className="p-2.5 bg-zinc-800 rounded-2xl text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                {icon}
            </div>
        </div>
    </div>
)

export default Managestore