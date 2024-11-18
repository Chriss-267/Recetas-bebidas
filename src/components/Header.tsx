import { useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"




function Header() {

    //pathName es para saber en que pagina esta "/" "/favoritos"
    const location = useLocation()

    const isHome = useMemo(() => location.pathname === "/", [location.pathname])

    const {fetchCategories, categories, searchRecepi, showNotification} = useAppStore()

    const [searchFilter, setSearchFilter] = useState({
        ingredient : "",
        category : ""
    })


    const handleChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) =>{
        setSearchFilter({
            ...searchFilter,
            [e.target.name] : e.target.value
        })
        
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(Object.values(searchFilter).includes("")){
            showNotification({text : "Todos los campos son obligatorios", error: true})
            return
            
        }
        searchRecepi(searchFilter)

    }

    useEffect(() =>{
        fetchCategories()
    }, [])


  return (
    <header className= {isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}>

        <div className="container mx-auto px-16 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="/logo.svg" alt="logo" className="w-32" />
                    </div>

                    <nav className="flex gap-4">
                        {/**NavLink permite para resaltar en q pagina estamos */}
                        <NavLink to= "/"
                            className = {({isActive}) =>
                                isActive ? "border-b-2 border-orange-500 text-white font-bold" : "text-white font-bold"
                            
                            }
                        >Inicio</NavLink>
                        <NavLink to= "/favoritos"
                            className = {({isActive}) =>
                                isActive ? "border-b-2 border-orange-500 text-white font-bold" : "text-white font-bold"
                            
                            }
                        >Favoritos</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form className="md:w-1/2 2xl:w-1/3 bg-white/10 backdrop-blur-md rounded-lg shadow-lg space-y-6 my-10 p-10"
                    onSubmit={handleSubmit}
                    >   
                        
                        <div className="space-y-4">
                            <label htmlFor="ingredient"
                                className="block text-white font-extrabold text-lg"
                            >Nombre o Ingedientes</label>

                            <input type="text"
                                onChange={handleChange}
                                value={searchFilter.ingredient}
                                id="ingredient"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingrediente. Ej, Vodka, Tequila, Café"
                            />
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="category"
                                className="block text-white font-extrabold text-lg"
                            >Categoria</label>

                            <select 
                                onChange={handleChange}
                                value={searchFilter.category}
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                
                            >
                                <option value="">--Seleccione--</option>
                                {categories.drinks.map(categories =>(
                                    <option value={categories.strCategory} key={categories.strCategory}>{categories.strCategory}</option>
                                ))}
                                
                            </select>
                        </div>
                        <input type="submit"
                        value="Buscar Recetas"
                        className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white p-2 w-full rounded-lg font-bold"

                        />
                    </form>

                )}
        </div>

    </header>
  )
}

export default Header