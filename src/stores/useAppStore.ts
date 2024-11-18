import { create } from "zustand";
import { createRecepiSlice, RecepisSliceType } from "./recepiSlice";
import { devtools } from "zustand/middleware";
import {FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";




export const useAppStore = create<RecepisSliceType & FavoritesSliceType & NotificationSliceType>()( devtools ( (...a) => ({

    ...createRecepiSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)

})))