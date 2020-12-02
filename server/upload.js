const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');

module.exports = function upload(req, res) {
  const form = new IncomingForm();

  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    console.log('file1', file.name);
    const readStream = fs.createReadStream(file.path);
    console.log('path1', readStream);

      form.parse(req, function (err, fields, files) {
            var newpath = 'C:/Users/xyx/Desktop/cucumberreport/client/testcaserunner/src/app/' + 'cucumber.json';
            fs.rename(file.path, newpath, function (err) {
              if (err) throw err;
            });
       });
  });
  form.on('end', () => {
    res.json();
  });
  form.parse(req);

};
