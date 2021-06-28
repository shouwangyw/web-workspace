import {get, post} from './ajax'

export default {
  some(options) {
    return get('/some', options)
  },
  hostname(options) {
    return get('/hostname', options)
  },
}

