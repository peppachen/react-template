### 1. useMemo与React.memo的区别

- `React.memo` 用于缓存组件渲染输出。
- `useMemo` 用于缓存计算结果

### 2. useMemo与useCallback的区别

| hooks        | useMemo                                  | useCallback                                                  |
| ------------ | ---------------------------------------- | ------------------------------------------------------------ |
| 用途         | 缓存计算结果,用于优化计算逻辑            | 缓存函数引用，用于避免子组件不必要的重新渲染                 |
| 返回值       | **缓存的计算结果**                       | **缓存的函数引用**                                           |
| 适用场景     | 列表排序或过滤、数据处理等大量计算的场景 | 函数作为 props 传递给子组件的场景(避免在依赖项未变化时重新生成函数) |
| 依赖数组变化 | 当依赖项发生变化时，重新计算值并返回     | 当依赖项发生变化时，返回新的函数引用                         |

### 1. useCallback与React.memo的区别

- `React.memo`**缓存子组件的渲染结果**;**只有当`props`发生变化时**,`React.memo` 包裹的子组件才会重新渲染。
- `useCallback`**缓存函数**避免父组件在每次渲染时生成新的函数引用;**只有当依赖数组中的变量发生变化时**，`useCallback` 才会重新生成函数。 

#### 注意事项

1. React.memo **的局限性**：

   -  仅浅比较 props。

   -  如果 props 是复杂对象（如数组、对象），需使用 useMemo 或 useCallback 缓存。

2. useCallback **的使用成本**：

   - 如果依赖数组过大或频繁更新，可能会增加复杂性。

   - 仅在函数作为 props 传递给子组件时使用。

#### 适合场景

- 父组件频繁更新，但子组件的 props 大部分时间保持不变。

- 子组件渲染开销较大（如复杂的 DOM 或图表渲染）。

### 2. useCallback如何与 React.memo 搭配使用

- **问题** : 当父组件重新渲染时，即使子组件的 props 未发生变化，子组件也可能被重新渲染。
- **解决**:
  - 使用 `React.memo`，仅在 `props` 变化时重新渲染子组件。
  - 使用 `useCallback` 缓存回调函数，避免回调函数因父组件的重渲染而导致子组件重复渲染。

```tsx
//父组件
import React, { useState, useCallback } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 使用 useCallback 缓存函数
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // 空依赖，函数不会重新创建

  return (
    <div>
      <h1>父组件</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>增加 Count</button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入一些文字"
      />
      {/* 子组件 */}
      <ChildComponent onClick={handleClick} />
    </div>
  );
};

export default ParentComponent;

//子组件
import React from 'react';

// 使用 React.memo 包裹子组件
const ChildComponent = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log('子组件重新渲染');
  return (
    <div>
      <h2>子组件</h2>
      <button onClick={onClick}>点击子组件按钮</button>
    </div>
  );
});

export default ChildComponent;
```

