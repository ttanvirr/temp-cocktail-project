import { useCallback, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [cocktail, setCocktail] = useState(null)
  const fetchCocktail = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${id}`)
      const data = await response.json()
      if (data.drinks) {
        const {
          strDrink,
          strDrinkThumb,
          strCategory,
          strAlcoholic,
          strGlass,
          strInstructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = data.drinks[0]
        const newCocktail = {
          name: strDrink,
          image: strDrinkThumb,
          category: strCategory,
          info: strAlcoholic,
          glass: strGlass,
          instruction: strInstructions,
          ingredients: [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ],
        }
        setCocktail(newCocktail)
      } else {
        setCocktail(null)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [id])
  useEffect(() => {
    fetchCocktail()
  }, [id, fetchCocktail])

  if (loading) {
    return <Loading />
  }
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to show</h2>
  }
  const { name, image, category, info, glass, instruction, ingredients } =
    cocktail
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name} </h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instruction :</span>
            {instruction}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
