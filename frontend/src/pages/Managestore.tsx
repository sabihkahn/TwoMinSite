import React, { useEffect } from 'react'
import { useDashboardStore } from '../store/useDashboardStore'
import { useNavigate } from 'react-router-dom'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts'
import { Package, ShoppingCart, Link, Boxes, ArrowLeft, User, MapPin, Phone, Trash2 } from 'lucide-react'
import apiClient from '../api/axiosapiinstance'
import toast from 'react-hot-toast'

const Managestore = () => {
    const navigate = useNavigate()
    const { analytics, setorders, setproducts, orders, products } = useDashboardStore()

    useEffect(() => {
        if (!analytics) {
            navigate('/dashboard')
        }
    }, [analytics, navigate])

    const fetchproduct = async () => {
        try {
            const res = await apiClient.get(`/web/getproductsandorders/${analytics.shopName}`)
            setorders(res.data.orders)
            setproducts(res.data.products)
        } catch (error: any) {
            console.log(error)
            toast.error(error.response?.data?.message || "Cant get products")
        }
    }

    // New Delete Function
    const handleDeleteProduct = async (productId: string) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        const loadingToast = toast.loading("Deleting product...");
        try {
            const res = await apiClient.delete(`/web/deleteproduct/${analytics.shopName}/${productId}`);
            toast.success(res.data.message || "Product deleted", { id: loadingToast });
            
            // Refresh local state to remove the deleted product
            fetchproduct(); 
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to delete product", { id: loadingToast });
        }
    }

    useEffect(() => {
        if (analytics?.shopName) fetchproduct()
    }, [analytics?.shopName])

    if (!analytics) return null

    const chartData = [
        { name: 'Products', value: analytics.totalProducts },
        { name: 'Orders', value: analytics.totalOrders },
        { name: 'Links', value: analytics.totallinks },
        { name: 'Stock', value: analytics.totalStockQuantity },
    ]

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 font-sans">
            <style>
                {`
                    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: #09090b; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #fbbf24; border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #f59e0b; }
                `}
            </style>

            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-yellow-400">Store Management</h1>
                        <p className="text-zinc-400 font-medium">Shop: <span className="text-white underline decoration-yellow-500 underline-offset-4">{analytics.shopName}</span></p>
                    </div>
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-bold transition-all active:scale-95 w-fit">
                        <ArrowLeft size={18} /> Back to Hub
                    </button>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard icon={<Package />} label="Inventory" value={analytics.totalProducts} />
                    <StatCard icon={<ShoppingCart />} label="Orders" value={analytics.totalOrders} />
                    <StatCard icon={<Link />} label="Shortlinks" value={analytics.totallinks} />
                    <StatCard icon={<Boxes />} label="Total Stock" value={analytics.totalStockQuantity} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                            <h2 className="text-xl font-bold text-yellow-400 uppercase tracking-widest mb-6 text-center lg:text-left">Analytics</h2>
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
                                    <div key={product._id} className="group bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex gap-4 h-fit relative overflow-hidden">
                                        
                                        {/* Delete Button Overlay */}
                                        <button 
                                            onClick={() => handleDeleteProduct(product._id)}
                                            className="absolute top-2 right-2 p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all duration-300 z-10 opacity-50 group-hover:opacity-100 border border-red-500/20"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                        <img src={product.productmainphoto} alt={product.productname} className="w-20 h-20 object-cover rounded-xl border border-zinc-700 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-base text-white leading-tight truncate">{product.productname}</h3>
                                            <p className="text-zinc-500 text-[10px] line-clamp-2 mt-1">{product.productdescription}</p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="bg-yellow-400/10 text-yellow-400 text-[10px] font-black px-2 py-0.5 rounded uppercase border border-yellow-400/20">Qty: {product.quantity}</span>
                                                <span className="text-zinc-500 text-[10px] font-medium uppercase">{product.reviews?.length || 0} Reviews</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 h-full">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden sticky top-8">
                            <div className="bg-yellow-400 p-5">
                                <h2 className="text-black font-black uppercase tracking-tighter flex items-center gap-2 text-lg">
                                    <ShoppingCart size={20} strokeWidth={3} /> Recent Orders
                                </h2>
                            </div>
                            <div className="max-h-[650px] overflow-y-auto custom-scrollbar bg-zinc-900/50">
                                {orders?.length > 0 ? (
                                    orders.map((order: any) => (
                                        <div key={order._id} className="p-5 border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/20 transition-colors">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-400 border border-zinc-700 shadow-lg">
                                                    <User size={16} />
                                                </div>
                                                <p className="font-bold text-sm tracking-tight text-zinc-100">{order.name}</p>
                                            </div>
                                            <div className="space-y-2 ml-12">
                                                <p className="text-zinc-400 text-[11px] leading-relaxed flex items-start gap-2 italic">
                                                    <MapPin size={12} className="text-yellow-400 shrink-0 mt-0.5" /> {order.location}
                                                </p>
                                                <p className="text-zinc-400 text-[11px] flex items-center gap-2">
                                                    <Phone size={12} className="text-yellow-400 shrink-0" /> {order.phoneno}
                                                </p>
                                                <div className="pt-1">
                                                    <span className="text-yellow-400/60 text-[9px] font-black uppercase tracking-widest">{order.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 text-center text-zinc-600 text-xs font-bold uppercase tracking-widest">No orders yet</div>
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
    <div className="group bg-zinc-900 border border-zinc-800 p-6 rounded-3xl hover:border-yellow-500/50 transition-all duration-500 hover:shadow-[0_0_20px_rgba(251,191,36,0.05)]">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1 group-hover:text-yellow-400 transition-colors">{label}</p>
                <p className="text-3xl font-black text-white tabular-nums tracking-tighter leading-none">{value.toLocaleString()}</p>
            </div>
            <div className="p-2.5 bg-zinc-800 rounded-2xl text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-500 border border-zinc-700/50 group-hover:rotate-12">
                {icon}
            </div>
        </div>
    </div>
)

export default Managestore