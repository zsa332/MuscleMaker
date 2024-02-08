import {create} from 'zustand'

interface userId{
    userId : number | null
    setUserId : (userId : number) => void
}

const userIdStore = create<userId>((set)=>({
    userId : null,
    setUserId : (userId) => {

        set({userId : userId})
        
    }
}))

export default userIdStore;