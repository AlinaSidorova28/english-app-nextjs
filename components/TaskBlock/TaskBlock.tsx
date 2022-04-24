import { Menu } from 'antd';
import { SubMenu } from 'rc-menu';
import React from 'react';

import textForApp from '../../constants/translate';
import { LanguageType } from '../../types/general';
import redirectTo from '../../utils/redirectTo';
import { getUnitsByModuleId } from '../../utils/TasksControllers';
import Spinner from '../Spinner/Spinner';
import style from './TaskBlock.module.scss';

interface ITaskBlockProps {
    filter: string;
    lang: LanguageType;
}

interface ITaskBlockState {
    units: any[];
    isLoading: boolean;
    openKeys: any[];
}

export default class TaskBlock extends React.PureComponent<ITaskBlockProps, ITaskBlockState> {
    constructor(props) {
        super(props);
        this.state = {
            units: [],
            isLoading: true,
            openKeys: [],
        };
    }

    componentDidMount() {
        this.getUnits();
    }

    getUnits = async () => {
        const { filter } = this.props;
        const content = await getUnitsByModuleId(filter);
        const units = content?.units || [];

        this.setState({ units, isLoading: false });
    };

    onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({ openKeys: latestOpenKey ? [latestOpenKey] : [] });
    };

    render() {
        const { units, isLoading, openKeys } = this.state;
        const { lang } = this.props;

        if (isLoading) {
            return <Spinner />;
        }

        if (!units.length) {
            return <h3>{textForApp[lang].message[3]}</h3>;
        }

        return (
            <div className={style['task-block']}>
                <Menu mode="inline" openKeys={openKeys} onOpenChange={this.onOpenChange.bind(this)} style={{ width: '100%' }}>
                    {units.sort((a, b) => a.id.localeCompare(b.id)).map((unit, index) => {
                        return (<SubMenu key={`Unit-${index}`} title={`Unit ${index + 1}. ${unit.name}`}>
                            <Menu.Item className={'task-item'}
                                       key={`sb-${index + 1}`}
                                       onClick={() => redirectTo(`/tasks/${unit.sb}`)}>
                                Student’s book
                            </Menu.Item>
                            <Menu.Item className={'task-item'}
                                       key={`wb-${index + 1}`}
                                       onClick={() => redirectTo(`/tasks/${unit.wb}`)}>
                                Workbook
                            </Menu.Item>
                            {index % 2
                                ? <Menu.Item className={'task-item'}
                                             key={`tb-${index + 1}`}
                                             onClick={() => redirectTo(`/tasks/${unit.tb}`)}>
                                    {`Test ${index}-${index + 1}`}
                                </Menu.Item>
                                : null}
                        </SubMenu>);
                    })}
                </Menu>
            </div>
        );
    }
}
