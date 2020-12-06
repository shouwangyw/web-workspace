export let updateQueue = {
  updaters: [],
  isPending: false,
  add(updater) {
    _.addItem(this.updaters, updater)
  },
  batchUpdate(){
    if(this.isPending){
      return
    }
    this.isPending = true
    let { updaters } = this
    let updater
    while (updater = updaters.pop()) {
      updater.updateComponent()
    }
    this.isPending = false
  }
}
function Updater(instance){
  this.instance = instance
  this.pendingStates = []
  this.pendingCallbacks = []
  this.isPending = false
  this.nextProps = this.nextContext = null
  this.clearCallbacks = this.clearCallbacks.bind(this)
}
Updater.prototype = {
  emitUpdate(nextProps, nextContext) {
    this.nextProps = nextProps
    this.nextContext = nextContext
    nextProps || !updateQueue.isPending
      ? this.updateComponent()
      : updateQueue.add(this)
  },
  updateComponent() {
    let {instance, pendingStates, nextProps, nextContext} = this
    if(nextProps || pendingStates.length>0){
      nextProps = nextProps || instance.props
      nextContext = nextContext || instance.context
      this.nextProps = this.nextContext = null
      shouldUpdate(instance, nextProps, this.getState(), nextContext, this.clearCallbacks)
    }
  },
  addState(nextState){
    if(nextState){
      _.addItem(this.pendingStates, nextState)
      if(!this.isPending){
        this.emitUpdate()
      }
    }
  },
  replaceState(nextState){
    let {pendingStates} = this
    pendingStates.pop()
    _.addItem(pendingStates, [nextState])
  },
  getState(){
    let {instance, pendingStates} = this
    let {state, props} = instance
    if(pendingStates.length){
      state = _.extend({}, state)
      pendingStates.forEach(nextState => {
        let isReplace = _.isArr(nextState)
        if(isReplace){
          nextState = nextState[0]
        }
        if(_.isFn(nextState)){
          nextState = nextState.call(instance, state, props)
        }
        if(isReplace){
          state = _.extend({}, nextState)
        }else{
          _.extend(state, nextState)
        }
      })
      pendingStates.length = 0
    }
    return state
  },
  clearCallbacks(){
    let {pendingCallbacks, instance} = this
    if(pendingCallbacks.length >0){
      this.pendingCallbacks = []
      pendingCallbacks.forEach(callback => callback.call(instance))
    }
  },
  addCallback(callback){
    if(_.isFn(callback)){
      _.addItem(this.pendingCallbacks, callback)
    }
  }
}