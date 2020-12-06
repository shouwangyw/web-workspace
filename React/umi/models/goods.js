// 首先安装axios
import axios from "axios";

// api
function getGoods() {
  return axios.get("/api/goods");
}

export default {
  namespace: "goods", // model的名字空间，区分多个model
  state: [
    // 初始化状态
    { title: "xxx" }
  ],
  effects: {
    // 异步操作
    *getList(action, { call, put }) {
      const res = yield call(getGoods);
      // type名字不需要命名空间
      yield put({ type: 'initGoods', payload: res.data.result });
    }
  },
  reducers: {
    // 更新状态
    initGoods(state, action) {
      return action.payload;
    },
    addGood(state, action) {
      return [...state, { title: action.payload.title }];
    }
  }
};
