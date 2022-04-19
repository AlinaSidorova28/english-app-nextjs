import * as React from 'react';

import { Collapse } from '../Collapse/Collapse';
import { CustomLink } from '../CustomLink/CustomLink';
import { SimpleError } from '../SimpleError/SimpleError';
import style from './GlobalErrorCatchHandler.module.scss';

interface IState {
    error: Error;
    errorInfo: React.ErrorInfo;
}

export class GlobalErrorCatchHandler extends React.Component<any, IState> {
    state = {
        error: {} as Error,
        errorInfo: {} as React.ErrorInfo,
    };

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({
            error, errorInfo,
        });
    }

    render(): React.ReactNode {
        return this.state.errorInfo && this.state.errorInfo.componentStack
            ? <ErrorView error={this.state.error}/>
            : this.props.children;
    }
}

export const ChunksErrorView = (error) => {
    const reloadLocation = () => {
        location.reload();
    };

    const errorView = <SimpleError error={error} />;

    return <div className={style.chunksError}>
        <div className={style.main}>
            Пожалуйста, перезагрузите страницу. Если ошибка не устранилась, проверьте свое
            подключение.&nbsp;
            <CustomLink onClick={reloadLocation}>
                Перезагрузить сейчас
            </CustomLink>
        </div>
        <div className={style.metaData}>
            <div><b>path:</b> {location.href}</div>
        </div>

        {error
            ? <Collapse title={'Ошибка'} expandText={'Показать ошибку'} children={errorView} initialExpanded={false}/>
            : null
        }
    </div>;
};

export const ErrorView = (props: any) => {
    const { error = {} } = props;

    return <div className={style.error}>
        <div>status: <span>{error.status || error.message}</span></div>
        <div>message: <span>{error.message || error.error} {error.statusText}</span></div>
        <div>
            {(error.stack + '')
                .split('\n').map((_el: string, index: number) =>
                    <div key={index}><span>{_el}</span></div>)}
        </div>
    </div>;
};
