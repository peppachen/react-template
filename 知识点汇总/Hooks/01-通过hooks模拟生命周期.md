### 模拟所有生命周期

```tsx
import React, { useEffect, useState } from "react";

function Component() {
  const [count, setCount] = useState(0);

  // []：模拟 componentDidMount
  useEffect(() => {
    console.log("组件挂载");

    return () => {
      // return () => {}：模拟 componentWillUnmount
      console.log("组件卸载");
    };//清理函数需要无条件返回，以确保任何依赖更新或组件卸载时都能正确清理资源。
  }, []);//[]: 空依赖数组适用于只在初始渲染时执行的副作用。

  // [deps]：模拟 componentDidUpdate
  useEffect(() => {
    console.log("count 更新为:", count);
  }, [count]); 

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加 Count</button>
    </div>
  );
}

export default Component;
```

### 1. 模拟 componentDidMount

- `componentDidMount` 是类组件中的生命周期方法，用于组件挂载时执行一次。

- 可以通过传递空依赖数组 [] 实现。

- **使用场景**：
  - 数据初始化。

  - 添加事件监听器。

  - 初始化外部资源。

```tsx
import React, { useEffect } from "react";

function Component() {
  useEffect(() => {
    console.log("组件挂载");

    // 可以放置 API 请求、订阅等逻辑
  }, []); // 空依赖数组

  return <div>Hello, World!</div>;
}
```

### 2. 模拟componentDidUpdate

- `componentDidUpdate` 是类组件中用于组件更新后的逻辑。
- 可以通过依赖数组` [dependencies]` 实现，仅在依赖变化时执行。
- 使用场景
  - 监测状态或属性变化。
  - 执行依赖项变化后的操作。

```tsx
import React, { useEffect, useState } from "react";

function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("count 更新为:", count);

    // 可以放置依赖变化后的逻辑
  }, [count]); // 依赖 count

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加 Count</button>
    </div>
  );
}
```

### 3. 模拟 componentWillUnmount

- componentWillUnmount 是类组件中用于清理逻辑的生命周期方法。

- 可以通过 useEffect 返回一个清理函数实现。
- 使用场景
  - 移除事件监听器。
  - 清理定时器。

```tsx
import React, { useEffect } from "react";

function Component() {
  useEffect(() => {
    console.log("组件挂载");

    return () => {
      console.log("组件卸载");

      // 清理逻辑，例如移除事件监听器
    };
  }, []); // 空依赖数组

  return <div>Hello, World!</div>;
}
```

### 4. 模拟 componentDidMount + componentDidUpdate

- 在组件挂载和更新时都执行某些逻辑，可以省略依赖数组。

```tsx
import React, { useEffect, useState } from "react";

function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("组件挂载或 count 更新:", count);

    // 每次渲染都会执行
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加 Count</button>
    </div>
  );
}
```
