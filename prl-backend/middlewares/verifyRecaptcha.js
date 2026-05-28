const verifyRecaptcha = async (req, res, next) => {
  const token = req.body.recaptchaToken || req.body["g-recaptcha-response"];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "reCAPTCHA verification is required",
    });
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    return res.status(500).json({
      success: false,
      message: "reCAPTCHA secret key is not configured",
    });
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
        remoteip: req.ip,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA verification failed",
      });
    }

    next();
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to verify reCAPTCHA",
    });
  }
};

module.exports = verifyRecaptcha;
