import React, {useState} from 'react'
import axios from 'axios'

const AddMovieForm = props => {
    const initialState = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    }
    const [newValue, setNewValue] = useState(initialState)
    const [starsText, setStars] = useState('')

    const handleValueChange = e => {
        setNewValue({...newValue, [e.target.name]: e.target.value})
    }

    const handleAddSubmit = e =>{
        e.preventDefault()   
        axios.post(`http://localhost:5000/api/movies/`, newValue)
        .then(()=> props.history.push('/'))
        .catch(err => console.log('caught you', err))
    }

    return (
        
        <>
        <div className="container-md">
        <form className="form-group" onSubmit={handleAddSubmit} >

            <div className="d-flex flex-column text-center mx-auto m-4 p-4" style={{maxWidth: 800}}>

                <h3>Add a New Movie</h3>

                <label>Title</label>
                <input type="text"
                    name="title"
                    value={newValue.title}
                    onChange={handleValueChange} 
                    autoFocus
                    />
                    
                <label>Director</label>
                <input type="text" 
                    name="director"
                    value={newValue.director}
                    onChange={handleValueChange} 
                    autoFocus
                    />
                <label>MetaScore</label>
                <input type="text" 
                    name="metascore"
                    value={newValue.metascore}
                    onChange={handleValueChange} 
                    autoFocus
                    />

                <label>Stars</label>
                
                <input type="text" 
                    name="stars"
                    value={newValue.stars}
                    onChange={e => {
                        setStars(e.target.value)
                        setNewValue({...newValue, [e.target.name]: starsText.split(",")})
                    }} 
                    autoFocus
                    />

                <button className="btn btn-warning" type="submit">Add Movie</button>

            </div>
            
        </form>
        </div>
        </>
    )
}

export default AddMovieForm