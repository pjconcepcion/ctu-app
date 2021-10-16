import { Component } from "react"

export default class Update extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.name,
            gender: this.props.user.gender,
            birthdate: this.props.user.birthdate,
            email: this.props.user.email,
            address: this.props.user.address,
        }
    }

    updateUser = (e) => {   
        fetch('http://localhost:5000/user/'+ this.props.user.id + '/update', {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        })
            .then(response => alert('User updated'))
            .catch(err => console.log(err));
    }

    render(){
        return (
            <div>
                <h1 className="text-align-c"> Update User Information</h1>
                <form onSubmit={this.updateUser}>
                    <div className="detail-container">
                        <label>Name: </label>
                        <input type="text" data-name="name" required onChange={e=> this.setState({name: e.target.value})} value={this.state.name}/>
                    </div>
                    <div className="detail-container">
                        <label>Gender: </label>
                        <select data-name="gender" required onChange={e=> this.setState({gender: e.target.value})} value={this.state.gender}>
                            <option selected disabled> Select gender </option>
                            <option value={1}> Male </option>
                            <option value={0}> Female </option>
                        </select>
                    </div>
                    <div className="detail-container">
                        <label>Birthdate: </label>
                        <input type="date" data-name="birthdate" required  onChange={e=> this.setState({birthdate: e.target.value})} value={this.state.birthdate}/>
                    </div>
                    <div className="detail-container">
                        <label>Address: </label>
                        <input type="text" data-name="address" required onChange={e=> this.setState({address: e.target.value})} value={this.state.address}/>
                    </div>
                    <div className="detail-container">
                        <label>Email: </label>
                        <input type="email" data-name="email" required onChange={e=> this.setState({email: e.target.value})} value={this.state.email}/>
                    </div>
                    <button type="submit" className="btn-green">Update</button> {' '}
                    <button className="btn-red" onClick={this.props.removeUser}>Close</button>
                </form>
            </div>
        )
    }
}