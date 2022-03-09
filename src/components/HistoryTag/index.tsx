import { useModel, useHistory } from 'umi';
import { Tag } from 'antd';
import { useEffect } from 'react';
import type { I } from '@/types/project';
import styles from './index.less';

export interface HistoryTagProps {
  currentHistoryItem: I.VisitHistoryItem | undefined;
}

export default function HistoryTag({ currentHistoryItem }: HistoryTagProps) {
  const { visitHistory, appendHistory, removeHistory } = useModel('tags');
  const history = useHistory();

  useEffect(() => {
    if (currentHistoryItem) {
      appendHistory(currentHistoryItem);
    }
  }, [currentHistoryItem, appendHistory]);

  return (
    <div className={styles.historyTag}>
      {visitHistory.map((route, index) => {
        return (
          <Tag
            className={styles.tagItem}
            key={route.path}
            closable={index !== 0}
            onClick={() => {
              if (
                currentHistoryItem &&
                currentHistoryItem.path === route.path
              ) {
                return;
              }
              history.push(route.path);
            }}
            onClose={() => {
              const nextActivePath = removeHistory(route);
              if (nextActivePath) {
                history.push(nextActivePath);
              }
            }}
            {...(route.active ? { color: 'processing' } : {})}
          >
            {route.name}
          </Tag>
        );
      })}
    </div>
  );
}
