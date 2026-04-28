import { create } from 'zustand'

interface userAuth{
    User:any,
    setUser:(data:any)=> void
}

const useStore = create<userAuth>((set,get) => ({
User:null,

setUser:async (data:any) =>{
set({User:data})
}

}))

export default useStore
