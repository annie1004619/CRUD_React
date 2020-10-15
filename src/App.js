import React, { Component } from 'react';
import './App.css';
import TOC from "./components/toc";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/subject";
import Control from "./components/control";

class App extends Component{
  constructor(props) {
    super(props);
    /*state 초기화 컴포넌트가 실행될때 constructor가 젤 먼저 실행*/
  this.max_content_id =3;
  this.state={
    mode:'welcome',
    selected_content_id:2,
    subject:{title:"WEB", sub:"World Wide Web"},
    welcome:{title:"welcome", desc:"hello, React!!"},
    contents:[
      {id:1, title:'HTML1', desc:'HTML1 is for information'},
      {id:2, title:'HTML2', desc:'HTML2 is for information'},
      {id:3, title:'HTML3', desc:'HTML3 is for information'}
    ]
  }
  }
getReadContent(){
  var i =0;
      while(i<this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
         return data;        
        }
        i=i+1;
      }
}
getContent(){
  var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    
    else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
  }
  
  else if(this.state.mode === 'create'){
      _article=<CreateContent onSubmit={function(_title, _desc){
        //add content to this.state.contents
        this.max_content_id+=1;
        //push 사용하기
        //this.state.contents.push(
        //  {id:this.max_content_id, title:_title, desc:_desc}
        //  );

        //concat 사용하기
       // var _contents = this.state.contents.concat(
        //  {id:this.max_content_id, title:_title, desc:_desc}
       // )

       //Array.from 사용하기
       var _contents = Array.from(this.state.contents);
       _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    }
    
    else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article=<UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          //수정하기 위해 원본 복사
          var _contents = Array.from(this.state.contents);
          //contents 안에있는 id중 수정하고자 하는 id 찾기
          var i =0;
          while(i< _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc}
              break;
            }
            i=i+1;
          }
          this.setState({
            contents:_contents,
            //수정하고 나서 제출을 눌렀을 때 read모드로 변경
            mode:'read'
          });
      }.bind(this)}></UpdateContent>
    }
    return _article;
}

  render() {
    return(
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={function(){
          this.setState({mode:'welcome'});
        }.bind(this)}>
        </Subject>
       {/*<Subject title="React" sub="reactreactreact"></Subject>*/}
        <TOC
         onChangePage={function(id){
         this.setState({
           mode:'read',
           selected_content_id: Number(id)
        });
        }.bind(this)}
          data={this.state.contents}
          ></TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm("really?")){
              var _contents = Array.from(this.state.contents);
              var i =0;
              while(i< _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                  break;
                }
                i=i+1;
              
              //getReadContent 이용해서 해본거
               //var _content = this.getReadContent();
               //var index = _content.id-1;
               //_contents.splice(index,1);
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert("delete!")
            }
          }else{
            this.setState({
              mode:_mode
            })
          }
        }.bind(this)}></Control>
       {this.getContent()}
      </div>
    );
  }
}
export default App;