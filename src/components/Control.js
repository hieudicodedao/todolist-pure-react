import React, { Component } from 'react';
import '../css/control.css'
class Control extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword : ''
        }
    }
    // when press submit and handdle keyword on the search's button
    onFind = (e) =>{
        e.preventDefault();
        this.props.keyword(this.state.keyword)
    }
    //handle any change in the placeholder
    handleChange = (e) =>{
        let {target} = e;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name] : value
        })
    }
    sortModify = (sortName,sortStatus) =>{
        this.props.sortModify(sortName,sortStatus);
    }
    render() {
        return (
            
            <div>
                    <button name=""  className="btn btn-primary mt-4 mb-4" onClick = {this.props.addNew}>Them Cong Viec</button>
                    <div className="row full">
                            <div className="col-sm-6">
                                <form className="form-inline my-2 my-lg-0" onSubmit = {this.onFind}>
                                            <input className="form-control mr-sm-2" type="text" 
                                                     placeholder="Nhap tu khoa" 
                                                     name = "keyword"
                                                     value = {this.state.keyword}
                                                     onChange = {this.handleChange}
                                                     />
                                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Tim</button>
                                </form>   
                            </div>
                            <div className="col-sm-6">
                                    <div className="dropdown open" >
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" >
                                                    Sap Xep
                                                </button>
                                        <div className="dropdown-menu" aria-labelledby="triggerId" >
                                            <button className="dropdown-item" onClick = { () => this.sortModify('name' ,1)}>Ten A-Z</button>
                                            <button className="dropdown-item" onClick = { () => this.sortModify('name' ,-1)}>Ten Z-A</button>
                                            <button className="dropdown-item" onClick = { () => this.sortModify('status',1)}>Trang thai Kich Hoat</button>
                                            <button className="dropdown-item" onClick = { () => this.sortModify('status',-1)}>Trang thai An    </button>
                                        </div>
                                    </div>
                            </div>  
                    </div>
            </div>
            
        );
    }
}

export default Control;