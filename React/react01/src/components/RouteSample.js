import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";

// 模拟接口
const auth = {
  isLogin: false,
  login(cb) {
    this.isLogin = true;
    setTimeout(cb, 300);
  }
};
// 登陆组件
class Login extends Component {
  state = { isLogin: false };
  login = () => {
    auth.login(() => {
      this.setState({ isLogin: true });
    });
  };
  render() {
    // 回调地址
    const from = this.props.location.state.from || '/';
    
    if (this.state.isLogin) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <p>请先登陆</p>
        <button onClick={this.login}>登陆</button>
      </div>
    );
  }
}
/**
 * 路由守卫：定义可以验证的高阶组件
 */
function PrivateRoute({ component: Component, ...rest }) {
  // render 和 component 二选一
  return (
    <Route
      {...rest}
      render={props =>
        auth.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location.pathname }
            }}
          />
        )
      }
    />
  );
}

function App(props) {
  return (
    <div>
      {/* 导航链接 */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/foo">Foo</Link>
        </li>
      </ul>
      {/* 路由配置 */}
      <Switch>
        {/* exact：确切匹配 */}
        <Route exact path="/" path="/" component={Home} />
        {/* <Route path="/about" component={About} /> */}
        <PrivateRoute path="/about" component={About} />
        <Route path="/detail/:course" component={Detail} />
        <Route path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}
function Home({ location }) {
  console.log("接收参数：", location.state && location.state.foo);

  return (
    <div>
      <ul>
        <li>
          <Link to="/detail/web">Web</Link>
        </li>
        <li>
          <Link to="/detail/python">Python</Link>
        </li>
        <li>
          <Link to="/detail/java">Java</Link>
        </li>
      </ul>
    </div>
  );
}
function About() {
  return (
    <div>
      {/* 显示用户信息和订单 */}
      <h2>用户中心</h2>
      <div>
        <Link to="/about/me">个人信息</Link>
        <br />
        <Link to="/about/order">订单</Link>
      </div>
      <Switch>
        <Route path="/about/me" component={() => <div>我的信息</div>} />
        <Route path="/about/order" component={() => <div>订单信息</div>} />
        {/* 重定向 */}
        <Redirect to="/about/me" />
      </Switch>
    </div>
  );
}
// function Detail(props) {
function Detail({ match, history, location }) {
  /**
   * match      参数获取等路由信息
   * history    导航
   * location   url定位
   */
  console.log(match, history, location);
  return (
    <div>
      {/* 获取参数 */}
      {match.params.course}
      {/* 命令式导航 */}
      <button onClick={history.goBack}>返回</button>
      {/* <button onClick={() => history.push('/')}>返回首页</button> */}
      <button
        onClick={() => history.push({ pathname: "/", state: { foo: "bar" } })}
      >
        返回首页
      </button>
    </div>
  );
}

function NoMatch() {
  return <div>404页面</div>;
}

export default class RouteSample extends Component {
  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}
