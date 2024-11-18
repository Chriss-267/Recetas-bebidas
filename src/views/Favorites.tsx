import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"



function Favorites() {

  const {favorites} = useAppStore()
  const hasFavorites = useMemo(() => favorites.length , [favorites])

  return (
    <div className="mx-auto w-[90vw]">
        <h1 className="text-6xl font-bold">Favoritos</h1>

        {hasFavorites ? (
          <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
          {favorites.map(drink =>(
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
        ) : (
          
        <p className="my-10 text-center">Los Favoritos se mostrarán aquí</p>
        )
      }
    </div>
  )
}

export default Favorites