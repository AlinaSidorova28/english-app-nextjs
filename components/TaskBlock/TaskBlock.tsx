import { Menu } from 'antd';
import React from 'react';

import { BOOKS } from '../../constants/constants';
import textForApp from '../../constants/translate';
import { LanguageType } from '../../types/general';
import { getUnitsByModuleId } from '../../utils/TasksControllers';
import NavLink from '../NavLink/NavLink';
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
            return <Spinner lang={lang}/>;
        }

        if (!units.length) {
            return <h3>{textForApp[lang].message[3]}</h3>;
        }

        return (
            <div className={style['task-block']}>
                <Menu mode="inline"
                      openKeys={openKeys}
                      onOpenChange={this.onOpenChange.bind(this)}
                      style={{ width: '100%' }}
                      items={
                          units.sort((a, b) => a.id.localeCompare(b.id)).map((unit, index) => {
                              const item = {
                                  label: `Unit ${index + 1}. ${unit.name}`,
                                  key: `Unit-${index}`,
                                  children: [
                                      {
                                          label: <NavLink href={`/tasks/${unit.sb}`}>
                                              <a>{BOOKS.sb}</a>
                                          </NavLink>,
                                          key: `sb-${index + 1}`,
                                          className: 'task-item',
                                      },
                                      {
                                          label: <NavLink href={`/tasks/${unit.wb}`}>
                                              <a>{BOOKS.wb}</a>
                                          </NavLink>,
                                          key: `wb-${index + 1}`,
                                          className: 'task-item',
                                      },
                                  ],
                              };

                              if (index % 2) {
                                  item.children.push({
                                      label: <NavLink href={`/tasks/${unit.tb}`}>
                                          <a>{`${BOOKS.tb} ${index}-${index + 1}`}</a>
                                      </NavLink>,
                                      key: `tb-${index + 1}`,
                                      className: 'task-item',
                                  });
                              }

                              return item;
                          })
                      }/>
            </div>
        );
    }
}
