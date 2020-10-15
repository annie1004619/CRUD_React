import React, { Component } from 'react';

class UpdateContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:this.props.data.id,
            title:this.props.data.title,
            desc:this.props.data.desc
        }
        this.inputFormHandler=this.inputFormHandler.bind(this);
    }

    inputFormHandler(e){
        //이벤트가 발생하고 있는 태그의 이름이 뭔지 확인하는 e.target.name
        this.setState({[e.target.name]:e.target.value});
    }
  render() {
    return (
      <article>
        <h2>update</h2>
       <form action="/create_process" method="post"
       onSubmit={function(e){
           e.preventDefault();
           this.props.onSubmit(
            this.state.id,
            this.state.title,
            this.state.desc
            );
           
       }.bind(this)}>
         {/*어디를 업데이트 할 것인지 식별자*/}
           <input type="hidden" name="id" value={this.state.id}></input>
           <p>
               <input 
                 type="text" 
                 name="title" 
                 placeholder="title"
                 value={this.state.title}
                 //onChange를 사용해야만 글자를 수정할 수 있음!!
                 onChange={this.inputFormHandler}
                 ></input></p>
           <p>
               <textarea name="desc" placeholder="description" value={this.state.desc} 
                onChange={this.inputFormHandler}></textarea>
           </p>
           <p>
               <input type="submit"></input>
           </p>
       </form>
    </article>
    );
  }
}

export default UpdateContent;