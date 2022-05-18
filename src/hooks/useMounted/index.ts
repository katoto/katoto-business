import { EffectCallback, useEffect } from "react";

export const useMounted = (fn: EffectCallback) => {
  useEffect(fn, []);
  return null;
};
