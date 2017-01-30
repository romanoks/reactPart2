import keyMirror from 'keymirror';

export const settingsActionTypes = keyMirror({
  CHANGE_LOCALE: null,
});

export function changeLocale(value) {
  return {
    type: settingsActionTypes.CHANGE_LOCALE,
    payload: value,
  };
}