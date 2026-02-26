import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import Seo from "./Seo";

const routeSeoMap = {
  "/": {
    title: "Parida Red Lion | uPVC & Aluminum Window Machinery Manufacturer",
    description:
      "Parida Red Lion provides advanced uPVC and aluminum window machinery, turnkey factory solutions, installation, and training support.",
    keywords: [
      "uPVC window machines",
      "aluminum window machines",
      "window machinery manufacturer",
      "Parida Red Lion",
      "window fabrication machine",
    ],
  },
  "/blogs": {
    title: "Blogs | Parida Red Lion",
    description:
      "Read expert blogs on window manufacturing technology, machinery buying guides, and production best practices.",
    keywords: ["window technology blog", "uPVC machine blog", "aluminum fabrication blog"],
  },
  "/products": {
    title: "All Products | Parida Red Lion",
    description:
      "Explore complete product range including uPVC and aluminum window fabrication machinery for modern factories.",
    keywords: ["window machine products", "uPVC machinery", "aluminum machinery"],
  },
  "/products/upvcwindowmachines": {
    title: "uPVC Window Machines | Parida Red Lion",
    description:
      "Browse precision uPVC cutting, welding, routing, and cleaning machines built for high-efficiency production lines.",
    keywords: ["uPVC cutting machine", "uPVC welding machine", "uPVC cleaning machine"],
  },
  "/products/aluminumwindowmachines": {
    title: "Aluminum Window Machines | Parida Red Lion",
    description:
      "Discover high-performance aluminum window machinery for cutting, lock hole routing, punching, and crimping.",
    keywords: ["aluminum cutting machine", "aluminum lock hole machine", "aluminum crimping machine"],
  },
  "/contact": {
    title: "Contact Us | Parida Red Lion",
    description:
      "Contact Parida Red Lion for product enquiries, machine consultation, pricing, and after-sales support.",
    keywords: ["contact Parida Red Lion", "machine enquiry", "window machine support"],
  },
  "/casestudies": {
    title: "Case Studies | Parida Red Lion",
    description:
      "See real-world case studies of successful uPVC and aluminum window production setups powered by Parida Red Lion machines.",
    keywords: ["window machinery case study", "uPVC factory setup", "aluminum factory setup"],
  },
  "/turnkeypage": {
    title: "Turnkey Solutions | Parida Red Lion",
    description:
      "End-to-end turnkey solutions for window manufacturing plants including planning, setup, machinery, and training.",
    keywords: ["turnkey window factory", "window plant setup", "manufacturing turnkey solution"],
  },
  "/turnkeydetailpage": {
    title: "Turnkey Project Details | Parida Red Lion",
    description:
      "Detailed information about Parida Red Lion turnkey execution approach, process stages, and deliverables.",
    keywords: ["turnkey project details", "window factory planning"],
  },
  "/enquiry": {
    title: "Enquiry Form | Parida Red Lion",
    description: "Submit your machinery or service enquiry and our team will get back to you quickly.",
    keywords: ["machine enquiry form", "uPVC machine quote", "aluminum machine quote"],
  },
  "/privacypolicy": {
    title: "Privacy Policy | Parida Red Lion",
    description: "Read Parida Red Lion privacy policy for data usage, protection, and customer information handling.",
    keywords: ["privacy policy", "Parida Red Lion privacy"],
  },
  "/termsandconditions": {
    title: "Terms and Conditions | Parida Red Lion",
    description:
      "Review Parida Red Lion website and service terms, policies, and usage conditions.",
    keywords: ["terms and conditions", "Parida Red Lion terms"],
  },
  "/ourcompany/about": {
    title: "About Us | Parida Red Lion",
    description:
      "Learn about Parida Red Lion, our manufacturing expertise, values, and commitment to quality machinery.",
    keywords: ["about Parida Red Lion", "window machine company"],
  },
  "/ourcompany/faq": {
    title: "FAQ | Parida Red Lion",
    description:
      "Find answers to commonly asked questions about machine features, support, service, and buying process.",
    keywords: ["window machine FAQ", "uPVC machine questions"],
  },
  "/ourcompany/ourblogs": {
    title: "Our Blogs | Parida Red Lion",
    description: "Explore all company blogs focused on machinery, manufacturing trends, and practical factory insights.",
    keywords: ["Parida blog", "window production blog"],
  },
  "/ourcompany/team": {
    title: "Our Team | Parida Red Lion",
    description: "Meet the Parida Red Lion team behind our engineering, support, and customer success.",
    keywords: ["Parida Red Lion team", "engineering team"],
  },
  "/ourcompany/news": {
    title: "News | Parida Red Lion",
    description: "Latest company news, announcements, and updates from Parida Red Lion.",
    keywords: ["Parida news", "company updates"],
  },
  "/ourcompany/missionvision": {
    title: "Mission & Vision | Parida Red Lion",
    description:
      "Understand Parida Red Lion mission and vision for building efficient, reliable, and future-ready machinery.",
    keywords: ["mission and vision", "window machinery brand"],
  },
  "/services/machine-customization": {
    title: "Machine Customization Service | Parida Red Lion",
    description:
      "Custom machine solutions tailored to your production flow, space, and business requirements.",
    keywords: ["machine customization", "custom window machinery"],
  },
  "/services/installation": {
    title: "Installation Service | Parida Red Lion",
    description:
      "Professional machine installation and setup services to ensure safe and accurate commissioning.",
    keywords: ["machine installation", "factory machine setup"],
  },
  "/services/maintenance": {
    title: "Maintenance Service | Parida Red Lion",
    description:
      "Preventive and corrective maintenance services to keep your production line running smoothly.",
    keywords: ["machine maintenance", "window machine servicing"],
  },
  "/services/training": {
    title: "Training Service | Parida Red Lion",
    description:
      "Hands-on operator and technical training for improved machine utilization and output quality.",
    keywords: ["machine operator training", "window machine training"],
  },
};

const fallbackSeo = {
  title: "Parida Red Lion | Window Machinery Solutions",
  description:
    "Parida Red Lion offers complete solutions for uPVC and aluminum window machinery, services, and factory setup.",
  keywords: ["window machinery", "uPVC", "aluminum", "Parida Red Lion"],
};

const RouteSeo = () => {
  const { pathname } = useLocation();

  const dynamicRouteSeo =
    (matchPath("/blogs/:slug", pathname) && {
      title: "Blog Details | Parida Red Lion",
      description:
        "Read detailed blog insights on modern window fabrication technology and machinery.",
      keywords: ["blog details", "window technology article"],
      type: "article",
    }) ||
    (matchPath("/productdetailupvc/:id", pathname) && {
      title: "uPVC Product Details | Parida Red Lion",
      description:
        "Technical details, specifications, and highlights of Parida Red Lion uPVC machinery.",
      keywords: ["uPVC product detail", "uPVC machine specifications"],
      type: "product",
    }) ||
    (matchPath("/productdetailaluminium/:id", pathname) && {
      title: "Aluminum Product Details | Parida Red Lion",
      description:
        "Technical details, specifications, and highlights of Parida Red Lion aluminum machinery.",
      keywords: ["aluminum product detail", "aluminum machine specifications"],
      type: "product",
    });

  const seoData = dynamicRouteSeo || routeSeoMap[pathname] || fallbackSeo;

  return <Seo {...seoData} canonicalPath={pathname} />;
};

export default RouteSeo;
