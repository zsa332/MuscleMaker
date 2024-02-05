import { create } from "zustand"

interface password{
    password : string
    setPassword : (password : string) => void
}

const passwordStore = create<password>((set)=>({
    password : "",
    setPassword : (password) => {
        set((state) => ({password: password}))
    }
}))

export default passwordStore;