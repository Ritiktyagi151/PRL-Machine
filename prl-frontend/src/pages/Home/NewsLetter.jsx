const NewsletterSection = () => {
  return (
    <section
      id="newsletter_home"
      className="newsletter-home bg-cover bg-center bg-no-repeat py-16"
      style={{
        backgroundImage:
          "url(//factorydirectsupplyonline.com/cdn/shop/files/back-newsletter.jpg?v=1736886888)",
      }}
    >
      <div className="container  mx-auto px-4">
        <div className="newsletter-content relative backdrop-blur-sm flex flex-col md:flex-row items-center justify-between bg-transparent p-8 rounded-lg shadow-lg">
          {/* Vertical borders */}
          <div className="vertical-border-left absolute left-0 top-0 h-full w-1 bg-violet-600"></div>
          <div className="vertical-border-right absolute right-0 top-0 h-full w-1 bg-violet-600"></div>

          {/* Text content */}
          <div className="newsletter-text mb-8 md:mb-0 md:mr-8">
            <div className="text-wrapper">
              <h2 className="newsletter-title text-3xl font-bold text-white mb-2">
                Never Miss an Update
              </h2>
              <p className="newsletter-description text-gray-200">
                Keep your toolbox stocked - sharpen your skills with our updates
                and deals.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="newsletter-form relative w-full md:w-auto">
            <form
              method="post"
              action="/contact#footer-newsletter"
              id="footer-newsletter"
              className="flex flex-col sm:flex-row gap-4"
            >
              <input type="hidden" name="form_type" value="customer" />
              <input type="hidden" name="utf8" value="✓" />
              <input type="hidden" name="contact[tags]" value="newsletter" />

              <div className="form__input-wrapper relative flex-grow">
                <input
                  type="email"
                  id="footer[template--19018424221926__newsletter_home_PqGKGd][contact][email]"
                  name="contact[email]"
                  className="form__field w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-violet-600 focus:outline-none"
                  required
                />
                <label
                  htmlFor="footer[template--19018424221926__newsletter_home_PqGKGd][contact][email]"
                  className="form__floating-label absolute left-3 top-2 text-gray-500 pointer-events-none transition-all duration-200"
                >
                  Your email
                </label>
              </div>

              <button
                type="submit"
                className="form__submit px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
            <div className="vertical-border hidden md:block absolute right-0 top-0 h-full w-1 bg-violet-600"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
