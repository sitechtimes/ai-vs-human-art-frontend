const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello MEVN s Stack!");
});
// Serve Vue app
app.use(express.static(path.join(__dirname, "vue-app/dist")));

// Handle all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "vue-app/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
