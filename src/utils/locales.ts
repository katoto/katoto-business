// eslint-disable-next-line
export type LocaleConfig = {
  // 使用 Record 无法做到自引用，先关闭了
  [key: string]: string | LocaleConfig;
};

export function normalizeLocaleConfig(config: LocaleConfig) {
  const data: Record<string, string> = {};
  const walk = (innerConfig: LocaleConfig, keyPrefix: string) => {
    Object.keys(innerConfig).forEach((key) => {
      const value = innerConfig[key];
      const dataKey = `${keyPrefix ? `${keyPrefix}.` : ''}${key}`;
      if (typeof value === 'string') {
        data[dataKey] = value;
      } else {
        walk(value, dataKey);
      }
    });
  };
  walk(config, '');
  return data;
}
