import { Image, Menu } from 'antd';
import React from 'react';

import textForApp from '../../constants/translate';
import { IRule, LanguageType } from '../../types/general';
import { getModuleRules } from '../../utils/rulesControllers';
import Spinner from '../Spinner/Spinner';
import style from './Rule.module.scss';

interface IRuleProps {
    filter: string;
    lang: LanguageType;
}

interface IRuleState {
    rules: any[];
    isLoading: boolean;
    openKeys: any[];
}

export default class Rule extends React.PureComponent<IRuleProps, IRuleState> {
    constructor(props) {
        super(props);
        this.state = {
            rules: [],
            isLoading: true,
            openKeys: [],
        };
    }

    componentDidMount() {
        this.getSectionRules();
    }

    getSectionRules = async () => {
        const { filter } = this.props;
        const content = await getModuleRules(filter);
        const rules = content?.rules || [];

        this.setState({ rules, isLoading: false });
    };

    onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({ openKeys: latestOpenKey ? [latestOpenKey] : [] });
    };

    render() {
        const { rules, isLoading, openKeys } = this.state;
        const { lang } = this.props;

        if (isLoading) {
            return <Spinner lang={lang}/>;
        }

        if (!rules.length) {
            return <h3>{textForApp[lang].message[3]}</h3>;
        }

        return (
            <div className={style.rule}>
                <Menu mode="inline"
                      openKeys={openKeys}
                      onOpenChange={this.onOpenChange.bind(this)}
                      style={{ width: '100%' }}
                      items={
                          rules.sort((a, b) => a.id.localeCompare(b.id)).map((rule, index) => {
                              return {
                                  label: `Unit ${index + 1}`,
                                  key: `Unit-${index}`,
                                  children: [
                                      {
                                          label: rule.unitRules.map((el: IRule) => {
                                              const { content, name } = el;

                                              return (<div key={`${rule.id}-${name}`}>
                                                  <h2>{name}</h2>
                                                  <div className={style['image-wrapper']}>
                                                      {content.map((img) => <Image src={`/${img}`} key={img}/>)}
                                                  </div>
                                              </div>);
                                          }),
                                          key: `item-${index + 1}`,
                                          className: 'rules-item',
                                          disabled: true,
                                      },
                                  ],
                              };
                          })
                      }/>
            </div>
        );
    }
}
