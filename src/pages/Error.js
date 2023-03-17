import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section className="section error-page">
      <div className="error-container">
        <h2>Oops! It's A Dead End</h2>
        <Link className="btn btn-primary" to="/">
          back to home
        </Link>
      </div>
    </section>
  )
}

export default Error
