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
    confirm: null,
    successMsg: null,
    errorMsg: null,
  }),
  actions: {
    saveState() {
      localStorage.setItem('edit_component', this.editComponent)
      localStorage.setItem('item', JSON.stringify(this.item))
      localStorage.setItem('success_msg', this.successMsg)
      localStorage.setItem('error_msg', this.successMsg)
    },
    readState() {
      const editCom = localStorage.getItem('edit_component')
      this.editComponent = editCom === 'null' ? null : editCom
      this.item = JSON.parse(localStorage.getItem(this.editComponent))
      this.successMsg = localStorage.getItem('success_msg')
      this.errorMsg = localStorage.getItem('error_msg')
    },
    closeDialogs() {
      this.$reset()
      this.saveState()
    },
    setEditDialog(editComponent, item, successMsg, errorMsg) {
      this.editComponent = editComponent
      this.item = item
      this.successMsg = successMsg
      this.errorMsg = errorMsg
      this.saveState()
    },
    setInformationDialog(msg, icon, iconClass) {
      this.msg = msg
      this.icon = icon
      this.iconClass = iconClass
      this.informationDialog = true
    },
    setQuestionDialog(msg, confirm, icon, iconClass) {
      this.msg = msg
      this.confirm = confirm
      this.icon = icon
      this.iconClass = iconClass
      this.questionDialog = true
    },
    response(res) {
      if (res) {
        this.success(this.successMsg)
      } else {
        this.error(this.errorMsg)
      }
    },
    success(msg) {
      this.closeDialogs()
      this.msg = msg
      this.icon = 'fa-solid fa-check'
      this.iconClass = 'success-icon'
      this.informationDialog = true
    },
    error(msg) {
      this.closeDialogs()
      this.msg = msg
      this.icon = 'fa-solid fa-exclamation'
      this.iconClass = 'error-icon'
      this.informationDialog = true
    },
  },
})
