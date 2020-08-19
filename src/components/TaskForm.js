import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props);   
        if(this.props.valueBox){
            this.state= {
                id : this.props.valueBox.id,
                name : this.props.valueBox.name ,
                status : this.props.valueBox.status
            }
        }else{
            this.state = {
                id : '',
                name : '',
                status : false
            }
        }
    }
    componentWillReceiveProps(props){
     
        if(props && props.valueBox){
            this.setState({
                id : props.valueBox.id,
                name : props.valueBox.name,
                status : props.valueBox.status
            })
            return;
        }
    
        this.setState({
            id : '',
            name : '',
            status : false
        })
       
        
    }
    onSubmit = (e) =>{
        e.preventDefault();
        this.props.onSubmit(this.state)
    }
    change = (e) =>{
        let target = e.target;
        let name = target.name;
        let value = target.value; 
        if(name === 'status' )  value = target.value ==='true' ? true : false 
        this.setState({
            [name] : value
        })
    }
    oncloseForm = () =>{
        this.props.oncloseForm()  
    }
    render() {
        return (
            <div className="card mt-4" >
                <div className="card-header">
                        <p className="float-left">{this.state.id === '' ? 'Them Cong Viec' : 'Sua Cong viec'}</p>
                        <button className="float-right"  onClick = {this.oncloseForm}>x</button>
                </div>
                <div className="card-body">
                    <form className="form" onSubmit = {this.onSubmit}>
                        <div className="form-group">
                            <label >Ten :</label>
                                <input type="text" 
                                        name="name"  
                                        className="form-control" 
                                        value={this.state.name}
                                        onChange = {this.change}
                                        />
                        </div>
                        <div  className="form-group"  > 
                                <label >Trang thai :</label>
                                <select className="form-control" 
                                        name="status"
                                        value = {this.state.status}  
                                        onChange = {this.change}                                      
                                >
                                    <option value = {true}>Kich Hoat</option>
                                    <option value = {false}>An</option>
                                </select>
                        </div>
                        <button type="submit" className="btn btn-primary ml-5">Luu Lai</button>
                        <button type="reset" className="btn btn-primary ml-4" onClick = {this.oncloseForm}>Huy Bo</button>
                    </form>

                </div>
            </div>
        );
    }
}

export default TaskForm;