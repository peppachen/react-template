### 1. 基本执行流程

#### 首次渲染后

- useEffect 会在组件完成渲染后执行。它不会阻塞浏览器绘制，因此不会影响页面首次加载的性能。

#### 依赖更新时

- 如果依赖项（deps）发生变化，React 会重新执行 useEffect 中的副作用逻辑。

#### 组件卸载时

- React 会执行上一次渲染的 useEffect 清理函数（如果存在），用于清理副作用。

### 2. 执行时机

#### 1. 首次渲染后执行

- useEffect 不会在组件的 **渲染阶段** 执行，而是在 **DOM 更新完成后** 执行。

- 类似于 componentDidMount（首次挂载）和 componentDidUpdate（依赖更新）。

```tsx
useEffect(() => {

 console.log('组件挂载或更新完成');

});
```

#### 2. 依赖变化时执行

- 如果传递了依赖数组（deps），useEffect 会在依赖项发生变化时重新执行。

- 清理函数会在依赖变化之前执行。

```tsx
useEffect(() => {

 console.log('依赖项更新');

 return () => {

  console.log('清理之前的副作用');

 };

}, [dependency]);
```

#### 3. 组件卸载时清理

- 当组件卸载时，React 会执行 useEffect 的清理函数。

- 类似于类组件的 componentWillUnmount。

```tsx
useEffect(() => {

 const interval = setInterval(() => {

  console.log('计时中...');

 }, 1000);



 return () => {

  clearInterval(interval); // 清理定时器

  console.log('组件卸载，清理副作用');

 };

}, []);
```

#### 3. 依赖数组的作用

useEffect 的第二个参数是依赖数组（deps），它控制 useEffect 的执行条件：

##### 1. 没有依赖数组

- 如果不传递依赖数组，useEffect 会在每次渲染后执行（包括首次渲染和每次状态更新）。

```tsx
useEffect(() => {

 console.log('每次渲染都会执行');

});
```

#### 2. 空依赖数组（**[]**）

- 如果传递空数组，useEffect 只会在组件挂载时执行一次（类似 componentDidMount），不会响应后续的状态或属性变化。

```tsx
useEffect(() => {

 console.log('仅在挂载时执行');

}, []);
```

####	3. 特定依赖项（**[dep1, dep2]**）

- 只有当数组中的某个依赖项发生变化时，useEffect 才会执行。

- React 会通过对比依赖项的 **浅比较** 来决定是否重新运行副作用。

```tsx
useEffect(() => {

 console.log('依赖项变化时执行');

}, [dependency1, dependency2]);
```

#### 4. 清理函数的执行机制

##### 1. 在依赖更新时

- React 会先执行上一次 useEffect 的清理函数，再执行当前的副作用。

```tsx
useEffect(() => {

 console.log('副作用开始');

 return () => {

  console.log('清理之前的副作用');

 };

}, [dependency]);
```

##### 2. 在组件卸载时

- 清理函数会在组件卸载时执行，清理所有未完成的副作用。

```tsx
useEffect(() => {

 const timer = setInterval(() => {

  console.log('运行中...');

 }, 1000);



 return () => {

  clearInterval(timer); // 清理定时器

 };

}, []);
```

#### 5. React 的批处理更新

- 在事件处理函数中，React 会对状态更新进行 **批处理**，从而减少渲染次数。

- 但是 useEffect 始终会在 DOM 更新完成后才执行。