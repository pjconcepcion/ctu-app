import { Component } from "react"

export default class Create extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            gender: '',
            birthdate: '',
            email: '',
            address: ''
        }
    }

    onValueChange = (e) => {
        this.setState({[e.target.dataset.name] : e.target.value});
    }

    createUser = (e) => {
        fetch('http://localhost:5000/user/add', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        })
            .then(response => alert('New user created'))
            .catch(err => console.log(err));

    }

    render(){
        return (
            <div>
                <h1 className="text-align-c"> User Information</h1>
                <form onSubmit={this.createUser}>
                    <div className="detail-container">
                        <label>Name: </label>
                        <input type="text" data-name="name" required onChange={this.onValueChange}/>
                    </div>
                    <div className="detail-container">
                        <label>Gender: </label>
                        <select data-name="gender" required onChange={this.onValueChange}>
                            <option selected disabled> Select gender </option>
                            <option value={1}> Male </option>
                            <option value={0}> Female </option>
                        </select>
                    </div>
                    <div className="detail-container">
                        <label>Birthdate: </label>
                        <input type="date" data-name="birthdate" required  onChange={this.onValueChange}/>
                    </div>
                    <div className="detail-container">
                        <label>Address: </label>
                        <input type="text" data-name="address" required onChange={this.onValueChange}/>
                    </div>
                    <div className="detail-container">
                        <label>Email: </label>
                        <input type="email" data-name="email" required onChange={this.onValueChange}/>
                    </div>
                    <button type="submit" className="btn-green">Create</button>
                </form>
            </div>
        )
    }
}