### 什么是useReducer

- 用于管理**复杂状态逻辑**的场景

```tsx
/*
*	reducer: 一个纯函数，接收当前状态和 action，返回新的状态。
* initialState: 状态的初始值。
*	init（可选）: 一个懒加载函数，用于动态计算初始状态。
*	state: 当前状态值。
*	dispatch: 用于分发 action，触发状态更新。
*/
const [state, dispatch] = useReducer(reducer, initialState, init);
```
