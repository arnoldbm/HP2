if (typeof global.FormData === 'undefined') {
  class PolyfilledFormData {
    constructor() {
      this._fields = new Map()
    }

    append(name, value) {
      const existing = this._fields.get(name) ?? []
      existing.push(value)
      this._fields.set(name, existing)
    }

    get(name) {
      const entries = this._fields.get(name)
      return entries ? entries[0] : null
    }

    getAll(name) {
      return this._fields.get(name) ?? []
    }
  }

  global.FormData = PolyfilledFormData
}

module.exports = require('jest-expo/jest-preset')
