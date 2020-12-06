import { compose } from "C:/Users/10217629/AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux";
import { func } from "prop-types";

export function createStore(reducer, enhancer){
  if(enhancer){
    return enhancer(createStore)(reducer);
  }
  let currentState = {}
  let currentListeners = []
  function getState(){
    return currentState
  }
  fucntion subscribe(listener){
    currentListeners.push(listener)
  }
  fucntion dispatch(action){
    currentState = reducer(currentState, action)
    currentListeners.forEach(v => v());
    return action;
  }
  dispatch({type: '@IMOOC/WONIU-REDUX'})
  return {getState, subscribe, dispatch}
}
export function applyMiddleware(...middlewares){
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch

    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewareChain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
export function compose(...funcs){
  if(funcs.length == 0){
    return arg => arg
  }
  if(funcs.length == 1){
    return funcs[0]
  }
  return funcs.reduce((ret, item) => (...args) => ret(item(...args)))
}

function bindActionCreator(creator, dispatch){
  return (...args) => dispatch(creator(...args))
}
export function bindActionCreators(creators, dispatch){
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch)
    return ret
  }, {})
}

import React from 'react'
import ProTypes from 'prop-types'
import {bindActionCreators} from './woniu-redux'
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: ProTypes.object
    }
    constructor(props, context){
      super(props, context)
      this.state = {
        props: {}
      }
    }
    componentDidMount(){
      const {store} = this.context
      store.subscribe(() => this.update())
      this.update()
    }
    update(){
      const {store} = this.context
      const StateProps = mapStateToProps(store.getState())
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {
          ...this.state.props,
          ...StateProps,
          ...dispatchProps
        }
      })
    }
  }
  render(){
    return <WrapComponent {...this.state.props}></WrapComponent>
  }
}
export class Provider extends React.Component{
  static childContextTypes = {
    store: ProTypes.object
  }
  getChildContext(){
    return {stote: this.store}
  }
  constructor(props, context){
    super(props, context)
    this.store = props.store
  }
  render() {
    return this.props.children
  }
}

const thunk = ({dispatch, getState}) => next => action => {
  if(typeof action === 'function'){
    return action(dispatch, getState)
  }
  return next(action)
}
export default thunk