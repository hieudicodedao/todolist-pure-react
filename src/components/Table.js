
import React, { Component } from 'react';
import TableItems from './TableItems';

class Table extends Component {
    constructor(props){
        super(props);
        this.state = {
            key: '',
            mode : -1      
        }
    }
    onClick = (id) =>{
        this.props.onClick(id)
    }
    onDelete = (id) =>{
        this.props.onDelete(id)
    }
    changeContent = (ele) =>{
        this.props.changeContent(ele)
    }
    renderTable = () =>{   
        let rs = this.props.tableData.map((ele,index)=>{
            return <TableItems key = {index} 
            index = {index} ele = {ele} 
            onClick = {this.onClick}
            onDelete = {this.onDelete}
            changeContent = {this.changeContent}
            />
        });     
        return rs;
    }
    onFilter = (e) =>{
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.props.onFilter(
            name === 'key' ? value : this.state.key,
            name === 'mode' ? value : this.state.mode
        );
        this.setState({
            [name] :value 
        })
    }
    render() {
        return (
            <table className="table table-bordered table-inverse mt-5">
                <thead className="thead-inverse">
                    <tr>
                        <th className="text-justify ">STT</th>
                        <th className="text-justify ">Ten </th>
                        <th className="text-justify ">Trang Thai</th>
                        <th className="text-justify "> Hanh Dong</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td ></td>
                        <td>
                            <div className="form-group">
                                <input type="text" className="form-control" name="key" value = {this.state.key} onChange = {this.onFilter}/>
                            </div>
                        </td>
                        <td>
                            <div className="form-group" >
                              <select className="form-control" name="mode" id="" onChange = {this.onFilter}>
                                <option value ={-1}>Tat Ca</option>
                                <option value = {0}>An</option>
                                <option value = {1}>Kich hoat</option>
                              </select>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    {this.renderTable()}
                </tbody>
            </table>

            
        );
    }
}

export default Table;