import { BROWSER_COOKIE_KEYS, BROWSER_STORAGE_KEYS } from './const'
import { browserCookies, browserLocal } from './browser-storage'
import '../styles/index.scss'
import { uiRender } from './ui-render'
import { getFormDatas } from './forms'
import { fetchUserAPI } from './services'

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const currentRoutePath = window.location.pathname
      .split('.html')[0]
      .split('/')[1]
    const isLoginOrRegisterCurrentPage =
      currentRoutePath === 'login' || currentRoutePath === 'register'
    if (isLoginOrRegisterCurrentPage) {
      browserLocal.add({
        key: BROWSER_STORAGE_KEYS.PAGE_VIEW,
        value: currentRoutePath,
      })
    }

    loadProfileSplitModelScript()
    loadSubmittedFormScript()
    loadLogoutUserScript()

    const isHomeCurrentPage = currentRoutePath === 'index' || !currentRoutePath
    const hasJwtUserCookie = browserCookies.get(BROWSER_COOKIE_KEYS.TOKEN)
    if (!isHomeCurrentPage) return
    if (hasJwtUserCookie) {
      const result = await fetchUserAPI.profilerUser()
      if (result?.user) {
        uiRender.hiddenAndShowLayout('flex')
        uiRender.confirmMessage(result.user.email)
        uiRender.profilerName(result.user.name)
        uiRender.userId(result.user.id)
      } else {
        uiRender.hiddenAndShowLayout('none')
        browserCookies.remove(BROWSER_COOKIE_KEYS.TOKEN)
        uiRender.expiredSessionMessage()
      }
      return
    }
    uiRender.hiddenAndShowLayout('none')
    uiRender.welcomeUser()
  } catch (error) {
    console.log(error)
  }
})

const loadSubmittedFormScript = () => {
  document.querySelector('form')?.addEventListener('submit', async (event) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const btnSubmitted = form.querySelector('button[type=submit]')
    if (!form || !btnSubmitted) return
    const btnSubmittedContent = btnSubmitted.innerHTML
    const currentRoutePath = window.location.pathname
      .split('.html')[0]
      .split('/')[1]
    if (currentRoutePath === 'login') {
      const data = getFormDatas.getLogin(form)
      if (!data) return
      btnSubmitted.textContent = 'Enviando....'
      await fetchUserAPI.loginUser({
        email: data.email,
        password: data.password,
        auto_connection: data.auto_connection,
      })
    }
    if (currentRoutePath === 'register') {
      const data = getFormDatas.getRegister(form)
      if (!data) return
      btnSubmitted.textContent = 'Enviando....'
      await fetchUserAPI.registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        auto_connection: data.auto_connection,
      })
    }
    btnSubmitted.innerHTML = btnSubmittedContent
  })
}

const loadProfileSplitModelScript = () => {
  const profilerIcon = document.getElementById('profiler-icon')
  if (!profilerIcon) return

  profilerIcon.addEventListener('click', () => {
    const profilerSplitModel = document.getElementById('profiler-split-model')
    if (!profilerSplitModel) return
    profilerSplitModel.classList.toggle('active')
  })
}

const loadLogoutUserScript = () => {
  const logoutIconContainer = document.getElementById('logout-icon-container')
  if (!logoutIconContainer) return
  logoutIconContainer.addEventListener('click', () => {
    uiRender.alertMessage('logout')
  })
}
