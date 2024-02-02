import {create} from 'zustand'

interface address{
    address : string
    setAddress : (address : string) => void
}

const addressStore = create<address>((set)=>({
    address : '',
    setAddress : (address) => {
        set({address : address})
    }
}))

export default addressStore;