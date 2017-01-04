module.exports.getPhotoDates = getPhotoDates
module.exports.getPhotos = getPhotosFromDirectory

const path = require('path')
const fs = require('fs')
const ExifImage = require('exif').ExifImage

var photoDates

function populatePhotoDates (directoryPath) {
  photoDates.push(getPhotosFromDirectory(directoryPath, parseDateFromPhotos))
  console.log(photoDates)
  return
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
      return callback(fPath)
    }
  }
}

function parseDateFromPhotos (filepath) {
  try {
    var imageDate = new ExifImage({image: filepath}, function (err, exifData) {
      if (err) {
        console.log('ERROR: ' + err.message)
        return
      } else {
        return exifData['exif']['CreateDate']
      }
    })
    return imageDate
  } catch (err) {
    console.log('ERROR: ' + err.message)
    return
  }
}


