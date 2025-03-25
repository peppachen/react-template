### 1. 深层次组件通信

- 用于解决深层次组件需要从父级获取数据的问题,减少props drilling（逐层传递 props）。

### 2. 全局的状态共享

- 适用于全局状态共享(如用户信息、主题设置等)

### 3. 配合useReducer管理复杂状态

- 将 useReducer 和 useContext 结合，可以实现类似于 Redux 的状态管理机制。

### 4. 动态更新数据

- 当 Context 的值变化时，订阅的组件会重新渲染，确保数据更新同步。

```tsx
//主题切换
import React, { useContext, createContext, useState } from 'react';

// 创建 Context 对象
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  // 使用 useContext 获取主题数据
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      当前主题：{theme}
    </button>
  );
}

export default App;
```

```tsx
// 结合 useReducer 实现状态管理
import React, { useReducer, createContext, useContext } from 'react';

// 创建 Context 对象
const CounterContext = createContext();

// 定义 reducer 函数
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

function CounterDisplay() {
  const { state } = useContext(CounterContext);
  return <h1>Count: {state.count}</h1>;
}

function CounterControls() {
  const { dispatch } = useContext(CounterContext);
  return (
    <div>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}

function App() {
  return (
    <CounterProvider>
      <CounterDisplay />
      <CounterControls />
    </CounterProvider>
  );
}

export default App;
```

### 