export const browserLocal = {
  localStorage: window.localStorage,
  add: function ({ key, value }: { key: string; value: string }) {
    this.localStorage.setItem(key, value)
  },
  get: function (key: string): string | null {
    return this.localStorage.getItem(key)
  },
  remove: function (key: string) {
    this.localStorage.remove(key)
  },
}
export const browserCookies = {
  date: new Date(),
  cookies: document.cookie.replace('; ', '=').toString().split('='),
  add: function ({ key, value }: { key: string; value: string }) {
    this.date.setTime(this.date.getTime() + 7 * 24 * 60 * 60 * 1000)
    const cookie = `${key}=${value};expires=${this.date.toUTCString()}`
    document.cookie = cookie
  },
  get: function (key: string) {
    const cookieKeyIndex = this.cookies.findIndex((value) => value === key)
    if (cookieKeyIndex < 0) return null
    return JSON.parse(this.cookies[cookieKeyIndex + 1].split(';')[0])
  },
  remove: function (key: string) {
    const cookieKeyIndex = this.cookies.findIndex((value) => value === key)
    if (cookieKeyIndex < 0) return null
    this.date.setTime(this.date.getTime())
    document.cookie = this.cookies
      .map((value, index) => {
        if (cookieKeyIndex + 1 === index) {
          return `${
            this.cookies[cookieKeyIndex + 1]
          };expires=${this.date.toUTCString()}`
        }
        return value
      })
      .toString()
      .replace('; ', ';')
      .replace(',', '=')
  },
}
