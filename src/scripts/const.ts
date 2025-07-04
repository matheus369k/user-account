export const BROWSER_STORAGE_KEYS = {
  PAGE_VIEW: 'USER_ACCOUNT__PAGE_VIEW',
}

export const BROWSER_COOKIE_KEYS = {
  TOKEN: 'USER_ACCOUNT__TOKEN',
}

export const FORM_VIEW_KEYS = {
  REGISTER: 'USER_ACCOUNT__REGISTER_FORM',
  LOGIN: 'USER_ACCOUNT__LOGIN_FORM',
}

export const FORM_REGEX = {
  NOME: /^.{3,16}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,16}$/,
}
