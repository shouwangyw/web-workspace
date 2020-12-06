import React, { Component } from 'react'
// import store from '../store'

// export default class ReduxTest extends Component {
//   render() {
//     return (
//       <div>
//         <p>{store.getState()}</p>
//         <div>
//           <button onClick={() => store.dispatch({type: 'decr'})}>-</button>
//           <button onClick={() => store.dispatch({type: 'incr'})}>+</button>
//         </div>
//       </div>
//     )
//   }
// }

import {connect} from 'react-redux'

import {incr, decr, asyncAdd} from '../store/counter.redux'
// class ReduxTest extends Component {
//   render() {
//     return (
//       <div>
//         <p>{this.props.num}</p>
//         <div>
//           <button onClick={() => this.props.decr()}>-</button>
//           <button onClick={() => this.props.incr()}>+</button>
//         </div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => ({num: state});
// const mapDispatchToProps = dispatch => ({
//   incr: () => dispatch({type: 'incr'}),
//   decr: () => dispatch({type: 'decr'})
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ReduxTest)

const mapStateToProps = state => ({num: state});
const mapDispatchToProps = dispatch => ({
  incr: () => dispatch({type: 'incr'}),
  decr: () => dispatch({type: 'decr'})
});

// @connect(mapStateToProps, mapDispatchToProps)
@connect(
  // 注意：这里使用 state 需要带上模块名 counter
  state => ({num: state.counter}),
  {incr, decr, asyncAdd}
)
class ReduxTest extends Component {
  render() {
    return (
      <div>
        <p>{this.props.num}</p>
        <div>
          <button onClick={() => this.props.decr()}>-</button>
          <button onClick={() => this.props.incr()}>+</button>
          <button onClick={() => this.props.asyncAdd()}>asyncAdd</button>
        </div>
      </div>
    )
  }
}

export default ReduxTest