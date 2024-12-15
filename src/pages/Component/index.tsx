import { Card } from 'antd';
import { useEffect, useState } from 'react';
import ClassComponent from './ClassComponent';
import FunComponent from './FunComponent';
const Component = () => {
  function Timer() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
      // 清理函数，始终清除 interval
      return () => clearInterval(interval);
    }, []); // 空依赖数组，确保只设置一次定时器
    useEffect(() => {
      if (count > 1000) {
        setCount(0);
      }
    }, [count]); // 监听 count 的变化
    return <div>{count}</div>;
  }
  return (
    <div>
      <Card
        title="
        函数组件"
      >
        <FunComponent />
      </Card>
      <Card
        title="
        类组件"
      >
        <ClassComponent tips="class component" />
      </Card>
      <Card
        title="
        Effect定时器"
      >
        <Timer />
      </Card>
    </div>
  );
};
export default Component;
