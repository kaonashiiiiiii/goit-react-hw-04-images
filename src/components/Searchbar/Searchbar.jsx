import React, { useState } from 'react'
import styles from './searchbar.module.css'

const Searchbar = (props) => {
  const { onSubmit } = props

  const [value, setValue] = useState('')

  function onSubmitSearch (e) {
    e.preventDefault()
    if (value.length < 1) return
    onSubmit(value)
  }

  function onValueChange (e) {
    const query = e.target.value.toLowerCase().trim()
    setValue(query)
  }
  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={onSubmitSearch}>
        <button type="submit" className={styles['SearchForm-button']}>
          <span className={styles['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={styles['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={onValueChange}
        />
      </form>
    </header>
  )
}

export default Searchbar