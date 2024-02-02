import {create} from 'zustand'

interface weight{
    weight : number | null
    setWeight : (weight : string) => void
}

const weightStore = create<weight>((set)=>({
    weight : null,
    setWeight : (weight) => {
        const parseWeight = Number(weight);

        if(parseWeight!=null){
            set({weight : parseWeight})
        }
    }
}))

export default weightStore;