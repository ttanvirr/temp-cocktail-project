import React, { useRef } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext()
  const searchInput = useRef(null)
  const searchCoctail = () => {
    // console.log(searchInput.current.value)
    setSearchTerm(searchInput.current.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favourite coctail</label>
          <input
            type="text"
            id="name"
            ref={searchInput}
            onChange={searchCoctail}
            placeholder="Search..."
            autoComplete="off"
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
