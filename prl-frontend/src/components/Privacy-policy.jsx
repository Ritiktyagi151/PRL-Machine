import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Page Header */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Privacy Policy
          </h1>
          <p className="mt-2 text-gray-300">
            PARIDA RED LION INDIA PVT LTD (PRL)
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <p className="text-sm text-gray-500">
          Last Updated: <span className="font-medium">[09-01-2026]</span>
        </p>

        <p>
          PARIDA RED LION INDIA PVT LTD (“PRL”, “we”, “our”, “us”) respects your
          privacy and is committed to protecting the personal information of our
          website visitors, customers, and business partners. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you visit our website or use our services.
        </p>

        <p>
          By accessing or using our website, you agree to the terms of this
          Privacy Policy.
        </p>

        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            1. Information We Collect
          </h2>

          <h3 className="font-medium mt-4 mb-2">a) Personal Information</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Company name</li>
            <li>Address</li>
            <li>Enquiry or message details</li>
          </ul>

          <h3 className="font-medium mt-4 mb-2">
            b) Non-Personal / Technical Information
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited and time spent on the website</li>
            <li>Date and time of access</li>
          </ul>

          <p className="mt-2">
            This data helps us understand user behavior and improve website
            performance.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To respond to enquiries and provide requested information</li>
            <li>To process quotations, orders, and service requests</li>
            <li>To improve our products, services, and website experience</li>
            <li>To communicate important updates related to our business</li>
            <li>To comply with legal and regulatory obligations</li>
          </ul>
          <p className="mt-2">
            We do not use your personal information for any unlawful or
            unauthorized purposes.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            3. Sharing of Information
          </h2>
          <p>
            PRL does not sell, rent, or trade your personal information to third
            parties.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              When required by law, legal process, or government authority
            </li>
            <li>
              With trusted service providers (such as IT or hosting partners)
              solely for operational purposes
            </li>
            <li>With your explicit consent</li>
          </ul>
          <p className="mt-2">
            All third parties are required to maintain the confidentiality of
            your information.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security
            measures to protect your personal information from unauthorized
            access, alteration, disclosure, or destruction.
          </p>
          <p className="mt-2">
            While we strive to protect your data, no method of transmission over
            the internet is completely secure, and absolute security cannot be
            guaranteed.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            5. Cookies and Tracking Technologies
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Enhance website functionality</li>
            <li>Improve user experience</li>
            <li>Analyze website traffic and usage patterns</li>
          </ul>
          <p className="mt-2">
            You can choose to disable cookies through your browser settings.
            However, some website features may not function properly without
            cookies.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            6. Third-Party Links
          </h2>
          <p>
            Our website may contain links to third-party websites. PRL is not
            responsible for the privacy practices or content of such external
            websites. We encourage users to review the privacy policies of those
            websites separately.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Request access to your personal information</li>
            <li>Request correction or update of inaccurate data</li>
            <li>
              Request deletion of your personal information, subject to legal
              requirements
            </li>
          </ul>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            8. Changes to This Privacy Policy
          </h2>
          <p>
            PRL reserves the right to update or modify this Privacy Policy at any
            time without prior notice. Any changes will be effective immediately
            upon posting on the website.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
          <p className="font-medium">
            PARIDA RED LION INDIA PVT LTD (PRL)
          </p>
          <p>📍 GST NO - 09AAJCP6402H1ZC Address - Plot No-106 ,Ecotec -3 Udhyog Kendra-1 ,Greater Noida Gautambuddha Nagar ,Uttar Pradesh ,201306</p>
          <p>📧 Email: r.k.parida015@gmail.com</p>
          <p>📞 Phone: +91 7065500903</p>
        </section>

        {/* Footer Note */}
        <div className="border-t pt-4 text-sm text-gray-600">
          By using our website, you agree to our Privacy Policy and data
          practices.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
