module.exports.getPhotoDates = getPhotoDates

const ExifImage = require('exif').ExifImage

var dateArray = []

function getPhotoDates (arr) {
  getExifDates(arr, pushOntoDateArray)
  return dateArray
}

function getExifDates (arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    try {
      var fpath = arr[i]
      var imageDate = new ExifImage({image: fpath}, function (err, exifData) {
        if (err) {
          console.log('ERROR: ' + err.message)
          return
        } else {
          var date = exifData['exif']['CreateDate']
          console.log(exifData)
          callback([fpath, date])
        }
      })
    } catch (err) {
      console.log('ERROR: ' + err.message)
      return
    }
  }
}

function pushOntoDateArray (data) {
  dateArray.push(data)
}
