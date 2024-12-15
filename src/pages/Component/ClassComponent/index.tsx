import React from 'react';

interface Props {
  tips: string;
}
export default class ClassComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const { tips } = this.props;
    return (
      <div>
        <h1>{tips}</h1>
      </div>
    );
  }
}
