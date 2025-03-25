### 什么是useRef

- 用于创建可变的 **ref 对象**，即使组件重新渲染，ref 对象的 .current 值也不会改变。

```tsx
/*
* initialValue：初始值，通常为 null（如果用于 DOM）或自定义值。
*	refContainer：返回一个对象 { current: initialValue }。
*/
const refContainer = useRef(initialValue);
```
