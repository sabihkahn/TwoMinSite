import React, { useState, useEffect } from 'react'
import { useDashboardStore } from '../../store/useDashboardStore'
import apiClient from '../../api/axiosapiinstance'
import toast from 'react-hot-toast'
import { Search, Plus, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { nav } from 'framer-motion/client'

interface HeaderProps {
    onRefresh: () => void;
}

const Headerdashboard = ({ onRefresh }: HeaderProps) => {
    const { total, setWebsites } = useDashboardStore()
    const [isSearching, setIsSearching] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()
    // Automatically show all websites if search input is cleared
    useEffect(() => {
        if (searchValue.trim() === "") {
            onRefresh();
        }
    }, [searchValue, onRefresh]);

    const handleSearch = async () => {
        if (!searchValue.trim()) {
            onRefresh();
            return;
        }
        
        setIsSearching(true)
        try {
            const res = await apiClient.post(`/data/searchweb?webname=${searchValue}`)
            // Ensure we set an empty array if no results found to avoid undefined errors
            setWebsites(res.data.websites || [])
            if (res.data.websites?.length === 0) {
                toast.error("No matching websites found")
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Search failed")
        } finally {
            setIsSearching(false)
        }
    }

    function handelclick(){
navigate('/dashboard/createwebsite')
    }
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Websites</h1>
                <p className="text-gray-500 text-sm mt-1">
                    You are managing <span className="text-yellow-400 font-bold">{total}</span> digital assets
                </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                    <input 
                        type="text" 
                        placeholder="Search your shops..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition-all"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button 
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:opacity-50 transition-all"
                    >
                        {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                    </button>
                </div>

                <button onClick={handelclick} className="bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-all flex items-center gap-2 whitespace-nowrap">
                    <Plus size={18} />
                    <span>Create Web</span>
                </button>
            </div>
        </div>
    )
}

export default Headerdashboard