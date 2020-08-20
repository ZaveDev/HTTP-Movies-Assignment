import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const initState = {
  title: '',
  director: '',
  metascore: '',
  addedStar:'',
  stars: [],
}

const AddMovie = (props) => {
  const [formValue, setFormValue] = useState(initState)
  const history = useHistory()
  
  const postNewMovie = (e) => {
    e.preventDefault()
    const postData = {
      title: `${formValue.title}`,
      director: `${formValue.director}`,
      metascore: `${formValue.metascore}`,
      stars: formValue.stars,
    }

    axios
      .post('http://localhost:5000/api/movies/', postData)
      .then(res => {
        console.log(res);
        props.getMovieList()
        history.push('/')
      })
      .catch(err => {console.log(err);})
  }

  const handleOnchange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    })
  }

  const addStar = (e) => {
    e.preventDefault()
    setFormValue({
      ...formValue,
      addedStar:'',
      stars:[...formValue.stars, formValue.addedStar]
    })
  }

  return(
    <>
      <form>
        <input
          type='text'
          name='title'
          placeholder='title'
          value={formValue.title}
          onChange={handleOnchange}
        />
          <br/>
        <input
          type='text'
          name='director'
          placeholder='director'
          value={formValue.director}
          onChange={handleOnchange}
        />
          <br/>
        <input
          type='number'
          name='metascore'
          placeholder='metascore'
          value={formValue.metascore}
          onChange={handleOnchange}
        />
          <br/>
        <input
          type='text'
          name='addedStar'
          placeholder='star'
          value={formValue.addedStar}
          onChange={handleOnchange}
        />
        <button onClick={addStar}>+</button>
        <br/>
        {
          formValue.stars.map( star => {
            return(<div>{star}</div>)
          })
        }
        <br/>
        <button onClick={postNewMovie}>Add Movie</button>
      </form>
    </>
  )
}

export default AddMovie