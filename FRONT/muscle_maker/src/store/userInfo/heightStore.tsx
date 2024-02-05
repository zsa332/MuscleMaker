import {create} from 'zustand'

interface height{
    height : number | null
    setHeight : (height : string) => void
}

const heightStore = create<height>((set)=>({
    height : null,
    setHeight : (height) => {
        const parseHeight = Number(height);

        if(parseHeight!=null){
            set({height : parseHeight})
        }
    }
}))

export default heightStore;