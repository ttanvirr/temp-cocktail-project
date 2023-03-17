import { useState, useContext, useEffect, createContext } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('a')
  const [cocktails, setCocktails] = useState([])

  const fetchCocktails = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()
      const { drinks } = data
      if (drinks) {
        const newCocktails = drinks.map((cocktail) => {
          const { idDrink, strDrink, strAlcoholic, strDrinkThumb, strGlass } =
            cocktail
          return {
            id: idDrink,
            name: strDrink,
            alcoholic: strAlcoholic,
            image: strDrinkThumb,
            glass: strGlass,
          }
        })
        setCocktails(newCocktails)
      } else {
        setCocktails([])
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm])
  useEffect(() => {
    fetchCocktails()
  }, [searchTerm, fetchCocktails])
  return (
    <AppContext.Provider value={{ loading, setSearchTerm, cocktails }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
