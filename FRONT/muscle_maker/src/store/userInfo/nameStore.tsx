import { create } from "zustand"

interface name{
    name : string
    setName : (name : string) => void
}

const nameStore = create<name>((set)=>({
    name : "",
    setName : (name) => {
        set((state) => ({name: name}))
    }
}))

export default nameStore;