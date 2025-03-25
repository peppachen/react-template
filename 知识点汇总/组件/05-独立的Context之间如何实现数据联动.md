### 1. 提升状态 (Lifting State Up)

- 将共享的状态提升到一个公共的父组件中，由父组件管理这些状态，并通过 props 将状态分发到多个独立的 Context Provider 中。

- **实现步骤：**

​	1. 创建一个状态管理器。

​	2. 在父组件中管理状态。

​	3. 将状态通过不同的 Context Provider 分发。

```tsx
import React, { createContext, useState, useContext } from 'react';



// 创建两个独立的 Context

const ContextA = createContext();

const ContextB = createContext();



function Parent() {

 const [sharedData, setSharedData] = useState('Shared State');



 return (

    <div>

   <ContextA.Provider value={{ sharedData, setSharedData }}>

​    <ContextB.Provider value={{ sharedData, setSharedData }}>

​     <ChildA />

​     <ChildB />

​    </ContextB.Provider>

   </ContextA.Provider>

  </div>

 );

}



function ChildA() {

 const { sharedData, setSharedData } = useContext(ContextA);

 return (

    <div>

   <h3>Child A</h3>

      <p>Shared Data: {sharedData}</p>

   <button onClick={() => setSharedData('Updated by A')}>Update</button>

  </div>

 );

}



function ChildB() {

 const { sharedData, setSharedData } = useContext(ContextB);

 return (

    <div>

   <h3>Child B</h3>

      <p>Shared Data: {sharedData}</p>

   <button onClick={() => setSharedData('Updated by B')}>Update</button>

  </div>

 );

}



export default Parent;
```

### 2. 使用事件总线 (Event Bus) 

- 通过事件总线 (如自定义事件机制或第三方库) 在 Context 之间传递数据。



- **实现步骤：**
  1. 创建一个事件管理工具，比如 Node.js 中的 EventEmitter 或自定义事件。
  2. 各个 Context 订阅特定的事件并监听。
  3. 触发事件来同步数据。

```tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

import { EventEmitter } from 'events';



// 创建事件总线

const eventBus = new EventEmitter();



const ContextA = createContext();

const ContextB = createContext();



function Parent() {

 return (

    <div>

   <ContextA.Provider value={{ eventBus }}>

​    <ContextB.Provider value={{ eventBus }}>

​     <ChildA />

​     <ChildB />

​    </ContextB.Provider>

   </ContextA.Provider>

  </div>

 );

}



function ChildA() {

 const { eventBus } = useContext(ContextA);

 const [data, setData] = useState('Initial Data A');



 useEffect(() => {

  eventBus.on('updateData', (newData) => setData(newData));

  return () => {

   eventBus.removeListener('updateData', setData);

  };

 }, [eventBus]);



 return (

    <div>

   <h3>Child A</h3>

      <p>Data: {data}</p>

   <button onClick={() => eventBus.emit('updateData', 'Updated by A')}>Update</button>

  </div>

 );

}



function ChildB() {

 const { eventBus } = useContext(ContextB);

 const [data, setData] = useState('Initial Data B');



 useEffect(() => {

  eventBus.on('updateData', (newData) => setData(newData));

  return () => {

   eventBus.removeListener('updateData', setData);

  };

 }, [eventBus]);



 return (

    <div>

   <h3>Child B</h3>

      <p>Data: {data}</p>

   <button onClick={() => eventBus.emit('updateData', 'Updated by B')}>Update</button>

  </div>

 );

}



export default Parent;
```

### 3. 使用全局状态管理工具



- 采用全局状态管理工具（如 Redux、Recoil、MobX、Zustand 等）来管理独立 Context 之间的数据联动。



### 4. 通过中间 Context 实现通信

- 创建一个额外的共享 Context，作为桥梁连接两个独立的 Context，实现数据联动。

```tsx
import React, { createContext, useState, useContext } from 'react';



// 中间共享 Context

const SharedContext = createContext();



const ContextA = createContext();

const ContextB = createContext();



function Parent() {

 const [sharedData, setSharedData] = useState('Shared Data');



 return (

  <SharedContext.Provider value={{ sharedData, setSharedData }}>

   <ContextA.Provider>

​    <ChildA />

   </ContextA.Provider>

   <ContextB.Provider>

​    <ChildB />

   </ContextB.Provider>

  </SharedContext.Provider>

 );

}



function ChildA() {

 const { sharedData, setSharedData } = useContext(SharedContext);

 return (

    <div>

   <h3>Child A</h3>

      <p>Shared Data: {sharedData}</p>

   <button onClick={() => setSharedData('Updated by A')}>Update</button>

  </div>

 );

}



function ChildB() {

 const { sharedData, setSharedData } = useContext(SharedContext);

 return (

    <div>

   <h3>Child B</h3>

      <p>Shared Data: {sharedData}</p>

   <button onClick={() => setSharedData('Updated by B')}>Update</button>

  </div>

 );

}



export default Parent;
```