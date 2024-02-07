import {create} from 'zustand'

interface userId{
    userId : number | null
    setUserId : (userId : string) => void
}

const useUserIdStore = create<userId>((set)=>({
    userId : null,
    setUserId : (userId) => {
        const parseAge = Number(userId);

        if(parseAge!=null){
            set({userId : parseAge})
        }
    }
}))

export default useUserIdStore;