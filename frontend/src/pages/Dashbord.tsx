import React, { useEffect, useCallback } from 'react'
import apiClient from '../api/axiosapiinstance'
import { useDashboardStore } from '../store/useDashboardStore'
import LoadingComponent from '../components/Loadingcomponent'
import toast from 'react-hot-toast'
import Headerdashboard from '../components/Dashbordcomponents/Headerdashboard'
import { Globe, ArrowRight } from 'lucide-react'

const Dashbord = () => {
  const { setTotal, setWebsites, websites, setLoading, loading } = useDashboardStore()

  // Use callback to prevent unnecessary re-renders in Header useEffect
  const FetchWebsitesDashbord = useCallback(async () => {
    try {
      const res = await apiClient.get('/data/dashboard')
      setTotal(res.data.userdata.totalwebsites)
      setWebsites(res.data?.userdata?.websites)
    } catch (err: any) {
      console.log(err)
      toast.error(err.response?.data?.message || "Failed to load data")
    } finally {
      setLoading(false)
    }
  }, [setTotal, setWebsites, setLoading])

  useEffect(() => {
    setLoading(true)
    FetchWebsitesDashbord()
  }, [FetchWebsitesDashbord, setLoading])

  const handleWebsiteClick = (web: any) => {
    console.log("Selected Website Data:", web)
    window.open(`${import.meta.env.VITE_BASE_URL}/web/mywebsite/${web.shopname}`)
  }

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-8 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Pass the fetch function to the header */}
        <Headerdashboard onRefresh={FetchWebsitesDashbord} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites && websites.length > 0 ? (
            websites.map((web: any) => (
              <div
                key={web.shopid}
                onClick={() => handleWebsiteClick(web)}
                className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/[0.05] hover:border-yellow-400/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="size-12 bg-yellow-400 rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(250,204,21,0.2)] overflow-hidden relative">
                    {web?.shoplogo ? (
                      <img
                        src={web.shoplogo}
                        alt="logo"
                        className="size-full object-cover rounded-xl"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    {/* Z-index used to ensure text shows if img is missing/hidden */}
                    <span className="absolute">
                      {web?.shopname ? web.shopname[0].toUpperCase() : "?"}
                    </span>
                  </div>
                  <div className="text-gray-600 group-hover:text-yellow-400 transition-colors">
                    <Globe size={20} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {web?.shopname || "Unnamed Store"}
                </h3>

                <div className="flex items-center text-gray-500 text-sm font-medium mt-4">
                  Manage Store <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
              <p className="text-gray-500">No websites found match your search.</p>
              <button 
                onClick={FetchWebsitesDashbord} 
                className="mt-4 text-yellow-400 hover:underline text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashbord