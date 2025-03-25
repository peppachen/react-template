### 什么是useContext

- useContext 是 React 提供的一个 **Hook**，用于订阅 **Context 对象**。
- 它可以帮助组件树的深层组件直接访问 Context 中的数据，避免繁琐的 props 层层传递。

```tsx
/*
* SomeContext：通过 React.createContext 创建的 Context 对象。
*	value：当前 Context 中存储的数据。
*/
const value = useContext(SomeContext)
```

