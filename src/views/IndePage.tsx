import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"



function IndePage() {

  const {drinks} = useAppStore()

  const hasDrinks = useMemo(() => drinks.drinks.length > 0 , [drinks])

  return (
    <div className="w-[90vw] mx-auto">
      <h1 className="text-6xl font-bold">Recetas</h1>
      {hasDrinks ?
      (<div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
          {drinks.drinks.map(drink =>(
            <DrinkCard
              key={drink.idDrink}
              drink = {drink}
            />
          ))}
      </div>)
       :  <p className="my-10 text-center text-xl">No hay resultados aún, usa el formulario para buscar Recetas</p> }
       
    </div>
  )
}

export default IndePage