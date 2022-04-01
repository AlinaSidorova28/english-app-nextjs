// import './Copy.module.scss';
//
// import React, { ReactNode } from 'react';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import ReactTooltip from 'react-tooltip';
//
// import { ONE_SECOND } from '../../constants/constants';
//
// const formattedText = (props: any) => {
//     return props.text || props.children;
// };
//
import React, { ReactNode } from 'react';

interface IProps {
    customTimeout?: number;
    internalTooltipId?: string;
    children: ReactNode;
    className?: string;
    text?: string;
    onCopy?: (ref) => void;
    externalTooltipId?: string;
    tooltipConfig?: {
        overridePosition?: (position: { left: number; top: number }) => { left: number; top: number };
        place?: string;
    };
}

export class Copy extends React.Component<IProps, any> {
//     tooltip = React.createRef<HTMLSpanElement>()
//     timeout: any;
//
//     componentWillUnmount(): void {
//         clearTimeout(this.timeout);
//         this.tooltip?.current && ReactTooltip.hide(this.tooltip.current);
//     }
//
//     render() {
//         const { customTimeout, externalTooltipId, internalTooltipId, className, tooltipConfig, children } = this.props;
//
//         return <>
//             <CopyToClipboard text={formattedText(this.props)}
//                              onCopy={() => {
//                                  if (this.tooltip?.current) {
//                                      ReactTooltip.show(this.tooltip.current);
//                                      this.timeout = setTimeout(() => {
//                                          ReactTooltip.hide(this.tooltip.current ?? undefined);
//                                      }, customTimeout ?? ONE_SECOND);
//                                  }
//                              }}
//                              title={'Скопировать в буфер'}
//                              style={{ cursor: 'copy' }}>
//                 <span ref={this.tooltip}
//                       className={`text-for-copy ${className || ''}`}
//                       data-for={externalTooltipId ?? internalTooltipId ?? undefined}
//                       data-tip={externalTooltipId
//                           ? `<span>Скопировано<span>`
//                           : internalTooltipId ? true : 'tooltip'}
//                       data-event={externalTooltipId ? 'no-event' : undefined}
//                       data-type={externalTooltipId ? 'dark' : undefined}
//                       data-place={tooltipConfig?.place ?? 'top'}>
//                     {children}
//                 </span>
//             </CopyToClipboard>
//             {!externalTooltipId
//                 && <ReactTooltip overridePosition={tooltipConfig?.overridePosition}
//                                  event={'no-event'}
//                                  id={internalTooltipId ?? undefined}>
//                     Cкопировано
//                 </ReactTooltip>}
//         </>;
//     }
}
