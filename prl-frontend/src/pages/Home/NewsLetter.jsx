import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, BellRing } from "lucide-react";
import RecaptchaField from "../../components/RecaptchaField";

const NewsletterSection = () => {
  const [recaptchaToken, setRecaptchaToken] = useState("");

  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-[#2A1E5A]">
      {/* 1. Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(//factorydirectsupplyonline.com/cdn/shop/files/back-newsletter.jpg?v=1736886888)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      {/* 2. Technical Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      {/* Decorative Red Accent - Hidden on very small screens to save space */}
      <div className="hidden sm:block absolute top-0 right-0 w-64 h-64 bg-[#EB1C24] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Responsive Border Accent: 
              - Top border on Mobile/Tablet (h-1.5 w-full)
              - Left border on Desktop (lg:w-1.5 lg:h-full) 
          */}
          <div className="absolute top-0 left-0 bg-[#EB1C24] w-full h-1.5 lg:w-1.5 lg:h-full"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* --- Left Side: Text Content --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EB1C24]/10 border border-[#EB1C24]/20 text-[#EB1C24] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4">
                <BellRing className="w-3 h-3" />
                <span>Stay Informed</span>
              </div>

              {/* Responsive Heading Sizes */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                Never Miss an{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EB1C24] to-white">
                  Update
                </span>
              </h2>

              {/* Responsive Paragraph Sizes */}
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Keep your toolbox stocked. Sharpen your fabrication skills with
                our latest industry updates, machine guides, and exclusive
                deals.
              </p>
            </motion.div>

            {/* --- Right Side: Form --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-5/12"
            >
              <form
                method="post"
                action="/contact#footer-newsletter"
                className="relative group w-full"
              >
                <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Input Field */}
                  <div className="relative flex-grow w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#EB1C24] transition-colors duration-300" />
                    </div>
                    <input
                      type="email"
                      name="contact[email]"
                      placeholder="Enter your email"
                      required
                      className="w-full pl-11 pr-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EB1C24] focus:border-transparent focus:bg-white/20 transition-all duration-300 shadow-inner text-sm sm:text-base"
                    />
                  </div>

                  <RecaptchaField onChange={setRecaptchaToken} />
                  <input type="hidden" name="recaptchaToken" value={recaptchaToken} />
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!recaptchaToken}
                    className="w-full sm:w-auto flex-shrink-0 px-6 sm:px-8 py-3 sm:py-4 bg-[#EB1C24] hover:bg-[#c4161d] text-white font-bold rounded-xl shadow-lg shadow-[#EB1C24]/30 hover:shadow-[#EB1C24]/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group/btn text-sm sm:text-base"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                <p className="mt-3 text-[10px] sm:text-xs text-gray-400 text-center sm:text-left opacity-80">
                  We care about your data in our{" "}
                  <span className="underline decoration-gray-500 hover:text-white cursor-pointer transition-colors">
                    privacy policy
                  </span>
                  .
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
