import React, { Component } from 'react';

class Subject extends Component{
    render() {
      return (
        <header>
        <h1><a href="/" onClick={function(e){
          e.preventDefault();//link를 클릭했을 때 페이지가 바뀌는 것을 방지
          this.props.onChangePage();
        }.bind(this)}>{this.props.title}</a></h1>
        {this.props.sub}
        </header>
      );
    }
  }


export default Subject;