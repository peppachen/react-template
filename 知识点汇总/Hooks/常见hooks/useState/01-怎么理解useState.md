### 用于在函数组件中存储和管理**状态**。

```tsx
/*
*	state:	当前的状态值
*	setState：更新状态的方法，类似于类组件中的 this.setState。
*	initialState：初始状态值，可以是基本类型、对象、数组，或一个返回状态值的函数。
*/
const [state,setState] = useState(initialState);
```

### 特性

#### 1. 状态组件是组件内部的

- 状态值是当前组件的私有值,只有通过 setState 才能改变。

#### 2. 异步更新

- React批量处理状态更新,提高性能。

#### 3. 可以多次声明

- 一个组件中可以调用多次useState，分别管理多个状态。
