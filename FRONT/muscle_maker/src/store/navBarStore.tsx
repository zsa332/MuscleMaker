import {create} from 'zustand'

interface navBar{
    navBar : string
    setNavBar : (navBar : string) => void
}

const navBarStore = create<navBar>((set)=>({
    navBar : "feed",
    setNavBar : (navBar) => {
        set((state) => ({navBar: navBar}))
    }
}))

export default navBarStore;