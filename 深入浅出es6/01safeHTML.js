function safeHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}

var book = {
  send: "Hacker Steve <script>alert('xss');</script>"
}

console.log(`<p>${book.send} sent you a book.</p>`)
console.log(safeHTML`<p>${book.send} sent you a book.</p>`)


let window = {}
let document = {}
var map = new Map();
map.set(window, "the global");
map.set(document, "the document");
for (var [key, value] of map) {
  console.log(key + " is " + value);
}
