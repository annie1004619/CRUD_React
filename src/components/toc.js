import React, { Component } from 'react';

class TOC extends Component{
  //shouldComponentUpdate(newProps, newState){
    /*console.log('=======>TOC render shouldComponentUpdate'
    ,newProps.data
    ,this.props.data);*/
    //바뀐 값과 원래의 값을 알 수 있음

   // if(this.props.data === newProps.data){
    //  return false;
   // }
    //return true;
 // }
    render() {
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i <data.length){
            lists.push(<li key={data[i].id}>
              <a 
              href={"/content/"+data[i].id}
             
              onClick={function(id, e){
                e.preventDefault();
                this.props.onChangePage(id);
              }.bind(this, data[i].id)}
              > {data[i].title} </a></li>);
            i=i+1;
        }
      return (
        <nav>
      <ul>
         {lists}
      </ul>
      </nav>
      );
    }
  }

  export default TOC;