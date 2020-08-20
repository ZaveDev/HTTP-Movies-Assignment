import React, {useState, useEffect}from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'


const initState = {
  title: '',
  director: '',
  metascore: '',
  addedStar:'',
  stars: [],
}

const UpdateMovie = (props) => {
  const [formValue, setFormValue] = useState(initState)
  const { id } = useParams()
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        // res.data
        console.log(res);
        setFormValue(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

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
  
  const removeStar = (e) => {
    e.preventDefault()
    setFormValue({
      ...formValue,
      stars: formValue.stars.filter(star => star !== e.target.id)
    })
  }

  const postUpdate = (e) => {
    e.preventDefault()
    const putData = {
      id: `${id}`,
      title: `${formValue.title}`,
      director: `${formValue.director}`,
      metascore: `${formValue.metascore}`,
      stars: formValue.stars
    }

    axios
      .put(`http://localhost:5000/api/movies/${id}`, putData)
      .then(res => {
        console.log(res)
        props.movieList.filter(mov => mov.id !== id)
        props.setMovieList([...props.movieList, res.data])
        props.getMovieList() 
        history.push(`/movies/${id}`)
      })
      .catch(err => {console.log(err);})
  }

  return (
    <form>
        <input
          type='text'
          name='title'
          value={formValue.title}
          onChange={handleOnchange}
          placeholder='title'
        />
        <br/>
        <input
          type='text'
          name='director'
          value={formValue.director}
          onChange={handleOnchange}
          placeholder='director'
        />
        <br/>
        <input
          type='text'
          name='metascore'
          value={formValue.metascore}
          onChange={handleOnchange}
          placeholder='metascore (1 - 100)'
        />
        <br/>
        <input
            type='text'
            name='addedStar'
            value={formValue.addedStar}
            onChange={handleOnchange}
            placeholder='star'
          /><button onClick={addStar}>+</button>
        {
          formValue.stars.map(star => {
            return (
            <div>
              <span>{star}</span><button id={star} onClick={removeStar}>X</button>
            </div>)
          })
        }
        <br/>
        <button onClick={postUpdate}>Update</button>
        
    </form>
  )
}
export default UpdateMovie