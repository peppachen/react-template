import { Button, Card } from 'antd';
import React, { Component, useState } from 'react';

/**
 * 函数组件
 * 使用 useState 钩子来定义和更新状态（count）。
 * 使用 Button 组件分别绑定 increment 和 decrement 事件，控制 count 的增减。
 */
const FunctionComponent: React.FC = () => {
  // 使用 useState 钩子来定义计数器的状态
  const [count, setCount] = useState(0);

  // 增加计数
  const increment = () => {
    setCount(count + 1);
  };

  // 减少计数
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>计数器（函数组件）</h1>
      <p>当前计数: {count}</p>
      <Button type="primary" onClick={increment} style={{ marginRight: 8 }}>
        增加
      </Button>
      <Button type="default" onClick={decrement}>
        减少
      </Button>
    </div>
  );
};

/**
 * 类组件
 * 通过类组件的构造函数初始化 state。
 * 使用 this.setState 来更新状态（count）。
 * 在 render 方法中返回 UI 和事件绑定。
 */
interface State {
  count: number;
}

class ClassComponent extends Component<object, State> {
  state: { count: number };
  constructor(props: object) {
    super(props);
    // 在构造函数中初始化状态
    this.state = {
      count: 0,
    };
  }

  // 增加计数
  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  // 减少计数
  decrement = () => {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  };

  render() {
    return (
      <div>
        <h1>计数器（类组件）</h1>
        <p>当前计数: {this.state.count}</p>
        <Button onClick={this.increment} style={{ marginRight: 8 }}>
          增加
        </Button>
        <Button onClick={this.decrement}>减少</Button>
      </div>
    );
  }
}

// 定时器组件（示例：Effect钩子）
const Timer: React.FC = () => {
  const [time, setTime] = useState(0);

  // 使用 useEffect 来设置定时器，每秒更新一次时间
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // 在组件卸载时清除定时器
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>计时器（Effect定时器）</h1>
      <p>当前时间: {time}s</p>
    </div>
  );
};

// 组件组合：展示函数组件、类组件和定时器组件
const ComponentDemo = () => {
  return (
    <div>
      <Card title="函数组件" style={{ marginBottom: '20px' }}>
        <FunctionComponent />
      </Card>
      <Card title="类组件" style={{ marginBottom: '20px' }}>
        <ClassComponent />
      </Card>
      <Card title="Effect定时器">
        <Timer />
      </Card>
    </div>
  );
};

export default ComponentDemo;
