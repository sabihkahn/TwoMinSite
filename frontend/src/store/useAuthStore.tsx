import { create } from 'zustand'
import apiClient from '../api/axiosapiinstance'
import {  useNavigate } from 'react-router-dom'

interface userAuth {
    User: any,
    setUser: (data: any) => void,
    isCheckingAuth: boolean,
    checkAuth: () => void
}
export const useAuthStore = create<userAuth>((set, get) => ({
    isCheckingAuth:true,
    User: null,
    setUser: async (data: any) => {
        set({ User: data })
    },

    checkAuth: async () => {
        await apiClient.get('/auth/user/check').then((data) => {
            set({ User: data.data.user })
            // navigate('/dashboard')
        }).catch(() => {
            // navigate("/login")
        }).finally(()=>{
            set({isCheckingAuth:false})
        })
    },

}))


