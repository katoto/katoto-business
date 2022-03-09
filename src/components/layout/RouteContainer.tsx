import { RouteContext, WaterMark } from '@ant-design/pro-layout';
import type { RouteContextType } from '@ant-design/pro-layout';
import { PageHeader } from 'antd';
import HistoryTag from '@/components/HistoryTag';
import type { I } from '@/types/project';
import classnames from 'classnames';

import styles from './index.less';

export interface IRouteContainerProps {
  children: JSX.Element;
}

export default function RouteContainer({ children }: IRouteContainerProps) {
  return (
    <RouteContext.Consumer>
      {(value: RouteContextType) => {
        const is404 = value.currentMenu?.path === '/404';
        const title = is404 ? '404' : value.title;
        const { displayHistory } = value as I.ProjectLayoutProps;
        let historyItem: I.VisitHistoryItem | undefined;
        if (value.currentMenu) {
          historyItem = {
            name: value.currentMenu.name!,
            path: value.currentMenu.path!,
            active: true,
          };
        }
        return (
          <WaterMark
            className={styles.pageRouteComponent}
            {...value.waterMarkProps}
          >
            <div className={styles.pageRouteHeader}>
              <PageHeader
                style={{ padding: '4px 20px' }}
                breadcrumb={{
                  ...value.breadcrumb,
                  style: {
                    padding: '9px 0',
                  },
                }}
                // 存在面包屑时，不显示 title
                title={value?.breadcrumb?.routes ? null : title}
              />
              {displayHistory ? (
                <HistoryTag currentHistoryItem={historyItem} />
              ) : null}
            </div>
            <div
              className={classnames([
                styles.pageRouteContent,
                displayHistory ? styles.pageRouteContentLittle : '',
              ])}
            >
              {children}
            </div>
          </WaterMark>
        );
      }}
    </RouteContext.Consumer>
  );
}
