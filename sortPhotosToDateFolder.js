module.exports.sort = sortPhotosToDateDir

const fs = require('fs')
const path = require('path')
const ExifImage = require('exif').ExifImage

var filter = /\.jpg$/

function sortPhotosToDateDir (dirPath) {
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      console.log('ERROR: ' + err)
    }
    files.map(function (file) {
      return path.join(dirPath, file)
    }).filter(function (file){
      if (filter.test(file.toLowerCase())){
        new ExifImage({image: file}, function(err, exifData) {
          if (err) {
            console.log('ERROR: ' + err)
          }
          else {
            var date = exifData['exif']['CreateDate']
            var pattern = /^(\d{4}):(\d{2}):(\d{2})/
            var formattedDate = (date.match(pattern)[0]).replace(/:/g, '_')
            fs.mkdir(file + '/../' + formattedDate , 0777, function (err) {
              if (err) {
                if (err.code != 'EEXIST'){
                  console.log('ERROR: ' + err)
                } 
              }
            })
            fs.createReadStream(file).pipe(fs.createWriteStream(file + '/../' + formattedDate + '//' + path.basename(file)))
          }
        }) 
      }
    })
  })
}

