import { useState, useCallback } from 'react';

export interface AppState {
  intro: string;
}

/**
 * 通过 Hook 定义状态，通过 useModel 来获取
 * 代码如下：
 * import { useIntl } from 'umi';
 * const { app } = useModel('app', (model) => ({
    app: model.appState,
  }));
 */
export default function useAppState() {
  const [appState, setAppState] = useState<AppState>({
    intro: 'a react template for hll fe',
  });

  const updateIntro = useCallback((intro) => {
    setAppState({ intro });
  }, []);

  return {
    appState,
    updateIntro,
  };
}
