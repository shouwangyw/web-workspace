import React, { Component, PureComponent } from 'react'

// 版本一
// function Comment({data}){
//   console.log('render');
//   return (
//     <div>
//       <p>{data.body}</p>
//       <p>--{data.author}</p>
//     </div>
//   )
// }

// 版本二
// class Comment extends Component{
//   shouldComponentUpdate(nextProps){
//     if(nextProps.data.body === this.props.data.body &&
//       nextProps.data.author === this.props.data.author){
//       return false;
//     }
//     return true;
//   }
//   render(){
//     console.log('render');
//     return (
//       <div>
//         <p>{this.props.data.body}</p>
//         <p>--{this.props.data.author}</p>
//       </div>
//     )
//   }
// }

// 版本三
// class Comment extends PureComponent{
//   render(){
//     console.log('render');
//     return (
//       <div>
//         <p>{this.props.body}</p>
//         <p>--{this.props.author}</p>
//       </div>
//     )
//   }
// }

// 版本四
// memo只是让函数组件可以拥有PureComponent的功能
const Comment = React.memo(({body, author}) => {
  console.log('render');
  return (
    <div>
      <p>{body}</p>
      <p>--{author}</p>
    </div>
  )
});
export default class CommentList extends Component {
  constructor(props){
    super(props);
    this.state = {
      comments: []
    }
  }
  componentDidMount(){
    setInterval(() => {
      this.setState({
        comments: [
          {body: 'react is very good', author: 'facebook'},
          {body: 'vue is very good', author: 'youyuxi'}
        ]
      })
    }, 1000);
  }
  render() {
    return (
      <div>
        {this.state.comments.map((c, i) => (
          // <Comment key={i} data={c}></Comment>
          // <Comment key={i} body={c.body} author={c.author}></Comment>
          <Comment key={i} {...c}></Comment>
        ))}
      </div>
    )
  }
}
