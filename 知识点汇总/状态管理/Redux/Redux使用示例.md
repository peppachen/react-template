#### 安装 Redux 和工具包

```tsx
npm install redux react-redu
```



#### 设置 Store 和 Reducer

```tsx
// reducer.js

const initialState = { count: 0 };



function counterReducer(state = initialState, action) {

 switch (action.type) {

  case 'INCREMENT':

   return { count: state.count + 1 };

  case 'DECREMENT':

   return { count: state.count - 1 };

  default:

   return state;

 }

}



export default counterReducer;
```



#### 创建 Store

```tsx
// store.js

import { createStore } from 'redux';

import counterReducer from './reducer';



const store = createStore(counterReducer);



export default store;
```



#### React 集成 Redux

```tsx
// App.js

import React from 'react';

import { Provider, useSelector, useDispatch } from 'react-redux';

import store from './store';



function Counter() {

 const count = useSelector((state) => state.count); // 读取状态

 const dispatch = useDispatch(); // 发送动作



 return (

    <div>

      <p>Count: {count}</p>

   <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>

   <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>

  </div>

 );

}



function App() {

 return (

  <Provider store={store}>

   <Counter />

  </Provider>

 );

}



export default App;
```

###  适用场景

- **复杂的全局状态管理**：如用户信息、主题设置、购物车等需要在多个组件间共享的状态。

- **组件嵌套深、需要跨层级传递数据**：避免通过 props 一层一层传递。

 -**状态变化频繁且需追踪变化过程**：如异步请求、数据流动复杂的场景。