window.onload = function () {
  // Header
  const loginButton = document.getElementsByClassName('header__loginButton')[0]
  const loginIcon = document.getElementsByClassName('header__loginIcon')[0]
  const headerUl = document.getElementsByClassName('header__ul')[0]
  const headerLinks = headerUl.getElementsByClassName('header__a')
  const headerNav = document.getElementsByClassName('header__nav')[0]
  const headerMenuIcon = document.getElementsByClassName('header__menuIcon')[0]
  const menuCloseButton = document.getElementsByClassName('header__closeMenu')[0]

  // ModalWindowForm
  const modalShowLabelClass = 'modalWindow__errorLabel-show'
  const modalWindow = document.getElementsByClassName('modalWindow')[0]
  const modalBackdrop = document.getElementsByClassName('modalBackdrop')[0]
  const modalCloseButton = document.getElementsByClassName('modalWindow__closeButton')[0]
  // ModalWindowForm Input
  const modalNameInput = document.getElementById('modalWindow__nameInput')
  const modalEmailInput = document.getElementById('modalWindow__emailInput')
  const modalTelInput = document.getElementById('modalWindow__telInput')
  const modalCountryInput = document.getElementById('modalWindow__countryInput')
  const modalDateInput = document.getElementById('modalWindow__dateInput')
  const modalPasswordInput = document.getElementById('modalWindow__passwordInput')
  const modalPasswordConfirmInput = document.getElementById('modalWindow__passwordConfirmInput')


  // Main
  const horoscopeEveryone = document.getElementsByClassName('horoscopeEveryone__buttonWrapper')[0]
  const horoscopeButtons = horoscopeEveryone.getElementsByClassName('horoscopeEveryone__button')
  const horoscopeZodiacWrapper = document.getElementsByClassName('horoscopeZodiac__wrapper')[0]
  const horoscopeZodiacButtons = horoscopeZodiacWrapper.getElementsByClassName('horoscopeZodiac__circleButton')

  // FooterForm
  const footerShowLabelClass = 'footer__errorLabel-show'
  const footerForm = document.getElementsByClassName('footer__form')[0]
  const footerEmailInput = document.getElementById('footer__emailInput')
  const footerNameInput = document.getElementById('footer__nameInput')
  const footerDateInput = document.getElementById('footer__dateInput')


  class MainClass {
    showLoginModalWindow = () => {
      modalBackdrop.classList.add('modalBackdrop-show')
      modalWindow.classList.add('modalWindow-show')
    }
    closeLoginModalWindow = () => {
      modalBackdrop.classList.remove('modalBackdrop-show')
      modalWindow.classList.remove('modalWindow-show')
    }

    addActiveClass = (element, activeClass) => {
      for (let i = 0; i < element.length; i++) {
        element[i].addEventListener('click', function () {
          const current = document.getElementsByClassName(activeClass)
          current[0].classList.remove(activeClass)
          this.className += ` ${activeClass}`
        })
      }
    }

    openMenu = () => {
      headerNav.classList.add('header__nav-show')
    }

    closeMenu = () => {
      headerNav.classList.remove('header__nav-show')
    }
  }

  let mainClass = new MainClass()

  class ValidateFormClass {
    emailValidate = (target, errorShowClass) => {
      const { value, labels } = target
      const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!pattern.test(value)) {
        labels[0].classList.add(errorShowClass)
      } else labels[0].classList.remove(errorShowClass)
    }

    nameValidate = (target, errorShowClass) => {
      const { value, labels } = target
      if (value.length < 4) {
        labels[0].classList.add(errorShowClass)
      } else labels[0].classList.remove(errorShowClass)
    }

    dateValidate = (target, errorShowClass) => {
      const { value, labels } = target
      if (!value || value.match(/[dmy]/g)) {
        labels[0].classList.add(errorShowClass)
      } else labels[0].classList.remove(errorShowClass)
    }

    telValidate = (target, errorShowClass) => {
      const { value, labels } = target
      if (!value || value.match(/[_]/g)) {
        labels[0].classList.add(errorShowClass)
      } else labels[0].classList.remove(errorShowClass)
    }

    passwordValidate = (target, errorShowClass) => {
      const { value, labels } = target
      if(value.length === 0){
        labels[0].innerHTML = 'Обязательное поле для заполнения'
        labels[0].classList.add(errorShowClass)
      } else if (value.length < 4) {
        labels[0].innerHTML = 'Пароль должен содержать не менее 4 символов'
        labels[0].classList.add(errorShowClass)
      } else if (modalPasswordConfirmInput.value !== value){
        modalPasswordConfirmInput.innerHTML = 'Пароли не совпадают'
        modalPasswordConfirmInput.labels[0].classList.add(errorShowClass)
        labels[0].classList.remove(errorShowClass)
      } else {
        labels[0].classList.remove(errorShowClass)
        modalPasswordConfirmInput.labels[0].classList.remove(errorShowClass)
      }
    }

    confirmPasswordValidate = (target, errorShowClass) => {
      const { value, labels } = target
      if(value.length === 0) {
        labels[0].innerHTML = 'Обязательное поле для заполнения'
        labels[0].classList.add(errorShowClass)
      } else if (value.length < 4) {
        labels[0].innerHTML = 'Пароль должен содержать не менее 4 символов'
        labels[0].classList.add(errorShowClass)
      } else if (modalPasswordInput.value.length < 4){
        modalPasswordInput.labels[0].classList.add(errorShowClass)
        labels[0].classList.remove(errorShowClass)
      } else if (value !== modalPasswordInput.value){
        modalPasswordInput.classList.add(errorShowClass)
        labels[0].innerHTML = 'Пароли не совпадают'
      } else labels[0].classList.remove(errorShowClass)
    }

    onkeyupFormValidate = (target, validateFunction, errorClass) => {
      validateFunction(target, errorClass)
      target.addEventListener('keyup', e => {
        validateFunction(e.target, errorClass)
      })
    }


    onsubmitFooterForm = e => {
      e.preventDefault()
      this.onkeyupFormValidate(footerEmailInput, this.emailValidate, footerShowLabelClass)
      this.onkeyupFormValidate(footerNameInput, this.nameValidate, footerShowLabelClass)
      this.onkeyupFormValidate(footerDateInput, this.dateValidate, footerShowLabelClass)
    }

    onsubmitModalWindowForm = e => {
      e.preventDefault()
      this.onkeyupFormValidate(modalNameInput, this.nameValidate, modalShowLabelClass)
      this.onkeyupFormValidate(modalEmailInput, this.nameValidate, modalShowLabelClass)
      this.onkeyupFormValidate(modalTelInput, this.telValidate, modalShowLabelClass)
      this.onkeyupFormValidate(modalDateInput, this.dateValidate, modalShowLabelClass)
      this.onkeyupFormValidate(modalCountryInput, this.nameValidate, modalShowLabelClass)
      this.onkeyupFormValidate(modalPasswordInput, this.passwordValidate, modalShowLabelClass)
      this.onkeyupFormValidate(modalPasswordConfirmInput, this.confirmPasswordValidate, modalShowLabelClass)
    }

    addEventListenerBlur = (target, validateFunction, errorShowClass) => {
      target.addEventListener('blur', e => {
        this.onkeyupFormValidate(e.target, this[validateFunction], errorShowClass)
      }, { once: true })
    }
  }

  let validateForm = new ValidateFormClass()

  // Header
  mainClass.addActiveClass(headerLinks, 'header__a-active')
  headerMenuIcon.addEventListener('click', mainClass.openMenu)
  menuCloseButton.addEventListener('click', mainClass.closeMenu)

  // ModalWindowForm
  loginButton.addEventListener('click', mainClass.showLoginModalWindow)
  loginIcon.addEventListener('click', mainClass.showLoginModalWindow)
  modalCloseButton.addEventListener('click', mainClass.closeLoginModalWindow)
  modalWindow.addEventListener('submit', validateForm.onsubmitModalWindowForm)
  // ModalWindowForm input
  $("#modalWindow__telInput").inputmask({ 'mask': '+(999) 999-9999' })
  validateForm.addEventListenerBlur(modalNameInput, 'nameValidate', modalShowLabelClass)
  modalNameInput.onkeydown = ({ key }) => !(/[^a-zA-Zа-яА-ЯёЁ .]/.test(key))
  validateForm.addEventListenerBlur(modalEmailInput, 'nameValidate', modalShowLabelClass)
  validateForm.addEventListenerBlur(modalTelInput, 'telValidate', modalShowLabelClass)
  validateForm.addEventListenerBlur(modalDateInput, 'dateValidate', modalShowLabelClass)
  validateForm.addEventListenerBlur(modalCountryInput, 'nameValidate', modalShowLabelClass)
  validateForm.addEventListenerBlur(modalPasswordInput, 'passwordValidate', modalShowLabelClass)
  validateForm.addEventListenerBlur(modalPasswordConfirmInput, 'confirmPasswordValidate', modalShowLabelClass)

  // Main
  mainClass.addActiveClass(horoscopeButtons, 'horoscopeEveryone__button-active')
  mainClass.addActiveClass(horoscopeZodiacButtons, 'horoscopeZodiac__circleButton-active')

  // FooterForm
  validateForm.addEventListenerBlur(footerEmailInput, 'emailValidate', footerShowLabelClass)
  validateForm.addEventListenerBlur(footerNameInput, 'nameValidate', footerShowLabelClass)
  validateForm.addEventListenerBlur(footerDateInput, 'dateValidate', footerShowLabelClass)
  footerNameInput.onkeydown = ({ key }) => !(/[^a-zA-Zа-яА-ЯёЁ .]/.test(key))
  $(":input").inputmask()
  $("#footer__telInput").inputmask({ 'mask': '+(999) 999-9999' })
  footerForm.addEventListener('submit', validateForm.onsubmitFooterForm)
}
