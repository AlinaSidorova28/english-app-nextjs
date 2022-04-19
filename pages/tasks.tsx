import React, { PureComponent } from 'react';

export default class Tasks extends PureComponent {
    render() {
        // @ts-ignore
        return <div>Tasks {this.props.lang}</div>;
    }
}
