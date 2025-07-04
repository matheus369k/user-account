import { browserCookies, browserLocal } from './browser-storage'
import { BROWSER_COOKIE_KEYS, BROWSER_STORAGE_KEYS } from './const'
import { MESSAGE_DATAS } from './data'

export const uiRender = {
  confirmMessage: function (email: string) {
    const currentViewPage = browserLocal.get(BROWSER_STORAGE_KEYS.PAGE_VIEW)
    const mainContainer = document.getElementById('container-main')
    if (!currentViewPage || !mainContainer) return
    const data = MESSAGE_DATAS[currentViewPage as 'login' | 'register']
    mainContainer.innerHTML = `<div class="message_container">
      <img src=${
        data.imageUrl
      } alt="this picture show Paimon this persona is friend of the traveler on the game genshin impact..." />
      <h1>${data.title}</h1>
      <p>${data.message.replace(data.replaceEmail, email)}</p>
    </div>`
  },

  profilerName: function (name: string) {
    const profilerUserName = document.getElementById('profiler-user-name')
    if (!profilerUserName) return
    profilerUserName.innerHTML = `<span>${name}</span>`
  },

  userId: function (userId: string) {
    const userIdContainer = document.getElementById('user-id')
    if (!userIdContainer) return
    userIdContainer.innerHTML = `<strong> userId:</strong>${userId}`
  },

  welcomeUser: function () {
    const mainContainer = document.getElementById('container-main')
    if (!mainContainer) return
    mainContainer.innerHTML = `<div class='welcome_container'>
      <h1>${MESSAGE_DATAS.welcome.title}</h1>
      <p>${MESSAGE_DATAS.welcome.message}</p>
    </div>`
  },

  hiddenAndShowLayout: function (type: 'flex' | 'none') {
    const profilerUserName = document.getElementById('profiler-user-name')
    const profilerSplitModel = document.getElementById('profiler-split-model')
    const userIdContainer = document.getElementById('user-id')
    const logoutIconContainer = document.getElementById('logout-icon-container')
    if (profilerUserName) {
      profilerUserName.style.display = type
    }
    if (logoutIconContainer) {
      logoutIconContainer.style.display = type
    }
    if (userIdContainer) {
      userIdContainer.style.display = type
    }
    if (profilerSplitModel) {
      profilerSplitModel.style.display = type === 'flex' ? 'none' : 'flex'
    }
  },

  expiredSessionMessage: function () {
    const mainContainer = document.getElementById('container-main')
    if (!mainContainer) return
    mainContainer.innerHTML = `<div class='expired_session_container'>
      <h1>${MESSAGE_DATAS.expiredSession.title}</h1>
      <p>${MESSAGE_DATAS.expiredSession.message}</p>
    </div>`
  },

  alertMessage: function (type: 'logout') {
    const groundDark = document.createElement('div')
    groundDark.setAttribute('id', 'ground-dark')
    groundDark.setAttribute('class', 'ground_dark')
    const alertMessage = document.createElement('div')
    alertMessage.setAttribute('id', 'alert-message')
    alertMessage.setAttribute('class', 'alert_message_container')
    alertMessage.innerHTML = `
      <button class='alert_message__btn_close' id='alert-message-btn-close' type='button'>X</button>
      <p>${MESSAGE_DATAS[type].message}</p>
      <div class='alert_message__options_container'>
        <button id='alert-message-agree-logout' class='alert_message__btn_options agree' type='button'>Sim</button>
        <button autofocus id='alert-message-no-agree-logout' class='alert_message__btn_options no_agree' type='button'>Não</button>
      </div>
    `
    groundDark.appendChild(alertMessage)
    document.body.appendChild(groundDark)
    document.getElementById('container-main')!.style.opacity = '0'

    document
      .getElementById('alert-message-btn-close')
      ?.addEventListener('click', () => {
        document.getElementById('ground-dark')?.remove()
        document.getElementById('container-main')!.style.opacity = '1'
      })
    document
      .getElementById('alert-message-agree-logout')
      ?.addEventListener('click', () => {
        browserCookies.remove(BROWSER_COOKIE_KEYS.TOKEN)
        window.location.reload()
      })
    document
      .getElementById('alert-message-no-agree-logout')
      ?.addEventListener('click', () => {
        document.getElementById('ground-dark')?.remove()
        document.getElementById('container-main')!.style.opacity = '1'
      })
    document.documentElement.addEventListener('keypress', ({ code }) => {
      console.log(code)
      if (/Enter/i.test(code)) {
        browserCookies.remove(BROWSER_COOKIE_KEYS.TOKEN)
        window.location.reload()
      }
      if (/Escape/i.test(code)) {
        document.getElementById('ground-dark')?.remove()
        document.getElementById('container-main')!.style.opacity = '1'
      }
    })
  },
}
