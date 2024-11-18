import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"

type DrinkCardProps = {
    drink : Drink
}
function DrinkCard({drink} :DrinkCardProps) {

    const {selectRecepi} = useAppStore()

    const handleClick = (id : Drink["idDrink"]) =>{
        selectRecepi(id)
    }

  return (
    <div className = "boder shadow-lg">
    
        <div className="overflow-hidden">
            <img src={drink.strDrinkThumb} alt= {`Ìmagen de ${drink.strDrinkThumb}`} 
                className="hover:scale-125 transition-transform hover:rotate-2"
            />
        </div>
        <div className="p-5">
             <h2 className="text-2xl truncate font-bold">{drink.strDrink}</h2>
             <button
                type="button"
                onClick={() => handleClick(drink.idDrink)}
                className="bg-orange-500 hover:bg-orange-600 mt-5 w-full text-white p-2 font-bold"
             >Ver Receta</button>
        </div>

    </div>
  )
}

export default DrinkCard