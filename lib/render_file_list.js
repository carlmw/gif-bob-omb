module.exports = renderFileList;

function renderFileList (res, host) {
  return function (files) {
    res.render('index', {
      files: files,
      host: host
    });
  };
}
