import React, { PureComponent } from 'react';

export default class Profile extends PureComponent {
    render() {
        // @ts-ignore
        return <div>Profile {this.props?.lang}</div>;
    }
}
