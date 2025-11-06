const { FormData } = require('undici')

if (typeof global.FormData === 'undefined') {
  global.FormData = FormData
}
