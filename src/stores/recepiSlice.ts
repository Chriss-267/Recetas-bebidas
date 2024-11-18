import { StateCreator } from "zustand"
import { getCategories, getRecepiById, getRecepis } from "../services/RecepiService"
import { Categories, Drink, Drinks, Recepi, SearchFilter } from "../types"
import { FavoritesSliceType } from "./favoritesSlice"



export type RecepisSliceType = {
    categories : Categories
    drinks : Drinks
    selectedRecepi : Recepi
    modal : boolean
    fetchCategories: () => Promise<void>   
    searchRecepi: (searchFilter : SearchFilter) => Promise<void> 
    selectRecepi: (id : Drink["idDrink"]) => Promise<void>
    closeModal : () => void
}

export const createRecepiSlice : StateCreator<RecepisSliceType & FavoritesSliceType, [], [], RecepisSliceType>  = (set) =>({

    categories : {
        drinks : []
    },
    drinks :{
        drinks: []
    },
    selectedRecepi :{} as Recepi,
    modal : false,
    fetchCategories : async () =>{
        const categories = await getCategories()
        set ({
            categories
        })
    },
    searchRecepi : async (searchFilter) =>{
        const drinks = await getRecepis(searchFilter)
        set({
            drinks
        })
        
    },
    selectRecepi : async (id) =>{
       const selectedRecepi =  await getRecepiById(id)
       set({
            selectedRecepi,
            modal : true
       })
        
    },
    closeModal : () =>{
        set({
            modal : false,
            selectedRecepi :{} as Recepi
        })
    }
})