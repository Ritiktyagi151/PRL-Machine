import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = "6LeHo-csAAAAAA-RUUtC-xmee5YqI4LMF75xMXuV";

const RecaptchaField = ({ onChange }) => (
  <ReCAPTCHA
    sitekey={RECAPTCHA_SITE_KEY}
    onChange={(token) => onChange(token || "")}
    onExpired={() => onChange("")}
  />
);

export default RecaptchaField;
