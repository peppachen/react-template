### 1. 操作DOM元素

- 使用useRef获取并操作原生DOM节点。

```tsx
import { useRef } from 'react';

function TextInputWithFocus() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    // 通过 ref 直接访问 DOM 元素
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

### 2. 存储状态值而不引起重新渲染

- useRef 可作为存储值的容器，避免因为状态改变导致组件重新渲染。

```tsx
import { useRef, useState } from 'react';

function Counter() {
  const countRef = useRef(0); // 用于记录计数
  const [renderCount, setRenderCount] = useState(0);

  const increment = () => {
    countRef.current += 1;
    console.log(`Count: ${countRef.current}`);
  };

  return (
    <div>
      <p>Rendered: {renderCount} times</p>
      <button onClick={() => setRenderCount((prev) => prev + 1)}>Re-render</button>
      <button onClick={increment}>Increment Count (No Re-render)</button>
    </div>
  );
}
```

### 3. 保存组件实例或函数引用

- 用于避免闭包问题，或跨渲染周期存储某个值。

```tsx
import { useRef, useEffect } from 'react';

function Timer() {
  const intervalRef = useRef(null);//存储定时器的 ID，确保在清理阶段能够正确清除

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log('Tick');
    }, 1000);

    return () => clearInterval(intervalRef.current); // 清理定时器
  }, []);

  return <div>Timer Running...</div>;
}
```

### 4. 与 forwardRef 一起使用，透传 ref

- 在父组件中控制子组件的 DOM 节点。

```tsx
import React, { useRef, forwardRef } from 'react';

//forwardRef 将父组件的 ref 透传给子组件中的 DOM 元素。
const FancyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

function Parent() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={focusInput}>Focus Child Input</button>
    </div>
  );
}
```

