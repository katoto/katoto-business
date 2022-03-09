// request 实例是在 App.tsx 中配置的
import { request } from 'umi';

export function getTodos() {
  return request('/todos');
}

export function getWithError() {
  return request('/error', {
    method: 'POST',
  });
}

export function getUnauthorized() {
  return request('/unauthorized');
}
