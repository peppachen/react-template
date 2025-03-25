### React Router v6 与 v5 有哪些不同

- 使用 <Routes> 替代 <Switch>。

- 路由声明更简洁，支持嵌套路由。

- useNavigate 替代 useHistory。

- <Redirect> 被替换为 <Navigate>。

- 更强的类型支持和一致性。

### 如何处理嵌套路由和编程式导航 (v6)

#### 嵌套路由

```tsx
<Routes>

 <Route path="dashboard" element={<Dashboard />}>

  <Route path="settings" element={<Settings />} />

 </Route>

</Routes>
```

#### 编程式导航

```tsx
const navigate = useNavigate();

navigate('/home');
```



