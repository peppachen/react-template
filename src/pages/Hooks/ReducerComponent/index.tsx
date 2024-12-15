import { Button } from 'antd';
import { useReducer } from 'react';

// 定义 reducer 函数
const reducer = (state: { count: number }, action: { type: any }) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error('Unknown action type');
  }
};

export default function ReducerComponent() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <Button onClick={() => dispatch({ type: 'increment' })}>+</Button>
      <Button onClick={() => dispatch({ type: 'decrement' })}>-</Button>
      <Button onClick={() => dispatch({ type: 'reset' })}>Reset</Button>
    </div>
  );
}
