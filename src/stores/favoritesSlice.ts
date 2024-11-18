import { StateCreator } from "zustand";
import { Recepi } from "../types";
import { createRecepiSlice, RecepisSliceType } from "./recepiSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";


export type FavoritesSliceType = {
    favorites: Recepi[]
    handleClickFavorite : (recepi: Recepi) => void
    favoriteExists : (id : Recepi["idDrink"]) => boolean,
    loadFromStorage : () => void
}

//usar estados y acciones de otros slices & RecepiSliceType, [], [], FavoriteSliceType
export const createFavoritesSlice : StateCreator <FavoritesSliceType & RecepisSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites : [],
    handleClickFavorite : (recepi) =>{
        // con get() se obtiene state
       if(get().favoriteExists(recepi.idDrink)){
            // si existe se elimina con filter
            set((state) =>({
                favorites : state.favorites.filter( favorite => favorite.idDrink !== recepi.idDrink)
            }))

            createNotificationSlice(set, get, api).showNotification({ text: "Se eliminó de favoritos", error : false})
       } else{
        set((state) => ({
            favorites : [...state.favorites, recepi]
        }))

        createNotificationSlice(set, get, api).showNotification({ text: "Se agregó a favoritos", error : false})

       }

       createRecepiSlice(set, get, api).closeModal()
       localStorage.setItem("favoritos", JSON.stringify(get().favorites))
    },

    favoriteExists : (id) =>{
        return get().favorites.some(favorites => favorites.idDrink === id)
    },
    //funcion para recuperar del local storage y ponerlos a favoritos
    loadFromStorage : () =>{
        const storedFavorites = localStorage.getItem("favoritos")
        if(storedFavorites){
            set({
                favorites : JSON.parse(storedFavorites)
            })
        }
    }
})