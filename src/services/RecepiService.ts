import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../schemas/recepi-schema"
import { Drink, SearchFilter } from "../types";




export async function getCategories (){

    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    const {data} = await axios.get(url)
    const result = CategoriesAPIResponseSchema.safeParse(data);

    if(result.success){
        return result.data
        
    }

}

export async function getRecepis(filter : SearchFilter){
   
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter.category}&i=${filter.ingredient}`
    const {data} = await axios.get(url)
    const result = DrinksAPIResponse.safeParse(data)

    if(result.success){
        return result.data
        
    }
    
}

export async function getRecepiById(id : Drink["idDrink"]) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios.get(url)
    console.log(data);
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])

    if(result.success){
        return result.data
    }
    
}