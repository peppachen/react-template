### 什么是useMemo

- useMemo 是 React 提供的一个 **Hook**，**用于缓存计算结果**。

- 它可以优化性能，避免每次渲染时重复执行昂贵的计算。

```tsx
/*
 * calculateValue: 一个返回值的函数，用于生成需要缓存的计算结果。
 * dependencies： 依赖数组，useMemo 会在依赖发生变化时重新计算。
 */
const cachedValue = useMemo(calculateValue, dependencies);
```

### useMemo 的核心作用

#### 缓存计算结果：

- 只有在依赖项发生变化时，`useMemo` 才会重新计算` calculateValue` 的返回值；否则直接返回上次缓存的结果。
