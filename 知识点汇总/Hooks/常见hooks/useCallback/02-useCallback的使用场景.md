### 1. 避免子组件不必要的重新渲染

当函数作为 props 传递给子组件时，useCallback 可以确保传递的函数引用不变，避免子组件重复渲染。

### 2. 优化性能

在需要频繁更新的场景中（如列表渲染），使用 useCallback 避免创建过多不必要的函数。

### 3. 事件处理函数

对于组件内部的事件处理函数，缓存后可以减少不必要的函数重新创建。

```tsx
import { useCallback } from "react";

export default function ProductPage({ productId, referrer, theme }) {
  // 使用 useCallback 缓存提交处理函数
  const handleSubmit = useCallback(
    (orderDetails) => {
      post(`/product/${productId}/buy`, {
        referrer,
        orderDetails,
      });
    },
    [productId, referrer], // 依赖项：productId 和 referrer
  );

  return (
    <div style={{ background: theme }}>
      <h1>Product ID: {productId}</h1>
      <button onClick={() => handleSubmit({ quantity: 1 })}>Buy Now</button>
    </div>
  );
}
```
