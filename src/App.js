import React , { Component }from 'react';
import './App.css';
import Control from './components/Control'
import Table from './components/Table'
import TaskForm from './components/TaskForm';
var randomstring = require("randomstring");
class App extends Component {
  constructor(props){
    super(props); 
    
    this.state = {
        tableData : JSON.parse(localStorage.getItem('data')),
        isDisplay : false,
        valueBox : null,
        keyword : '',
        key : '',
        mode : -1,
        sortName : 'name', 
        sortStatus : 1
    }

  }
  // when press button add new element will show up a taskForm
  addNew = () => {
      this.setState({
        isDisplay : true,
        valueBox :null
      })
  }
  // click on submit (update or change somes)
  onSubmit = (state) =>{
    let {tableData} = this.state
      if(state.id === ''){
          let newData = {
            id : randomstring.generate(),
            name : state.name,
            status : state.status
          }
          tableData.push(newData)
          this.setState({
            tableData : tableData,
            isDisplay : false
          })
          localStorage.setItem('data',JSON.stringify(tableData));
      }else{
          let newdataTable = [];
          for(let i =0;i<tableData.length;++i){
            if(tableData[i].id === state.id){
              let ele ={
                id : state.id,
                name : state.name,
                status : state.status
              }
              newdataTable.push(ele)
            }
            else newdataTable.push(tableData[i])
          }
          this.setState({
            tableData : newdataTable,
            isDisplay :false
          })
          localStorage.setItem('data',JSON.stringify(newdataTable));
      }
  }
  // when press HUY BO or X will destroy TaskForm
  oncloseForm = () =>{
    this.setState({
      isDisplay : false
    })
  }
  // change status by pressing on text
  onClick = (id) =>{
      let {tableData} = this.state
      for(let i=0;i<tableData.length;++i){
        if(tableData[i].id === id){
          tableData[i].status  =  tableData[i].status === true ? false : true   
        }
      }
      this.setState({
        tableData : tableData
      })
      localStorage.setItem('data',JSON.stringify(tableData));
  }
  // press delete element
  onDelete = (id) =>{
      let {tableData}  =this.state;
      let newTable = [];
      for(let i=0 ; i < tableData.length ; i++){
          if(tableData[i].id === id) continue;
          newTable.push(tableData[i]);
      }

      
      this.setState({
        tableData : newTable
      })

      localStorage.setItem('data',JSON.stringify(newTable));
  }
  //press on changing element
  changeContent = (ele) =>{
    // console.log(ele)
     this.setState({
      isDisplay : true,
      valueBox : ele    
    })
  }

  // hanndle value from control compo and rerender the table
  keyword = (keyword) =>{
      this.setState({
        keyword : keyword
      })
  }

  onFilter = (key,mode) =>{
      mode = parseInt(mode,10);
      this.setState({
        key : key,
        mode : mode
      })
  }
  sortModify = (sortName,sortStatus) =>{
      this.setState({
        sortName : sortName,
        sortStatus :sortStatus
      })
  }
  render(){
    var {tableData , isDisplay ,content ,valueBox ,key ,mode ,keyword ,sortName,sortStatus} = this.state;
    tableData = tableData.filter((ele) =>{
       return ele.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    })
    var eleTaskform = isDisplay === true ? 
                <div className = "col-sm-4">
                  <TaskForm content = {content} 
                  onSubmit = {this.onSubmit} 
                  oncloseForm = {this.oncloseForm}
                  valueBox = {valueBox}
                  /></div> 
                  : '';
    
    tableData = tableData.filter((ele) =>{
        return ele.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
    })
    if(mode === 1){
      tableData =tableData.filter((ele) =>{
         return ele.status === true
      })
    }
    if(mode === 0){
      tableData =tableData.filter((ele) =>{
         return ele.status === false
      })
    }
    if(sortName === 'name' ){
      tableData = tableData.sort((a,b) =>{
         if(a.name  > b.name) return sortStatus;
         else return -sortStatus
      })
    }
    if(sortName === 'status' ){
      tableData = tableData.sort((a,b) =>{
         if(a.status  < b.status) return sortStatus;
         else return -sortStatus
      })
    }
    return (
      // <div className="App">
      //   <div className="container">

      //   </div>
      // </div>
      
      <div className="container">
          <div className="row">
          <h1 className = "head">Quan Ly Cong Viec</h1>
          
          </div>
          <div className="row lineThrough"></div>

          <div className="row">
              {eleTaskform}
              <div className={isDisplay === true ? "col-sm-8" : ""}>
                  <Control addNew = {this.addNew} 
                            keyword = {this.keyword}
                            sortModify = {this.sortModify}
                          />
                  <Table 
                          onFilter = {this.onFilter}
                          tableData = {tableData} 
                          onClick = {this.onClick}
                          onDelete = {this.onDelete} 
                          changeContent = {this.changeContent}
                  />
              </div>
          </div>
      </div>
    );
  }
}

export default App;
