export default {
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: true
      }
    ]
  ],
  routes: [
    // 相对路径是相对于pages
    { path: "/", component: "./index" },
    { path: "/goods", component: "./goods" },
    // 路由守卫
    {
      path: "/about",
      component: "./about",
      Routes: ["./routes/PrivateRoute.js"] // 这里的是相对于根目录的，且后缀名不可省略
    },
    {
      path: "users",
      component: "./users/_layout",
      routes: [
        { path: "/users/", component: "./users/index" },
        { path: "/users/:id", component: "./users/$id" }
      ]
    },
    { path: "login", component: "./login" },
    { component: "./notfound" }
  ]
};
