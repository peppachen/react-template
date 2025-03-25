### 1. 优化性能

当计算开销较大且依赖变化较少时，使用 useMemo 避免不必要的重复计算。

### 2. 依赖缓存结果

- 在渲染函数中使用某些计算结果，但这些结果在依赖不变时始终保持一致。

- 只有在依赖项发生变化时，useMemo 才会重新计算 calculateValue 的返回值；否则直接返回上次缓存的结果。
- 确保依赖项数组中包含计算逻辑中使用到的所有响应式变量，避免缓存过期。

### 3. 避免子组件的重复渲染

与 `React.memo` 搭配，避免将动态计算值传递给子组件导致不必要的渲染。

```tsx
import { useMemo } from "react";

function TodoList({ todos, tab, theme }) {
  // 使用 useMemo 缓存筛选后的待办事项
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

  return (
    <div style={{ background: theme }}>
      <h1>Todo List</h1>
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

function filterTodos(todos, tab) {
  if (tab === "all") return todos;
  return todos.filter((todo) =>
    tab === "completed" ? todo.completed : !todo.completed,
  );
}
```

