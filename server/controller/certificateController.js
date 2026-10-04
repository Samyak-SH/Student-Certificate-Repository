const certificateModel = require("../model/certificateModel");

const uploadCertificate = (req, res) => {
  const usn = req.user?.USN || req.body.usn || req.query.USN;
  const tid = req.user?.TID || req.body.tid || "1";
  const department = req.user?.department || req.body.department || 'General';

  if (!req.body.Data) {
    return res.status(400).send({ message: "failed", error: "Certificate file content (Data) is required" });
  }

  if (!usn) {
    return res.status(400).send({ message: "failed", error: "USN is required to associate certificate" });
  }

  const certificate = {
    Data: req.body.Data,
    TID: tid,
    USN: usn,
    Department: department,
    Title: req.body.title || 'Untitled Certificate',
    Tag: req.body.tag || 'course',
    Path: req.body.path || '/',
    Date: req.body.date ? new Date(req.body.date) : new Date(),
  };

  console.log("Saving certificate:", {
    Title: certificate.Title,
    Tag: certificate.Tag,
    USN: certificate.USN,
    TID: certificate.TID,
    DataSize: `${Math.round(certificate.Data.length / 1024)} KB`
  });

  certificateModel.uploadCertificate(certificate, (err) => {
    if (err) {
      console.error("Certificate upload error:", err);
      return res.status(500).send({ message: "failed", error: err });
    }
    return res.status(200).send({ message: "success" });
  });
};

const getStudentCertificate = (req, res) => {
  console.log(req.user.USN);
  certificateModel.getStudentCertificate(req.user.USN, (err, result) => {
    if (err) {
      return res.status(500).send({ message: "internal server error", error: err });
    }
    if (!result || result.length === 0) {
      return res.status(200).send({ message: "no certificates" });
    }
    return res.status(200).send(result);
  });
};

const getStudentCertificateByTeacher = (req, res) => {
  console.log(req.query.USN);

  certificateModel.getStudentCertificate(req.query.USN, (err, result) => {
    if (err) {
      return res.status(500).send({ message: "internal server error", error: err });
    }
    if (!result || result.length === 0) {
      return res.status(200).send({ message: "no certificates" });
    }
    return res.status(200).send(result);
  });
};

module.exports = {
  uploadCertificate,
  getStudentCertificate,
  getStudentCertificateByTeacher,
};
