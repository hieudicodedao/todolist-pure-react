import React, { Component } from 'react';

class Table_items extends Component {
    onClick = () =>{
        this.props.onClick(this.props.ele.id)
    }
    onDelete = () =>{
        this.props.onDelete(this.props.ele.id)
    }
    changeContent = () =>{
        this.props.changeContent(this.props.ele)
    }
    render() {
        return (
            <tr key = {this.props.id}>
                        <td >{this.props.index + 1 }</td>
                        <td>{this.props.ele.name}</td>
                        <td onClick = {this.onClick}>{this.props.ele.status === true ? 'Kich Hoat' : 'An'}</td>
                        <td>
                            <button type="button" className="btn btn-primary ml-3"
                                    onClick = {this.changeContent}
                                >Sua</button>
                            <button type="button" className="btn btn-success ml-3" onClick = {this.onDelete}
                                    
                                >Xoa</button>
                        </td>
                    </tr>
        );
    }
}

export default Table_items;