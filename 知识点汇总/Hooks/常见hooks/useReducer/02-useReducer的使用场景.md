### 1. 复杂的状态逻辑

- 当状态更新逻辑较复杂时，将逻辑集中到 reducer 中。

```tsx
// 假设有一个计数器状态管理，包含多个动作（增加、减少、重置等）：

import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

export default Counter;
```

### 2. 多个子状态依赖

- 当多个子状态之间有关系或依赖时，useReducer 可以让你更容易地管理它们。

```tsx
import React, { useReducer } from 'react';

const initialState = {
  name: '',
  email: '',
  isValid: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.payload };
    case 'setEmail':
      return { ...state, email: action.payload };
    case 'validate':
      return {
        ...state,
        isValid: state.name.length > 0 && state.email.includes('@'),
      };
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <input
        type="text"
        value={state.name}
        onChange={(e) => dispatch({ type: 'setName', payload: e.target.value })}
        placeholder="Name"
      />
      <input
        type="email"
        value={state.email}
        onChange={(e) => dispatch({ type: 'setEmail', payload: e.target.value })}
        placeholder="Email"
      />
      <button
        onClick={() => dispatch({ type: 'validate' })}
        disabled={!state.isValid}
      >
        Submit
      </button>
    </div>
  );
}

export default Form;
```

### 3. 状态更新步骤很多时

- 当状态更新涉及多个步骤或不同的 action 时，useReducer 可以帮助组织这些逻辑。

```tsx
import React, { useReducer } from 'react';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...state, loading: true };
    case 'success':
      return { ...state, loading: false, data: action.payload };
    case 'failure':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function fetchData(dispatch) {
  dispatch({ type: 'start' });
  fetch('/api/data')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'success', payload: data }))
    .catch((error) => dispatch({ type: 'failure', payload: error }));
}

function DataFetcher() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error.message}</p>}
      {state.data && <p>Data: {JSON.stringify(state.data)}</p>}
      <button onClick={() => fetchData(dispatch)}>Fetch Data</button>
    </div>
  );
}

export default DataFetcher;
```

### 4. 全局状态管理

- 通过与 useContext 结合使用，useReducer 也可以用于实现全局状态管理。

```tsx
import React, { useReducer, useContext } from 'react';

// 创建一个上下文
const GlobalStateContext = React.createContext();

// 定义初始状态和 reducer
const initialState = { user: null };

function reducer(state, action) {
  switch (action.type) {
    case 'setUser':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

// 组件1: 提供全局状态
function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// 组件2: 使用全局状态
function UserProfile() {
  const { state, dispatch } = useContext(GlobalStateContext);

  return (
    <div>
      {state.user ? (
        <p>Welcome, {state.user.name}</p>
      ) : (
        <button onClick={() => dispatch({ type: 'setUser', payload: { name: 'Alice' } })}>
          Set User
        </button>
      )}
    </div>
  );
}

export { GlobalStateProvider, UserProfile };
```

