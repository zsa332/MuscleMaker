import {create} from 'zustand'

interface email{
    email : string
    setEmail : (email : string) => void
}

const emailStore = create<email>((set)=>({
    email : "",
    setEmail : (email) => {
        set((state) => ({email: email}))
    }
}))

export default emailStore;