module.exports.getPhotoFiles = getPhotoFiles

const path = require('path')
const fs = require('fs')

var photoDates = []

function getPhotoFiles (directoryPath) {
  getPhotosFromDirectory(directoryPath, pushOntoImageArray)
  return photoDates
}

function getPhotosFromDirectory (directoryPath, callback) {
  if (!fs.existsSync(directoryPath)) {
    console.log('ERROR: filepath does not exist at ' + directoryPath)
    return
  }
  var filter = /\.jpg$/
  var files = fs.readdirSync(directoryPath)
  for (var i = 0; i < files.length; i++) {
    var fPath = path.join(directoryPath, files[i])
    if (fs.lstatSync(fPath).isDirectory()) {
      getPhotosFromDirectory(fPath, callback)
    } else if (filter.test(fPath)) {
      callback(fPath)
    }
  }
}

function pushOntoImageArray (data) {
  if (data.length) {
    photoDates.push(data)
  }
}
