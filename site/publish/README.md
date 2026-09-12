# Published entry page

`index.html` here is the Explore page rebuilt for the Artifact publisher,
which wraps the page in its own `<!doctype>/<html>/<head>/<body>`. Only the
`<title>`, stylesheet link and page content survive; everything else in
`site/index.html` is the artifact wrapper's job.

The other three pages, the CSS, the JS and the images publish unchanged as
supporting files, so `site/` stays the source of truth. Regenerate this
file after editing `site/index.html`.
