import {create} from 'zustand'

interface gender{
    gender : boolean | null
    setGender : (gender : string) => void
}

const genderStore = create<gender>((set)=>({
    gender : null,
    setGender : (gender) => {
        var parseGender = true

        if(gender === 'male') parseGender=false

        set({gender:parseGender})
    }
}))

export default genderStore;