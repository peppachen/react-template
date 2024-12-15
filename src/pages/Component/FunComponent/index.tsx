import { Button } from 'antd';
import { useState } from 'react';

const FunComponent = () => {
  const [maxValue, setMaxValue] = useState<number | null>(null);

  // 使用箭头函数和内置方法优化逻辑
  const getMax = (arr: number[]): void => {
    const max = Math.max(...arr);
    setMaxValue(max);
  };

  return (
    <div>
      <Button onClick={() => getMax([1, 2, 5, 6, 7])}>点击获取最大值</Button>
      {maxValue !== null && <p>最大值是：{maxValue}</p>}
    </div>
  );
};

export default FunComponent;
