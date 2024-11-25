const functions = require("firebase-functions");
const path = require("path");
require("dotenv").config();
// All available logging functions
const {debug, error} = require("firebase-functions/logger");

exports.serveSXG = functions.https.onRequest((req, response) => {
  const page = req.path;
  const headers = req.headers["accept"] || "";
  const sxgPath = path.resolve(
      __dirname,
      "./sxg/" + process.env.SITE_NAME + "." + process.env.SXG_NAME);
  const htmlPath = path.join(__dirname, "../public/" + process.env.PAGE_NAME);

  debug("Page being called:", page);
  debug("sxgPath:", sxgPath);
  debug("htmlPath:", htmlPath);

  if (headers.includes("application/signed-exchange;v=b3")) {
    response.set("Content-Type", "application/signed-exchange;v=b3");
    response.set("X-Content-Type-Options", "nosniff");
    debug("You requested sxg file ! Get it !");
    response.sendFile(sxgPath, (err) => {
      if (err) {
        error("Error serving SXG file:", err);
        response.status(500).send("Error serving SXG file");
      }
    });
  } else {
    response.send(
        `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SXG</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@carbon/styles/css/styles.min.css"
    />
    <style>
      body {
        background-color: #e0482e;
        color: #ffffff;
      }
      a {
        color: #e0482e;
        font-weight: bold;
        text-decoration: underline;
      }
      a:hover {
        text-decoration: none;
      }
      .cds--tile {
        background-color: #000000;
        padding: 1.5rem;
        margin: 2rem 0;
        border-radius: 8px;
      }
      .cds--tile.highlight {
        background-color: #ff6f61;
      }
      h1,
      h2 {
        color: #ffffff;
      }
      header {
        text-align: center;
        margin-bottom: 2rem;
      }
      header h1 {
        font-size: 2rem;
      }
      header p {
        font-size: 1.2rem;
        font-weight: lighter;
      }
      main.cds--content {
        color: #ffffff;
      }
      .cds--tile p {
        margin-bottom: 1.5rem;
      }
    </style>
  </head>
  <body>
    <div class="cds--grid">
      <!-- Page Header -->
      <header>
        <h1>Your one-stop resource for SXG</h1>
        <p>Try to load this page with header application/signed-exchange;v=b3</p>
      </header>

      <!-- Content -->
      <main class="cds--row cds--content">
        <div class="cds--col-md-4 cds--col-lg-8">
          <!-- SXG -->
          <section class="cds--tile">
            <h2>SXG</h2>
            <p>
              Get started with Signed Exchanges using this GitHub guide. Learn
              how to create your first SXG.
            </p>
            <a
              href="https://github.com/WICG/webpackage/tree/main/go/signedexchange#creating-our-first-signed-exchange"
              target="_blank"
              >Read the Guide</a
            >
          </section>

          <!-- Viv's Wiki Section -->
          <section class="cds--tile">
            <h2>Viv's Wiki</h2>
            <p>Learn about Signed Exchange (SXG) on Viv's Blog!</p>
            <a href="https://vivs.wiki/blog/SXG" target="_blank"
              >Read the Blog</a
            >
          </section>

          <!-- Advancing Standards for ZK and Provenance -->
          <section class="cds--tile">
            <h2>Advancing Standards for ZK and Provenance</h2>
            <p>
              Dive into the HackMD document from
              <a href="https://hackmd.io/@yushg" target="_blank">@Yush</a>.
            </p>
            <a href="https://hackmd.io/@yushg/ryWw3nuMke" target="_blank"
              >Read the Document</a
            >
          </section>

          <!-- Chrema labs-->
          <section class="cds--tile">
            <h2>Chrema labs blog post about SXG verification</h2>
            <p>
              Learn more about Signed HTTP Exchanges (SXG) and their
              verification process
            </p>
            <a href="https://blog.crema.sh/SXG" target="_blank"
              >Read the blog post</a
            >
          </section>

          <!-- Easy Deployment of Your First SXG -->
          <section class="cds--tile">
            <h2>Easy Deployment of Your First SXG</h2>
            <p>
              Deploy your first Signed Exchange using Firebase with this starter
              project.
            </p>
            <a href="https://github.com/0xTitan/sxg-starter" target="_blank"
              >Visit the Repo</a
            >
          </section>
        </div>
      </main>

      <!-- Footer -->
      <footer class="cds--row cds--footer">
        <div class="cds--col">
          <p>&copy; 2024</p>
        </div>
      </footer>
    </div>

    <script src="https://unpkg.com/@carbon/scripts/umd/carbon-components.min.js"></script>
    <script>
      CarbonComponents.watch();
    </script>
  </body>
</html>
`,
    );
  }
});
