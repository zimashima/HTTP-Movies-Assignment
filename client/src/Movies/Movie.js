import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }


  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDelete = e =>{
    e.preventDefault()
    axios.delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
    .then(res=> {
      console.log(res.data)
      this.props.history.push('/')
    })
    .catch(err => console.log(err))
  }

  handleEdit = e => {
    e.preventDefault()
    console.log(this.state.movie.id)
    this.props.history.push(`/update_movie/${this.props.match.params.id}`)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="mb-auto d-flex justify-content-center">
        <span className="btn btn-success m-3" onClick={this.saveMovie}>
          Save Movie
        </span>
        <span className="btn btn-warning m-3" onClick={this.handleEdit}>Edit Movie</span>
        <span className="btn btn-danger m-3" onClick={this.handleDelete}>Delete Movie</span>
        </div>
        <div>
        
        </div>
      </div>
    );
  }
}
