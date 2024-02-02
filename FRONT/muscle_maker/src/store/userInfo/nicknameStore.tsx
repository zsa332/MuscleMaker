import {create} from 'zustand'

interface nickname{
    nickname : string
    setNickname : (nickname : string) => void
}

const nicknameStore = create<nickname>((set)=>({
    nickname : '',
    setNickname : (nickname) => {
        set({nickname : nickname})
    }
}))

export default nicknameStore;