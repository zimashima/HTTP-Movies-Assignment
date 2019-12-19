import React, {useState, useEffect} from 'react'
import axios from 'axios'

const UpdateMovieForm = props => {
    const initialState = {
        id: null,
        title: '',
        director: '',
        metascore: '',
        stars: []
    }
    const [newValue, setNewValue] = useState(initialState)
    const [newStar, setNewStar] = useState('')

    useEffect(()=> {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res =>
            setNewValue(res.data))
        .catch(err=> console.log(err))
    },[props.match.params.id])

    const handleValueChange = e => {
        setNewValue({...newValue, [e.target.name]: e.target.value})
    }

    const handleChangeSubmit = e =>{
        e.preventDafault()
        axios.put(`http://localhost:5000/api/movies/${newValue.id}`, newValue)
        props.history.push('/')
    }


    return (
        <>
        <div className="container-md">
        <form className="form-group" onSubmit={handleChangeSubmit}>

            <div className="d-flex flex-column text-center mx-auto m-4 p-4" style={{maxWidth: 800}}>

                <h3>Edit Movie Information</h3>
                <label>Title</label>
                <input type="text"
                    name="name"
                    defaultValue={newValue.title}
                    onChange={handleValueChange}/>
                <label>Director</label>
                <input type="text" 
                    name="director"
                    defaultValue={newValue.director}
                    onChange={handleValueChange}/>
                <label>MetaScore</label>
                <input type="text" 
                    name="metascore"
                    defaultValue={newValue.metascore}
                    onChange={handleValueChange}/>

                <label>Stars</label>
                {newValue.stars.map( (star, index) => (
                    <input type="text"
                        name="stars"
                        defaultValue={star} 
                        onChange={e => {
                            setNewStar(e.target.star)
                            console.log(newStar)
                            }
                        }/>
                ))
                }

                <span class="btn btn-warning">Submit Edit</span>

            </div>
            
        </form>
        </div>
        </>
    )
}

export default UpdateMovieForm