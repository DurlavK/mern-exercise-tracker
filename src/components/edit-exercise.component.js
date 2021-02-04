import React, { Component } from 'react'
import axios from 'axios';

class EditExercise extends Component {
  constructor(props) {
    super(props)

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  
    this.state = {
       username: '',
       description: '',
       duration: 0,
       date: new Date(),
       users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
    .then(res=>{
      this.setState({
        username: res.data.username,
        description: res.data.description,
        duration: res.data.duration,
        date: new Date(res.data.date),
      })
    })
    .catch(err=>console.log(err));

    axios.get('http://localhost:5000/users')
    .then(res=> {
      if(res.data.length>0){
        this.setState({
          users: res.data.map(user=>user.username),
        })
      }
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    console.log('form');
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
    .then(res=> console.log(res.data))

    window.location = '/';
  }
  
  render() {
    return (
      <div>
        <h3>Edit Exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <select 
            name="username" 
            id=""
            required
            value={this.state.username}
            onChange={this.onChangeUsername}
            // ref='userInput'
            >
              {
                this.state.users.map(user=>{
                  return <option key={user} value={user}>{user}</option>
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input 
            type="text"
            className='form-control'
            value={this.state.description}
            onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (in min):</label>
            <input 
            type="text"
            className='form-control'
            value={this.state.duration}
            onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Date:</label>
            <div>
              <input 
              type="text"
              className='form-control'
              value={this.state.date}
              onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Edit Exercise" className='btn btn-primary'/>
          </div>
        </form>        
      </div>
    )
  }
}

export default EditExercise