import React, {useState, useEffect} from 'react'
import axios from 'axios'

const UpdateMovieForm = props => {
    const initialState = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    }
    const [newValue, setNewValue] = useState(initialState)
    const [starsText, setStars] = useState('')

    useEffect(()=> {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res =>
            setNewValue(res.data))
        .catch(err=> console.log(err))
    }, [props.match.params.id])

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
        <form className="form-group" onSubmit={handleChangeSubmit} >

            <div className="d-flex flex-column text-center mx-auto m-4 p-4" style={{maxWidth: 800}}>

                <h3>Edit Movie Information</h3>

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

                <button className="btn btn-warning" type="submit">Submit Edit</button>

            </div>
            
        </form>
        </div>
        </>
    )
}

export default UpdateMovieForm