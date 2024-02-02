import {create} from 'zustand'

interface age{
    age : number | null
    setAge : (age : string) => void
}

const ageStore = create<age>((set)=>({
    age : null,
    setAge : (age) => {
        const parseAge = Number(age);

        if(parseAge!=null){
            set({age : parseAge})
        }
    }
}))

export default ageStore;