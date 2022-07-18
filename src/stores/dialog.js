import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', {
  state: () => ({
    editComponent: null,
    questionDialog: false,
    informationDialog: false,
    item: null,
    msg: null,
    icon: null,
    iconClass: null,
    response: null,
    confirm: null,
  }),
  actions: {
    saveState() {
      localStorage.setItem('edit_component', this.editComponent)
      localStorage.setItem('question_dialog', this.questionDialog)
      localStorage.setItem('information_dialog', this.informationDialog)
      localStorage.setItem('item', JSON.stringify(this.item))
      localStorage.setItem('msg', this.msg)
      localStorage.setItem('icon', this.icon)
      localStorage.setItem('icon_class', this.iconClass)
      localStorage.setItem('response', this.response)
      localStorage.setItem('confirm', this.confirm)
    },
    readState() {
      const editCom = localStorage.getItem('edit_component')
      this.editComponent = editCom === 'null' ? null : editCom
      this.questionDialog = localStorage.getItem('question_dialog') === 'true'
      this.informationDialog =
        localStorage.getItem('information_dialog') === 'true'
      this.item = JSON.parse(localStorage.getItem('item'))
      this.msg = localStorage.getItem('msg') || null
      this.icon = localStorage.getItem('icon') || null
      this.iconClass = localStorage.getItem('icon_class') || null
      this.response = localStorage.getItem('response') || null
      this.confirm = localStorage.getItem('confirm') || null

      console.log(this.item)
    },
    closeDialogs() {
      this.$reset()
      this.saveState()
    },
    setEditDialog(editComponent, item, response) {
      this.editComponent = editComponent
      this.item = item
      this.response = response
      this.saveState()
    },
    setInformationDialog(msg, icon, iconClass) {
      this.msg = msg
      this.icon = icon
      this.iconClass = iconClass
      this.informationDialog = true
      this.saveState()
    },
    setQuestionDialog(msg, confirm, icon, iconClass) {
      this.msg = msg
      this.confirm = confirm
      this.icon = icon
      this.iconClass = iconClass
      this.questionDialog = true
      this.saveState()
    },
    success(msg) {
      this.closeDialogs()
      this.msg = msg
      this.icon = 'fa-solid fa-check'
      this.iconClass = 'success-icon'
      this.informationDialog = true
      this.saveState()
    },
    error(msg) {
      this.closeDialogs()
      this.msg = msg
      this.icon = 'fa-solid fa-exclamation'
      this.iconClass = 'error-icon'
      this.informationDialog = true
      this.saveState()
    },
  },
})
