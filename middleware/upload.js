// middleware/upload.js
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

module.exports = upload.fields([
  { name: "contractAgreements", maxCount: 1 },
  { name: "bankGuaranteeSubmitted", maxCount: 1 },
]);
