import {create} from 'zustand'

interface userId{
    userId : number | null
    setUserId : (userId : string) => void
}

const userIdStore = create<userId>((set)=>({
    userId : null,
    setUserId : (userId) => {
        const parseUserId = Number(userId);

        if(parseUserId!=null){
            set({userId : parseUserId})
        }
    }
}))

export default userIdStore;