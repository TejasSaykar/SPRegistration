const express = require("express")
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRoute = require("./routes/employeeRoute.js");
const productRoute = require("./routes/productRoute.js")
const multer = require("multer");
const path = require("path");
const https = require("https");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.use("/images", express.static(path.join(__dirname, "/images")));

// const fullPath = path.resolve(__dirname, '/images');

// Routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});
// Load SSL certificates (replace these paths with your own certificates)
const privateKey = fs.readFileSync("./config/https/private.key", "utf8");
const certificate = fs.readFileSync("./config/https/certficate.crt", "utf8");
const ca = fs.readFileSync("./config/https/ca_bundle.crt", "utf8");

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
};

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);



const port = 8080;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON http://localhost:${port}`);
})