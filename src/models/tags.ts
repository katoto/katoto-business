import type { I } from '@/types/project';
import { useState, useCallback } from 'react';

export default function useVisitHistory() {
  const [visitHistory, setVisitHistory] = useState<I.VisitHistory>([
    {
      name: '首页',
      path: '/',
      active: true,
    },
  ]);

  const removeHistory = useCallback(
    (item: I.VisitHistoryItem) => {
      const index = visitHistory.findIndex((visit) => visit.path === item.path);
      let removed: I.VisitHistoryItem | undefined;
      let nextActivePath = '';
      if (index !== -1) {
        [removed] = visitHistory.splice(index, 1);
        if (removed && removed.active) {
          visitHistory[visitHistory.length - 1].active = true;
          nextActivePath = visitHistory[visitHistory.length - 1].path;
        }
        setVisitHistory([...visitHistory]);
      }
      return nextActivePath;
    },
    [visitHistory],
  );

  const appendHistory = useCallback(
    (item: I.VisitHistoryItem) => {
      let found = false;
      let changed = true;
      for (let i = 0; i < visitHistory.length; i += 1) {
        const visit = visitHistory[i];
        if (visit.path === item.path) {
          // 考虑到 appendHistory 多次执行，检测是否 visitHistory 是否变化
          // 如果 item 已经是选中的 tag，设置 changed 为 false，不再修改 visitHistory
          if (visit.active) {
            changed = false;
          } else {
            visit.active = true;
          }
          found = true;
        } else if (visit.active) {
          visit.active = false;
        }
      }
      if (!changed) {
        return;
      }
      if (!found) {
        visitHistory.push({
          ...item,
          active: true,
        });
      }
      setVisitHistory([...visitHistory]);
    },
    [visitHistory],
  );

  return {
    visitHistory,
    removeHistory,
    appendHistory,
  };
}
