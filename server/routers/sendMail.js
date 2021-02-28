const nodemailer = require("nodemailer");
const Joi = require("joi");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error)
    return res
      .status(400)
      .send({ path: error.details[0].path, message: error.details[0].message });

  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.contactMe_mail,
      pass: process.env.contactMe_pass,
    },
  });

  const mailOptions = {
    from: process.env.contactMe_mail,
    to: process.env.contactMe_mail,
    subject: `Message From ${req.body.email} : ${req.body.title}`,
    text: req.body.message,
  };
  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .send({ path: "success", message: "Mail is sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ path: "top", message: "Something goes wrong" });
  }
});

function validate(mail) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  });

  return schema.validate(mail);
}

module.exports = router;
