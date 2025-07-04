import { FORM_REGEX } from './const'

export interface FormsUserLogin {
  email: string
  password: string
  auto_connection: 'on' | 'off'
}

export interface FormsUserRegister extends FormsUserLogin {
  name: string
}

export const getFormDatas = {
  hasFieldInvalid: false,
  validationFieldsValues: function (props: {
    email: string
    password: string
    name?: string
  }) {
    const inputName = document.querySelector('input[name=name]')
    const inputPassword = document.querySelector('input[name=password]')
    const inputEmail = document.querySelector('input[name=email]')

    if (!inputPassword || !inputEmail) return
    if (inputName && props.name && !FORM_REGEX.NOME.test(props.name)) {
      inputName.setAttribute('data-invalid', '')
      this.hasFieldInvalid = true
    } else if (inputName && props.name) {
      inputName.removeAttribute('data-invalid')
      this.hasFieldInvalid = false
    }
    if (!FORM_REGEX.EMAIL.test(props.email)) {
      inputEmail.setAttribute('data-invalid', '')
      this.hasFieldInvalid = true
    } else {
      inputEmail.removeAttribute('data-invalid')

      this.hasFieldInvalid = false
    }
    if (!FORM_REGEX.PASSWORD.test(props.password)) {
      inputPassword.setAttribute('data-invalid', '')
      this.hasFieldInvalid = true
    } else {
      inputPassword.removeAttribute('data-invalid')
      this.hasFieldInvalid = false
    }
  },
  getLogin: function (form: HTMLFormElement) {
    const formData = new FormData(form)
    const data = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      auto_connection: formData.get('auto_connection') || 'off',
    }
    this.validationFieldsValues(data)
    if (this.hasFieldInvalid) return
    return {
      ...data,
    } as FormsUserLogin
  },
  getRegister: function (form: HTMLFormElement) {
    const formData = new FormData(form)
    const data = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      auto_connection: formData.get('auto_connection')?.toString() || 'off',
      agree_term: formData.get('agree_term')?.toString() || 'off',
    }
    this.validationFieldsValues(data)
    if (data.agree_term === 'off' || this.hasFieldInvalid) return
    return {
      ...data,
    } as FormsUserRegister
  },
}
