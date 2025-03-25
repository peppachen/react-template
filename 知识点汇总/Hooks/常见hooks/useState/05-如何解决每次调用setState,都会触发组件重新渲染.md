### 结合`useMemo`或者`React.memo`

```tsx
/*
*	useMemo
* 缓存基于 useState 状态的计算结果，避免重复执行性能开销大的计算逻辑。
*/
import React, { useState, useMemo } from 'react';

const ExpensiveComponent = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // 使用 useMemo 缓存计算结果，只有 count 变化时才重新计算
  const expensiveCalculation = useMemo(() => {
    console.log('Expensive calculation triggered');
    return count * 10;
  }, [count]);

  return (
    <div>
      <p>Expensive Calculation: {expensiveCalculation}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment Count</button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter some text"
      />
    </div>
  );
};

export default ExpensiveComponent;

/* 
*	React.memo 
* React.memo 可用于包裹子组件，避免其在父组件状态更新时进行不必要的重新渲染。
*/

import React, { useState, memo } from 'react';

const ChildComponent = memo(({ count }: { count: number }) => {
  console.log('ChildComponent rendered');
  return <p>Count from parent: {count}</p>;
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <ChildComponent count={count} />
      <button onClick={() => setCount((prev) => prev + 1)}>Increment Count</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter some text"
      />
    </div>
  );
};

export default ParentComponent;
```

#### 