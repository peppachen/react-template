import { Button, Card, Input, List, Tag } from 'antd';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

/**
 *	useState：
 *	const [time, setTime] = useState(0);：管理计时器的时间。
 *	const [taskName, setTaskName] = useState('');：管理任务输入框的值。
 *
 *	useRef：
 *	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);：用于存储定时器的 *，防止重新启动定时器。
 *
 *	useCallback：
 *	用于避免函数在每次渲染时重新创建。比如 startTimer, pauseTimer, resetTimer, addTask, *oveTask 等函数。
 *
 *	useReducer：
 *	const [tasks, dispatch] = useReducer(taskReducer, []);：用于管理任务列表的状态，*kReducer 处理任务的增删操作。
 *
 *	useEffect：
 *	useEffect(() => { ... }, [pauseTimer]);：用于清理副作用，如组件卸载时清理定时器。
 */
// 定义任务的状态和操作
type Task = { id: number; name: string };
type Action =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'REMOVE_TASK'; payload: number };

// 任务的 reducer 函数
const taskReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      // 添加任务，生成唯一的 ID
      return [...state, { id: Date.now(), name: action.payload }];
    case 'REMOVE_TASK':
      // 删除任务
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

const Hooks = () => {
  // 计时器相关状态
  const [time, setTime] = useState(0); // 使用 useState 管理计时器的时间
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null); // 使用 useRef 存储定时器 ID，避免重复创建

  // 任务列表相关状态
  const [taskName, setTaskName] = useState(''); // 输入框内容，使用 useState
  const [tasks, dispatch] = useReducer(taskReducer, []); // 使用 useReducer 管理任务列表

  // 启动计时器
  const startTimer = useCallback(() => {
    if (timerRef.current) return; // 防止重复启动计时器
    timerRef.current = setInterval(() => setTime((prev) => prev + 1), 1000); // 每秒更新一次时间
  }, []);

  // 暂停计时器
  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // 清除定时器
      timerRef.current = null;
    }
  }, []);

  // 重置计时器
  const resetTimer = useCallback(() => {
    pauseTimer(); // 停止计时器
    setTime(0); // 将时间重置为 0
  }, [pauseTimer]);

  // 清除计时器（组件卸载时）
  useEffect(() => {
    return () => {
      pauseTimer(); // 组件卸载时清除定时器
    };
  }, [pauseTimer]);

  // 添加任务
  const addTask = useCallback(() => {
    if (taskName.trim()) {
      dispatch({ type: 'ADD_TASK', payload: taskName }); // 触发 ADD_TASK 操作
      setTaskName(''); // 清空输入框
    }
  }, [taskName]);

  // 删除任务
  const removeTask = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_TASK', payload: id }); // 触发 REMOVE_TASK 操作
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {/* 计时器功能 */}
      <Card title="计时器" style={{ marginBottom: '20px' }}>
        <Tag color="blue" style={{ marginBottom: '10px' }}>
          当前时间: {time}s {/* 显示计时器的当前时间 */}
        </Tag>
        <div>
          <Button
            type="primary"
            onClick={startTimer} // 启动计时器
            style={{ marginRight: '8px' }}
          >
            开始
          </Button>
          <Button onClick={pauseTimer} style={{ marginRight: '8px' }}>
            暂停
          </Button>
          <Button danger onClick={resetTimer}>
            重置
          </Button>
        </div>
      </Card>

      {/* 任务列表功能 */}
      <Card title="任务列表">
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <Input
            placeholder="输入任务名称"
            value={taskName} // 显示输入框的内容
            onChange={(e) => setTaskName(e.target.value)} // 更新任务名称
            style={{ marginRight: '8px', flex: 1 }}
          />
          <Button type="primary" onClick={addTask}>
            添加任务 {/* 点击添加任务 */}
          </Button>
        </div>
        <List
          bordered
          dataSource={tasks} // 任务列表数据
          renderItem={(task) => (
            <List.Item
              key={task.id} // 给每个任务加上唯一的 key
              actions={[
                // eslint-disable-next-line react/jsx-key
                <Button type="link" danger onClick={() => removeTask(task.id)}>
                  删除 {/* 点击删除任务 */}
                </Button>,
              ]}
            >
              {task.name} {/* 显示任务名称 */}
            </List.Item>
          )}
          locale={{ emptyText: '暂无任务' }} // 如果任务列表为空，显示的提示文本
        />
      </Card>
    </div>
  );
};

export default Hooks;
