function template (title, content = ""){
  let page = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title> ${title} </title>
      <link href="/ssr.css" rel="stylesheet">
    </head>
    <body>
      <div class="content">
        <div id="app" class="wrap-inner">
          ${content}
        </div>
      </div>
    </body>
  </html>
  `;

  return page;
}

module.exports = template;
