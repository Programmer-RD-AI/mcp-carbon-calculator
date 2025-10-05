import nunjucks from "nunjucks";
import path from "path";

export const renderTemplate = (url: String) => {
  const env = nunjucks.configure(path.join(__dirname, "templates"), {
    autoescape: true,
  });
  return env.render("index.html", {
    url,
  });
};
