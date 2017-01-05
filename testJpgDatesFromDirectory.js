const jpg = require('./getJpgsFromDirectory.js')
const photoDate = require('./getDatesFromPhotoArray.js')

console.log(photoDate.getPhotoDates(jpg.getPhotoFiles('./testFolder')))
