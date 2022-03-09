import type { Models } from 'umi';

const fakeNames = ['vue', 'react', 'angular'];

export default function userAccess(
  initialState: Models<'@@initialState'>['initialState'],
) {
  const { username } = initialState || {};

  return {
    canOpenAccess: username === 'admin',
    canViewButton(name: string) {
      return fakeNames.indexOf(name) !== -1;
    },
  };
}
