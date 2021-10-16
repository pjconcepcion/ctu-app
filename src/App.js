import { Component } from 'react';
import Create from './components/Create';
import Update from './components/Update';
import './App.css';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            user: {
                id: '',
                name: '',
                gender: '',
                birthdate: '',
                address: ''
            }
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/user/')
            .then(response => {return response.json()})
            .then(data => this.setState({users: data}))
            .catch(err => console.log(err));
    }

    getUsers = () =>{
        return this.state.users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.gender == 1? 'Male': 'Female'}</td>
                    <td>{new Date(user.birthdate).toLocaleDateString()}</td>
                    <td>{user.address}</td>
                    <td>{user.email}</td>
                    <td>
                        <button 
                            className={this.state.user.id? "btn-grey" : "btn-blue"}
                            onClick={() => this.getUserDetail(user.id)}
                            disabled={this.state.user.id? true : false}
                        >View</button>
                    </td>
                    <td>
                        <button className="btn-red" onClick={() => this.deleteUser(user.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    deleteUser = (id) => {
        fetch('http://localhost:5000/user/'+ id + '/delete',{method: 'PUT'})
            .then(response => {
                this.setState((state) => ({
                    users: state.users.filter(user => user.id != id)
                }));
            })
            .catch(err => console.log(err));
    }

    getUserDetail = (id) =>{
        fetch('http://localhost:5000/user/'+ id)
            .then(response => {return response.json()})
            .then(data => this.setState({user: data[0]}))
            .catch(err => console.log(err));
    }

    removeUserDetail = () => {
        this.setState({user: {}});
    }

    render(){
        return (
        <div className="App">
            <div className="space-between">
                <div id="user-list">
                    <table className="text-align-l">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Birthdate</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getUsers()}
                        </tbody>
                    </table>
                </div>
                <div id="user-details">
                    {this.state.user.id? 
                        <Update 
                            user={this.state.user} 
                            removeUser={this.removeUserDetail}  
                        />: 
                        <Create />
                    }
                </div>
            </div>
        </div>
        );
    }
}

export default App;
