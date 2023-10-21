import React, { useEffect, useState } from 'react'
import styles from './app.module.css'
import usePixabayService from 'services/PixabayService'
import { Button, ImageGallery, Loader, Modal, Searchbar } from 'components'

const App = () => {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [perPage] = useState(12)
  const { getImages, loading, error } = usePixabayService()
  const [isOpen, setIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [totalHits, setTotalHits] = useState(0)
  const [result, setResult] = useState(0)

  useEffect(() => {
    if (query) {
      doSearch()
    }
    
    // eslint-disable-next-line
  }, [query, page])
  async function doSearch () {
    const params = {
      page: page,
      per_page: perPage,
      q: query
    }
    const data = await getImages(params)
    if (data.hits.length === 0) {
      alert('No images were found by this query!')
      return
    }
    return onImagesLoaded(data)
  }

  function onImagesLoaded (data) {
    setImages((prevImages) => [...prevImages, ...data.hits])
    setResult(page * perPage)
    setTotalHits(data.totalHits)
  }

  function loadMore () {
    setPage((page) => page + 1)
  }

  function initInputData (query) {
    setQuery(query)
    setPage(1)
    setImages([])
  }

  function openModal (image) {
    setIsOpen(true)
    setCurrentImage(image)
  }

  function closeModal () {
    setIsOpen(false)
    setCurrentImage(null)
  }

  const spinner = loading ? <Loader /> : null
  const errorMessage = error ? <h2>Error occured</h2> : null
  const showLoadMoreButton = images.length > 0 && result < totalHits
  return (
    <div className={styles.App}>
      <Modal isOpen={isOpen} closeModal={closeModal} currentImage={currentImage}/>
      <Searchbar onSubmit={initInputData}/>
      {errorMessage}
      {spinner}
      <ImageGallery imageList={images} openModal={openModal}/>
      <div className={styles.flexCentered}>
        { showLoadMoreButton && <Button title="Load more" onClick={loadMore}/> }
      </div>
    </div>
  )
}

export default App