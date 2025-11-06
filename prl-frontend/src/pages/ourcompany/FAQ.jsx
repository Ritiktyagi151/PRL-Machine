import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    // About UPVC Windows
    {
      q: "What is UPVC?",
      a: "UPVC stands for unplasticized polyvinyl chloride. It is a rigid, durable plastic used for window profiles and frames. Unlike flexible PVC, UPVC is formulated without plasticizers, making it strong and resistant to weathering.",
    },
    {
      q: "What are the benefits of UPVC windows?",
      a: "• Excellent thermal insulation and energy efficiency\n• Low maintenance and long service life\n• High weather resistance (no corrosion, rot, or rust)\n• Sound insulation benefits\n• Low cost of ownership\n• Durability: Highly resistant to corrosion, rot, and fading.\n• Energy Efficiency: Excellent thermal insulation properties, helping to reduce heating and cooling costs.\n• Sound Insulation: Good acoustic properties, reducing external noise.\n• Weather Resistance: Withstands harsh weather conditions, including rain, sun, and wind.\n• Cost-Effective: Generally more affordable than traditional materials like wood or aluminum, with a longer lifespan.\n• Security: Often designed with multi-point locking systems for enhanced security.",
    },
    {
      q: "How long do UPVC windows last?",
      a: "With proper installation and maintenance, UPVC windows typically last 25–40 years or more, depending on quality and use. High-quality uPVC windows typically last 20–30 years, depending on the brand, installation quality, and exposure to environmental factors. Thanks to advances in technology, double glazed uPVC windows remain a firm favorite... Typically lasting around 20 years, which can vary between 10-35 years depending on the quality and upkeep.",
    },
    {
      q: "Are UPVC windows environmentally friendly?",
      a: "UPVC is recyclable. Reputable manufacturers design profiles for recycling at the end of life. Look for certificates and recycling programs. UPVC is a recyclable material. Many manufacturers incorporate recycled UPVC into their profiles. Its long lifespan also reduces the need for frequent replacements, contributing to sustainability. Furthermore, its thermal insulation properties can lead to reduced energy consumption in buildings.",
    },
    {
      q: "Do UPVC windows warp or yellow over time?",
      a: "Premium UPVC profiles are formulated to resist warping and yellowing. Poor quality profiles or exposure to harsh conditions can affect appearance over time. Yellowing is usually due to prolonged UV exposure. High-quality UPVC is less likely to discolor.",
    },
    {
      q: "What is the difference between UPVC and PVC?",
      a: "UPVC is unplasticized PVC, meaning it’s rigid. PVC (plasticized) is more flexible and typically used in other applications. UPVC windows use rigid profiles for structural strength.",
    },
    {
      q: "How energy efficient are UPVC windows?",
      a: "Efficiency depends on profile quality, double/triple glazing, spacer bars, and installation. Look for window energy ratings or U-values (lower is better). Yes, uPVC windows with double glazing significantly reduce heat loss and can lower energy bills.",
    },
    {
      q: "What glass types are used with UPVC windows?",
      a: "Options include double glazing, triple glazing, low-emissivity (Low-E) coatings, laminated glass, and insulated glass units (IGUs). Double-glazed with Low-E coating and Argon gas fill.",
    },
    {
      q: "How do I maintain UPVC windows?",
      a: "• Clean with mild soap and water; avoid abrasive cleaners\n• Lubricate hinges and locks periodically\n• Check seals/gaskets for wear and replace if needed\n• Inspect drainage channels to prevent blockage\nCleaning is simple: 1. Frame: Use a soft cloth dampened with warm water and mild soap. Avoid abrasive cleaners or solvents. For stubborn stains, a specialized UPVC cleaner can be used. 2. Glass: Clean with standard glass cleaner and a lint-free cloth. 3. Hardware: Ensure hinges and locks are free of debris. Lubricate moving parts occasionally with a silicone-based lubricant. Use warm water with a mild detergent. Avoid abrasive cleaners, solvents, or anything containing thinners.",
    },
    {
      q: "Can UPVC windows be custom-made?",
      a: "Yes, profiles come in various colors, finishes (woodgrain), and hardware options. Custom sizes and shapes are common in commercial and residential projects.",
    },
    {
      q: "Are UPVC windows secure?",
      a: "Modern UPVC systems integrate multi-point locking, reinforced steel cores, and secure glazing. Always choose accredited hardware and comply with local safety standards. uPVC windows can be very secure, especially with multi-point locking systems and reinforced frames.",
    },
    {
      q: "How do UPVC windows perform in extreme climates?",
      a: "They perform well in a wide range of conditions, given proper design, UV stabilizers, and hardware. In extreme heat, coatings and venting may help; in cold climates, ensure you have appropriate glazing and frame insulation.",
    },
    {
      q: "What maintenance is required for hardware and fittings?",
      a: "Periodic cleaning, lubrication, and inspection of hinges, locks, handles, and weather seals. Replace worn components to maintain performance.",
    },
    {
      q: "What causes condensation on UPVC windows?",
      a: "Condensation forms when indoor humidity meets cooler surface temperatures. It can indicate high indoor humidity or insufficient ventilation, not a defect of the window.",
    },
    {
      q: "What is a U-value, and why does it matter?",
      a: "The U-value measures heat transfer. Lower U-values mean better insulation. It helps quantify energy efficiency. The U-value measures the rate of heat loss. Lower U-value = Better insulation. A good double-glazed UPVC window should have a U-value of 1.3 W/m²K or lower.",
    },
    {
      q: "Do UPVC windows come with warranties?",
      a: "Most manufacturers offer warranties covering profiles, hardware, and glazing for varying periods (often 5–15 years for hardware and longer for profiles). Check the terms. Most reputable brands offer 10 years on frames and glass, with 1–2 years on hardware.",
    },
    {
      q: "How do I dispose of UPVC windows?",
      a: "UPVC can be recycled. Contact local recycling centers or the installer for take-back or recycling programs. uPVC is 100% recyclable and can be reprocessed into new profiles multiple times.",
    },
    {
      q: "What are common UPVC window profile systems?",
      a: "Common systems include designs with reinforced steel cores, multi-chamber profiles, and various gasket configurations. Brands vary by region.",
    },
    {
      q: "What is a glazing bead, gasket, and spacer?",
      a: "• Glazing bead secures the glass in the window.\n• Gasket seals the joints to prevent leaks.\n• Spacer separates panes in IGUs and reduces condensation.",
    },
    {
      q: "What tooling is required for UPVC window manufacture?",
      a: "• Profile cutting and punching tools\n• Corner joining (Welders or adhesives)\n• Glazing and fitting tools\n• Quality testing equipment (air/water leakage test rigs)",
    },
    {
      q: "What are common defects in manufacturing, and how to prevent them?",
      a: "• Poor welds: ensure proper welding temperature and alignment\n• Warping: control processing temperatures and fixture during curing\n• Gas leakage in IGUs: ensure proper sealant accuracy and curing",
    },
    {
      q: "How is quality controlled in UPVC window production?",
      a: "• Incoming material inspection (profiles, hardware)\n• In-process checks (dimensions, welds, glazing)\n• Final performance tests (air/water tightness, wind load)\n• Documentation and traceability",
    },
    {
      q: "What standards apply to UPVC windows?",
      a: "Standards vary by region (e.g., EN 14351 in Europe for windows and doors, ASTM standards in the US). Look for certifications like CE, KS, or local building codes.",
    },
    {
      q: "What is the difference between fixed and opening windows?",
      a: "• Fixed: non-operable, higher insulation and security\n• Opening: casement, tilt-and-turn, sliding, etc., with hardware for operation",
    },
    {
      q: "How do you choose the right hardware for UPVC windows?",
      a: "Consider security level, ease of use, anti-tilt features, multi-point locking, weather sealing, and compatibility with the profile.",
    },
    // About UPVC Window Installation
    {
      q: "What are essential steps in installation?",
      a: "• Accurate measurement and site preparation\n• Proper packing and leveling of the frame\n• Sealing and insulation using appropriate foam or sealants\n• Correct glass installation and hardware fitting\n• Finishing and weatherproofing",
    },
    {
      q: "What is the importance of proper drainage?",
      a: "Correct drainage channels prevent water ingress and encourage moisture management around the frame.",
    },
    {
      q: "How long does installation take?",
      a: "It varies by project size, but a typical residential installation can take 1–2 days per dwelling for a standard set of windows.",
    },
    {
      q: "What are common installation mistakes?",
      a: "• Inadequate sealing or improper flashing\n• Incorrect leveling leading to leakage or operation issues\n• Poor glazing bead fit or improper hardware setup",
    },
    {
      q: "What maintenance after installation?",
      a: "Inspect seals, hardware, and drainage; clean surfaces; ensure vents/windows operate smoothly; re-seal if needed.",
    },
    // About UPVC Window Machinery
    {
      q: "What machinery is used to produce UPVC windows?",
      a: "• Profile cutting and punching machines\n• Welding machines for corner joints\n• Glazing equipment for inserting glass and beads\n• Corner cleaning and packaging lines\n• Quality testing rigs for air/water tightness",
    },
    {
      q: "What should I consider when buying UPVC machinery?",
      a: "• Throughput and automation level\n• Compatibility with your profile systems\n• Spare parts availability and service support\n• Energy consumption and footprint\n• Safety features and operator training",
    },
    {
      q: "What maintenance is required for UPVC machinery?",
      a: "Regular lubrication, belt and blade maintenance, calibration checks, and scheduled preventive maintenance to minimize downtime.",
    },
    {
      q: "How to ensure operator safety?",
      a: "Use guard rails, emergency stops, training, lockout/tagout procedures, and proper PPE.",
    },
    {
      q: "What is the typical lifecycle of UPVC manufacturing equipment?",
      a: "Depending on usage and maintenance, equipment may operate effectively for 8–20+ years with proper service.",
    },
    // Troubleshooting and Support
    {
      q: "Why is there condensation between double-glazed panes?",
      a: "Likely due to a failed seal in the IGU; requires replacement of the glazing unit.",
    },
    {
      q: "What if a window is hard to open or close?",
      a: "Check for swelling due to moisture, misalignment, or damaged hardware. Lubricate moving parts and inspect seals.",
    },
    {
      q: "What should I do if the frame color fades?",
      a: "Check warranty and consider repainting or panel replacement if applicable. Some finishes are more UV-stable than others.",
    },
    {
      q: "How do I get replacement parts?",
      a: "Contact the window manufacturer or installer with model details, profile system, and part numbers.",
    },
    {
      q: "Where can I find compliance and certification information?",
      a: "Look for CE marks, door/window performance certificates, and regional building code certifications on product sheets or websites.",
    },
    // Additional from other sections
    {
      q: "What are the advantages of UPVC windows over aluminum or wood?",
      a: "Feature | UPVC | Aluminum | Wood\n---|---|---|---\nMaintenance | Low (easy to clean) | Low (can be anodized/powder coated) | High (requires painting/varnishing)\nInsulation | Excellent (thermal & acoustic) | Poor (conducts heat/cold) | Good (but can warp/rot)\nDurability | High (resistant to rot, corrosion) | High (strong, resistant to warping) | Moderate (susceptible to rot, pests, warping)\nCost | Moderate | Moderate to High | High\nAesthetics | Variety of colors & finishes | Sleek, modern, wide range of finishes | Natural beauty, can be painted/stained\nEnvironmental | Recyclable, long lifespan | Recyclable, energy-intensive production | Renewable (if sustainably sourced), can rot\nSecurity | Good (can incorporate multi-locks) | Good (strong material) | Varies (can be susceptible to tampering)",
    },
    {
      q: "What types of UPVC windows are available?",
      a: "Common types include: • Casement Windows: Hinged at the top or side, opening outwards or inwards. • Sliding Windows: Panels slide horizontally past each other. • Tilt and Turn Windows: Can tilt inwards from the top for ventilation or open fully inwards like a casement. • Fixed Windows: Non-opening windows, primarily for light and aesthetics. • Awning Windows: Hinged at the top, opening outwards. • Hopper Windows: Hinged at the bottom, opening inwards. • Bay and Bow Windows: Multi-panel windows that project outwards from the building.",
    },
    {
      q: "What are the essential machines for manufacturing UPVC windows?",
      a: "The core machines include: • UPVC Profile Cutting Machine: Precisely cuts UPVC profiles to required lengths and angles. • UPVC Welding Machine (Corner Welding Machine): Melts and fuses profiles together to form window frames and sashes. • UPVC Corner Cleaning Machine: Cleans the excess weld bead from the welded corners for a neat finish. • UPVC Milling Machine (End Milling Machine): Creates precise notches and drainage slots in the profiles. • UPVC Drilling Machine: Drills holes for handles, locks, and drainage. • UPVC Glazing Bead Cutting Machine: Cuts glazing beads to size for securing glass. • UPVC Profile Bending Machine (for curved windows): Used to create curved window frames.",
    },
    {
      q: "How does a UPVC welding machine work?",
      a: "A UPVC welding machine uses heated plates to melt the ends of the UPVC profiles. The profiles are then pressed together under controlled pressure and temperature, allowing them to fuse and form a strong, seamless corner.",
    },
    {
      q: "What is the importance of a corner cleaning machine?",
      a: "After welding, a rough bead of molten UPVC forms around the corner. The corner cleaning machine uses cutters to precisely remove this excess material, creating a smooth, aesthetically pleasing, and accurate corner joint.",
    },
    {
      q: "What types of milling machines are used?",
      a: "• Vertical Milling Machines: For general-purpose milling of lock-holes, handle holes, and transom cuts. • Horizontal Milling Machines: Often used for milling drainage slots and specific profile preparations. • CNC (Computer Numerical Control) Milling Machines: Offer high precision, automation, and the ability to perform complex milling operations.",
    },
    {
      q: "What are the key considerations when purchasing UPVC window manufacturing machinery?",
      a: "• Production Capacity: Match the machine's capability to your expected output. • Precision and Accuracy: Ensure machines deliver accurate cuts, welds, and clean finishes. • Ease of Operation and Maintenance: Choose user-friendly machines with readily available spare parts. • Brand Reputation and Support: Opt for reputable manufacturers with good after-sales service and technical support. • Automation Level: Consider the degree of automation required for efficiency. • Budget: Balance cost with the quality and features offered. • Safety Features: Ensure machines comply with safety standards.",
    },
    {
      q: "What kind of maintenance do these machines require?",
      a: "Regular maintenance is crucial: • Cleaning: Keep machines free from dust, debris, and UPVC shavings. • Lubrication: Regularly lubricate moving parts as per the manufacturer's manual. • Blade/Cutter Sharpening: Ensure cutting blades and milling cutters are sharp for clean cuts and efficient operation. • Calibration: Periodically check and calibrate measuring scales and guides. • Inspection: Regularly inspect electrical components, hydraulic systems (if applicable), and structural integrity. • Filter Cleaning: Clean or replace air and oil filters as recommended.",
    },
    {
      q: "What is the minimum investment required to start a UPVC window fabrication unit?",
      a: "A basic setup requires a significant investment. A rough breakdown for a small-scale unit: 1. Core Machinery: (~$25,000 - $50,000+) • Double Mitre Saw • 2-Head or 4-Head Welding Machine • Corner Cleaning Machine • Copy Notching Machine 2. Ancillary Equipment & Tools: (~$5,000 - $10,000) 3. Working Capital (Profiles, Hardware, Rent, Labor): (Varies significantly)",
    },
    {
      q: "What are the key factors to consider before buying UPVC machines?",
      a: "1. Production Volume: Are you a startup, medium, or large-scale producer? 2. Product Range: Will you make standard windows or complex doors and facades? 3. Budget: Initial investment vs. long-term ROI. 4. After-Sales Service: The most critical factor for operational continuity. 5. Space & Power: Factory space and electrical requirements (3-Phase power is often needed).",
    },
    {
      q: "What is the typical payback period on a UPVC machine investment?",
      a: "The payback period can range from 1.5 to 3 years, depending on: • Machine utilization and production efficiency. • Local market demand and competition. • Effective business management and marketing.",
    },
    {
      q: "What is the essential machinery list for a startup?",
      a: "A standard startup production line includes: 1. Double Mitre Saw 2. Four-Head Welding Machine 3. Corner Cleaning Machine 4. Hardware Notching Machine (Copy or CNC) 5. Profile Router / V-Grooving Machine (for T-Joints and sashes)",
    },
    {
      q: "Should I buy a new or a used UPVC machine?",
      a: "Factor | New Machine | Used Machine\n---|---| ---\nCost | Higher initial investment. | Lower upfront cost (30-50% less).\nWarranty | Full manufacturer warranty (1-2 years). | Usually no or limited warranty.\nTechnology | Latest features and energy efficiency. | May be outdated.\nReliability | High, with predictable performance. | Risk of hidden defects and breakdowns.\nBest For | Businesses prioritizing uptime and long-term reliability. | Experienced fabricators or those with a very tight budget.",
    },
    {
      q: "What is the difference between Copy and CNC Notching Machines?",
      a: "Feature | Copy Notching Machine | CNC Notching Machine\n---|---| ---\nOperation | Manual, uses a physical template for each profile. | Computer-controlled, uses digital programming.\nPrecision | Good, but dependent on operator skill and template quality. | Extremely high, consistent, and repeatable.\nSpeed & Flexibility | Slower; changing designs requires a new template. | Very fast for batch production; new designs are software-based.\nCost | Lower initial investment. | Higher initial investment.\nIdeal For | Small workshops with limited profile variety. | Medium to large units requiring high output and flexibility.",
    },
    {
      q: "What questions should I ask a machine supplier before purchasing?",
      a: "1. What is included in the quoted price? (Installation? Training?) 2. What is the warranty period and what does it cover? 3. What is the lead time for spare parts? 4. Do you provide on-site installation and training? 5. Can I get references from other customers in my region?",
    },
    {
      q: "How important is after-sales service and spare parts availability?",
      a: "This is the most critical factor after the machine's quality. A machine breakdown without available spares or technical support can halt your entire production, leading to significant financial loss.",
    },
    {
      q: "What kind of training is provided with the machines?",
      a: "Reputable suppliers provide: • On-Site Installation & Commissioning. • Basic Operational Training for your machine operators. • Basic Troubleshooting & Maintenance Training. Always confirm the scope and duration of training before purchase.",
    },
    {
      q: "How can I identify high-quality UPVC windows?",
      a: "Check for these key indicators: 1. Profile Quality: • Multi-chamber design (5+ chambers for better insulation). • Class A thickness (minimum 2.8mm). • Lead-free, stabilized formulation. 2. Glass Unit: Double-glazed with Low-E coating and Argon gas fill. 3. Hardware: Brands like Siegenia, Roto, or GU with multi-point locking. 4. Seals: High-quality, durable EPDM gaskets.",
    },
    {
      q: "What is the difference between a 3-chamber and a 5-chamber UPVC profile?",
      a: "The chambers are air pockets that provide insulation. • 3-Chamber: Standard insulation, suitable for mild climates. • 5-Chamber (or more): Superior thermal and acoustic insulation, recommended for extreme weather and noisy environments. It's a mark of a higher-end product.",
    },
    {
      q: "What should a good UPVC window quote include?",
      a: "A professional quote should be detailed and include: 1. Itemized list of all windows/doors (sizes, type, color). 2. Profile brand, series, and chamber number. 3. Glass specification (type, thickness, gas fill, U-value). 4. Hardware brand and type. 5. Cost of installation and any ancillary items (sills, grilles). 6. Warranty details for both product and installation.",
    },
    {
      q: "Why is professional installation non-negotiable?",
      a: "Poor installation can compromise: • Weatherproofing, leading to drafts and water ingress. • Structural Integrity and operation. • Warranty Validity. Most manufacturers' warranties are void if installation guidelines are not followed.",
    },
    {
      q: "What warranty should I expect?",
      a: "• Profile & Glass: 10+ years is standard for reputable suppliers. • Hardware: Typically 5-10 years. • Installation Workmanship: At least 2 years. Always get the warranty terms in writing.",
    },
    {
      q: "Are UPVC windows more expensive than aluminum or wood?",
      a: "• Initial Cost: UPVC is generally more cost-effective than high-quality wood but can be similarly priced or slightly more expensive than basic aluminum. • Long-Term Value: UPVC offers the best long-term value due to minimal maintenance, no painting, and superior energy efficiency, which saves on utility bills.",
    },
    {
      q: "What factors influence the final price of UPVC windows?",
      a: "1. Size and Design Complexity (e.g., tilt & turn vs. simple casement). 2. Profile Quality (chambers, thickness, brand). 3. Glass Specification (double/triple glazing, special coatings). 4. Hardware Brand and Type. 5. Installation Complexity (e.g., high-rise building).",
    },
    {
      q: "What is uPVC and why is it used for windows and doors?",
      a: "uPVC or PVCu is a form of plastic and stands for unplasticised polyvinyl chloride. It is also known as rigid PVC due to the fact that it is hard and not flexible. It is a resistant form of PVC that is often used for pipework and window frames.",
    },
    {
      q: "Why is uPVC a good material for window frames?",
      a: "uPVC is proven to offer excellent performance and durability, it is long lasting and requires very little maintenance making it the perfect material for your windows. It is also recognized for its thermal efficiency, sound insulation and great value for money. For larger frame sections we use a galvanized steel reinforcement to improve the strength and durability. With Safestyle you can rest assured that even in the harshest weather conditions your windows will not warp, rot or rust due to the quality and nature of the uPVC we manufacture.",
    },
    {
      q: "Are uPVC windows toxic?",
      a: "uPVC is a perfectly safe and non-toxic material as long as it is not burnt, it's production is highly regulated to make sure that it does not cause any harm or toxicity. The burning of PVC can result in the release of dioxins into the environment which are environmental persistent organic pollutants.",
    },
    {
      q: "Is uPVC better than wood?",
      a: "Not all window materials were made equal. uPVC windows are seen as the cheap alternative to wood due to their lower costs and low maintenance benefits. Wood, on the other hand, has over the years generated a bad reputation for high maintenance and expensive prices.",
    },
    {
      q: "How do you clean uPVC windows?",
      a: "Other than exceptional thermal efficiency, uPVC windows are incredibly low maintenance. However, they still require minor attention every now and then to retain their flawless aesthetics and optimum performance for as long as possible. So, a quick wipe down of the frames with a soft (non-abrasive) cloth and soapy water, combined with a quick spray of oil on the moving parts, will keep your windows in tip-top condition for as long as possible.",
    },
    {
      q: "How do you know when your uPVC windows need replacing?",
      a: "Unfortunately, it’s not always possible to repair double glazed uPVC windows. So, if any of these problems apply to your window frames it’s more than likely that they will need replacing; 1. Cracked, chipped or broken glass 2. Water leaking through the frames 3. Draughty frame",
    },
    {
      q: "What are the advantage of uPVC windows and doors?",
      a: "Firstly, they are Low Maintenance. uPVC window and doors frames don't need painting or sealing which significantly reduces the maintenance required over their lifetime. It contains some very significant features like- RESISTANT TO SALT EROSION - uPVC is resistant to corrosion caused by salt-laden air making them ideal for coastal properties. HIGH SECURITY - uPVC windows incorporate multi-locking systems providing a high level of security for homes or businesses. Most uPVC window locking systems lock at multiple points all around the sash and frame. RECYCLABLE - uPVC can be recycled as often as 10 times... ACOUSTIC INSULATION - Double glazed uPVC windows and doors are able to cut down noise by as much as 70%. THERMAL COMFORT - Unlike metals, uPVC is non-conductive... TOUGH AND DURABLE - uPVC is a very durable material... ROT RESISTANT - uPVC does not rot and is resistant to corrosion. OPENABLE TILT AND TURN - uPVC window systems allow for opening in two directions... LOW MAINTENANCE... BUSHFIRE PERFORMANCE - Double glazed uPVC windows can be used in Australia in areas where risk is zoned as Bushfire Attack Level 29kW/m2 (BAL 29). Some uPVC windows have been tested to withstand BAL 40.",
    },
    {
      q: "Which windows are better, uPVC or aluminium?",
      a: "uPVC windows and doors are also great at insulating sound and allow one to have quieter rooms but the aluminium windows and doors are not sound proof as compared to uPVC windows and doors. The below are the points... How Long do uPVC &Aluminium Windows and Doors Last? - Aluminium windows and doors have a longer shelf life, it lasts for about sixty years and on the other hand the life of uPVC doors and windows is around twenty-five to thirty years... Which is eco-friendlier uPVC or Aluminium Windows and Doors? - The aluminium doors and windows are Eco friendly... Which is more Durable uPVC or Aluminium Windows and Doors? - Durability is one of the main concerns... Which windows and doors are more modern and stylish Aluminium or uPVC? - The variety of Colour and styles... Maintenance Difference... Which one rust uPVC windows or Aluminium windows? - uPVC windows and doors are rust proof... Which windows or door has better Frames or profiles? - Frames of aluminium... Which windows or door is best for soundproofing Aluminium or uPVC? - uPVC windows and doors are also great at insulating sound... Which is more energy efficient Aluminium windows and doors or uPVC windows and doors? - Insulation of uPVC windows and door is very high...",
    },
    {
      q: "What are the main advantages of UPVC windows?",
      a: "• Energy Efficiency: Excellent thermal insulation reduces heating and cooling costs. • Low Maintenance: Does not rust, rot, or corrode. Easy to clean with soap and water. • Durability: Long-lasting and resistant to harsh weather conditions. • Sound Insulation: Significantly reduces outside noise. • Security: Multi-point locking systems provide enhanced security. • Cost-Effective: Generally more affordable than high-quality aluminum or wood. • No Painting Required: The color is consistent throughout the material.",
    },
    {
      q: "What should I look for when choosing a UPVC window?",
      a: "Factor | What to Look For\n---|---\nProfile Quality | Look for multi-chambered profiles (3+ chambers) for better insulation.\nGlass Unit | Double or triple glazing with Low-E coating and argon gas fill for best performance.\nHardware | Reputable brands from Germany or Austria (e.g., Siegenia, Roto, GU).\nWeather Seals | High-quality EPDM or TPE gaskets for long-lasting airtightness.\nColor & Finish | Ensure the color is through-body, not a surface laminate, for durability.",
    },
    {
      q: "What is the difference between 3-chamber and 5-chamber profiles?",
      a: "The chambers are hollow spaces within the UPVC profile that trap air, providing insulation. • 3-Chamber: Good for standard insulation needs. • 5-Chamber (or more): Superior thermal and acoustic insulation, recommended for extreme climates or noisy areas.",
    },
    {
      q: 'What does "A" or "B" Class mean for UPVC profiles?',
      a: "This refers to the wall thickness of the UPVC profile, which determines its strength and durability. • Class A: Minimum wall thickness of 2.8mm. Standard for residential windows. Strong and durable. • Class B: Wall thickness between 2.2mm and 2.8mm. Less robust, not recommended for larger windows or high-stress applications.",
    },
    {
      q: "How important is professional installation?",
      a: "Extremely important. A poor installation can void the product warranty and lead to issues like drafts, water leakage, and operational problems, regardless of the window's quality.",
    },
    {
      q: "How do I clean and maintain my UPVC windows?",
      a: "1. Cleaning: Use a soft cloth, mild soapy water, or a specialized UPVC cleaner. Avoid abrasive cleaners or solvents. 2. Seals: Wipe down and lightly silicone-spray the rubber gaskets once a year to keep them supple. 3. Hardware: Check and tighten locks and hinges periodically. Lubricate moving parts with a dry PTFE-based lubricant.",
    },
    {
      q: "My window is difficult to open/close. What should I do?",
      a: "This is often a simple maintenance issue. 1. Check for and clean any debris from the tracks and seals. 2. Inspect the hinges and locks for signs of wear or damage. 3. Lubricate the moving parts. If the problem persists, contact your installer.",
    },
    {
      q: "What are the essential machines for a UPVC window fabrication unit?",
      a: "A basic production line requires: 1. Double Mitre Saw: For precise 45° cutting of profiles. 2. Corner Cleaning Machine: To clean weld seams after welding. 3. Welding Machine: (Single-head or Four-head) To fuse profile corners together. 4. Hardware Notching Machine: To mill out sections for locks and hinges.",
    },
    {
      q: "What is the difference between a copy and a CNC notching machine?",
      a: "Feature | Copy Notching Machine | CNC Notching Machine\n---|---| ---\nOperation | Manual, uses a physical template. | Computer-controlled, uses a digital file.\nPrecision | Good, but depends on operator skill. | Extremely high and consistent.\nSpeed | Slower, requires template changes. | Faster for batch production and design changes.\nFlexibility | Limited to available templates. | Highly flexible; new designs are programmed.\nCost | Lower initial investment. | Higher initial investment.",
    },
    {
      q: "Should I start with a 2-head or 4-head welding machine?",
      a: "• 2-Head Welder: Suitable for very small workshops or startups with low volume. Requires manual repositioning of the profile, which is slower. • 4-Head Welder: Industry standard. Allows for welding all four corners of a window in one automated cycle, significantly increasing production speed and consistency.",
    },
    {
      q: "What are the common welding problems and their solutions?",
      a: "Problem | Possible Cause | Solution\n---|---| ---\nWeak Weld Strength | Incorrect temperature, pressure, or time settings. | Recalibrate machine settings as per profile supplier's specs.\nVisual Defects (Burn Marks) | Temperature too high. | Reduce welding temperature.\nMisaligned Corners | Worn pressure pads or incorrect profile positioning. | Replace pads and ensure profiles are seated correctly in the machine.",
    },
    {
      q: "How do I ensure my machinery produces consistent, high-quality output?",
      a: "1. Regular Calibration: Follow the manufacturer's schedule for calibrating temperature, pressure, and alignment. 2. Preventive Maintenance: Regularly clean, lubricate, and inspect components for wear. 3. Quality Input Material: Use high-quality UPVC profiles and compatible reinforcement steel. 4. Operator Training: Ensure operators are thoroughly trained on each machine's functions and settings.",
    },
    {
      q: "What is the typical production capacity of a standard line?",
      a: "A standard 4-head welder setup with a skilled operator can produce approximately 15-25 window units per 8-hour shift, depending on the window size and complexity.",
    },
    {
      q: "Where can I find technical support and spare parts?",
      a: "Always purchase machinery from a reputable supplier who offers: • Comprehensive after-sales service. • Ready availability of spare parts. • On-site or remote technical support and training.",
    },
    {
      q: "What is UPVC machinery used for?",
      a: "Equipment used to manufacture UPVC windows and doors, including profile cutting, punching, corner welding, glazing, Assembly lines, and quality testing rigs.",
    },
    {
      q: "What categories of UPVC machines exist?",
      a: "• Profile processing (cutting, punching, drilling)\n• Welding and corner joining (fusion/welding units)\n• Glazing and fitting (bead insertion, glazing robots)\n• Assembly lines (sub-assembly, handling, labeling)\n• Finishing and packaging (signage, packaging lines)\n• Quality testing (air/water leakage, wind load, dimensional checks)",
    },
    {
      q: "What are typical production capacities for UPVC machinery?",
      a: "Capacities vary widely by line and model, from small-family lines handling dozens of windows per shift to fully automated plants producing hundreds per shift. Provide your target throughput when evaluating.",
    },
    {
      q: "What is the difference between manual, semi-automatic, and fully automatic UPVC machinery?",
      a: "• Manual: operator-driven with basic automation\n• Semi-automatic: some automated functions with operator oversight\n• Fully automatic: integrated lines with minimal manual intervention and higher throughput",
    },
    {
      q: "What should I consider when choosing a profile system compatibility?",
      a: "Ensure the machine supports your profile brands, reinforcement methods, gasket types, and glazing sizes. Confirm compatibility with your profile’s dimensions and corner strength requirements.",
    },
    {
      q: "What factors should I evaluate in a UPVC machinery supplier?",
      a: "• Technical capability and compatibility with your line\n• After-sales service and spare parts availability\n• Lead times, delivery terms, and installation support\n• Training, warranties, and uptime guarantees\n• Total cost of ownership (purchase price, maintenance, energy use)",
    },
    {
      q: "What are typical payment and financing options?",
      a: "• Full upfront purchase, staged payments, or leasing/financing with service packages. Some suppliers offer pay-after-installation tied to performance milestones.",
    },
    {
      q: "What is included in a typical machinery warranty?",
      a: "• Parts and manufacturing defects for a defined period; on-site support or remote assistance; sometimes wear items (blades, belts) are excluded or offered as add-ons.",
    },
    {
      q: "Should I require on-site installation and commissioning?",
      a: "Yes. A reputable supplier should provide installation planning, site readiness requirements, commissioning, and operator training as part of the package.",
    },
    {
      q: "What kind of training should be included?",
      a: "Operator training, maintenance and safety training, and a tutorial on changeovers, fault diagnosis, and basic programming or recipe management if applicable.",
    },
    {
      q: "What documentation should I expect from a supplier?",
      a: "Technical manuals, wiring diagrams, maintenance schedules, spare parts lists, safety certifications, and installation checklists.",
    },
    {
      q: "What are key performance metrics to compare?",
      a: "Throughput (units per shift), cycle time, yield, uptime, energy consumption, accuracy/dimensional tolerance, and footprint.",
    },
    {
      q: "What level of automation and controls are standard?",
      a: "Modern lines use PLC-based controls, HMI touchscreens, sensors for alignment, servo motors, and PLC integration for data collection and SPC.",
    },
    {
      q: "How energy-intensive is UPVC machinery?",
      a: "Energy use depends on automation level, motors, and system design. Request energy consumption data and look for energy-saving features (e.g., efficient drive systems).",
    },
    {
      q: "What are common options to future-proof a line?",
      a: "• Modular architecture for easy upgrades\n• Open interfaces for data collection and MES integration\n• Flexible tooling for multiple profiles and glazing sizes\n• Upgrade paths for higher throughputs",
    },
    {
      q: "What kind of maintenance is required?",
      a: "Regular lubrication, blade and bit maintenance, alignment checks, belt/tire wear monitoring, spindle/cutter calibration, and periodic electrical/mechanical inspections.",
    },
    {
      q: "What spare parts should I stock?",
      a: "Critical wear items (blades, punches, seals, drive belts), common consumables (oils, lubricants), key wear parts, and a few days’ supply of control boards or fuses, depending on the model.",
    },
    {
      q: "What safety features should be present?",
      a: "Emergency stops, safety interlocks, guarded access, light curtains or safety PLCs, proper guarding around moving parts, and lockout/tagout procedures.",
    },
    {
      q: "What is the typical installation timeline?",
      a: "It varies with plant size but includes site preparation, mechanical installation, electrical and control integration, software setup, and commissioning over days to weeks.",
    },
    {
      q: "What should I provide during installation?",
      a: "Adequate space, power and utility availability, suitable airflow/ventilation, proper grounding, and worker training for safety.",
    },
    {
      q: "What commissioning tests are performed?",
      a: "Calibration checks, cycle testing, alignment verification, safety interlocks verification, and production trials to meet specified tolerances.",
    },
    {
      q: "What challenges commonly occur during installation?",
      a: "Site readiness issues, utility shortfalls, software integration delays, and operator learning curves.",
    },
    {
      q: "What is a typical production workflow on a UPVC line?",
      a: "Profile prep → cutting/ punching → corner welding → glazing/bead insertion → assembly/inspection → packaging.",
    },
    {
      q: "How do you optimize changeovers between profiles or sizes?",
      a: "Use standardized tooling sets, quick-change fixtures, digital job recipes, and scheduled maintenance to minimize downtime.",
    },
    {
      q: "How do you ensure product quality and consistency?",
      a: "Inline inspections, SPC data capture, regular calibration, and robust maintenance. Use standardized test methods for dimensions, seals, and fit.",
    },
    {
      q: "What data should I capture for performance monitoring?",
      a: "Throughput, cycle times, scrap rate, downtime, energy usage, tool life, and maintenance intervals. Use a data log or MES integration if possible.",
    },
    {
      q: "What kind of training is needed for operators and maintenance staff?",
      a: "Safe operation, machine set-up, routine maintenance, fault diagnosis, basic programming/configuration, and changeover procedures.",
    },
    {
      q: "How do I manage downtime and maintenance costs?",
      a: "Implement preventive maintenance, schedule periodic overhauls, keep critical spare parts on hand, and analyze downtime to identify root causes.",
    },
    {
      q: "What if the machine stops due to a fault?",
      a: "Consult the fault codes in the HMI, perform basic troubleshooting, contact the supplier for remote diagnostics if needed, and follow the escalation process.",
    },
    {
      q: "What standards apply to UPVC machinery?",
      a: "Industry standards vary by region; look for electrical safety standards (KN/KD, CE, UL), machine guarding requirements, and local PPE regulations.",
    },
    {
      q: "How is safety ensured in automated lines?",
      a: "Through engineered safeguards, interlocks, proper guarding, risk assessments, and operator training. Regular safety audits are recommended.",
    },
    {
      q: "Is there a need for compliance with environmental or import regulations?",
      a: "Yes. Ensure compliance with RoHS, WEEE, and any local environmental rules. Check import duties and certification requirements.",
    },
    {
      q: "What about software and cybersecurity?",
      a: "Use licensed software, regular updates, user access controls, and network security practices if connected to a plant network.",
    },
    {
      q: "What is the typical total cost of ownership (TCO) for UPVC machinery?",
      a: "Purchase price + installation + commissioning + spare parts + maintenance + energy consumption + downtime costs avoided by automation.",
    },
    {
      q: "How do I estimate ROI?",
      a: "Compare incremental throughput, labor savings, scrap reduction, quality gains, and maintenance costs against the investment and financing terms.",
    },
    {
      q: "Are there financing or leasing options?",
      a: "Many lenders and suppliers offer equipment leasing or financing with service and maintenance packages. Discuss terms early.",
    },
    {
      q: "What should I know about regional support and service levels?",
      a: "Local service availability, response times, parts lead times, and language-specific support can impact uptime.",
    },
    {
      q: "How do I validate a supplier’s claims?",
      a: "Request factory visits or virtual tours, customer references, performance data, and, if possible, a demo or trial run.",
    },
    {
      q: "What is the typical part replacement cycle?",
      a: "Consumables (blades, seals) require more frequent replacement; major components depend on usage and maintenance.",
    },
    {
      q: "How easy is it to obtain spare parts?",
      a: "Choose suppliers with a robust regional parts network, clear parts catalogs, and guaranteed lead times.",
    },
    {
      q: "What support options are available after purchase?",
      a: "Remote diagnostics, on-site service, preventive maintenance programs, training refreshers, and technical hotlines.",
    },
    {
      q: "What are common reasons for machine downtime and how to minimize them?",
      a: "Tool wear, misalignment, software glitches, and improper maintenance. Mitigate with preventive maintenance and operator training.",
    },
    {
      q: "How should I prepare an RFP/RFI for UPVC machinery?",
      a: "• Define production targets, profiles, and glazing types\n• Specify throughput, uptime, and quality requirements\n• List required integration (ERP/MES), safety standards, and training\n• Demand service levels, spare parts, and warranty terms",
    },
    {
      q: "What should be included in a vendor comparison?",
      a: "Score based on throughput, flexibility, ease of use, total cost of ownership, service quality, lead time, and references.",
    },
    {
      q: "What questions should I ask during vendor demonstrations?",
      a: "• Can you show a lifecycle example and a changeover?\n• How do you handle a production peak?\n• What is your remote support process and response time?\n• Can you provide a reference from a similar installation?",
    },
    {
      q: "What are the core machines needed to start a UPVC window manufacturing unit?",
      a: "At a minimum, a functional unit typically requires: • UPVC Profile Cutting Machine: For precise sizing of profiles. • UPVC Welding Machine (Corner Welder): To join profile sections. • UPVC Corner Cleaning Machine: To finish welded corners. • UPVC Milling Machine (End Miller): To create cutouts for hardware and drainage. • UPVC Drilling Machine: For handle, lock, and screw holes. • UPVC Glazing Bead Saw/Cutter: To cut bead strips accurately.",
    },
    {
      q: "What is the function of each machine?",
      a: "• Cutting Machine: Accurately cuts UPVC profiles to the required lengths and angles (usually 45 degrees for corners). • Welding Machine: Melts the ends of profiles and presses them together to create strong, fused corners for frames and sashes. • Cleaning Machine: Removes excess UPVC material (weld bead) from the welded corners, providing a clean and smooth finish. • Milling Machine: Creates precise slots and holes in the profiles for the installation of hardware like locks, handles, and for drainage. • Drilling Machine: Drills specific holes required for hinges, locking mechanisms, and screw fixings. • Glazing Bead Saw/Cutter: Cuts the decorative or functional strips that hold the glass in place within the frame.",
    },
    {
      q: "What are the different types of welding machines?",
      a: "• Single Head Welder: Welds one corner at a time. Suitable for smaller operations or for welding specific components. • Double Head Welder: Welds two corners simultaneously. Significantly increases production speed. • Four Head Welder: Welds all four corners of a frame in a single operation. Offers the highest production efficiency for standard rectangular frames. • Programmable/CNC Welders: Offer advanced control over welding parameters for higher precision and consistency, often with automated sequences.",
    },
    {
      q: "What are the key features to look for in a corner cleaning machine?",
      a: "• Precision of Cleaning: Ability to achieve a clean, sharp corner without damaging the profile. • Adjustability: Should accommodate different profile types and sizes. • Cutter Quality: Durable and sharp cutters for consistent performance. • Ease of Operation: Simple controls and straightforward setup. • Dust Collection: An integrated system to manage UPVC dust is beneficial.",
    },
    {
      q: "How important is the milling machine's precision?",
      a: "Crucial. Precise milling ensures that hardware fits correctly, locks engage properly, and drainage systems function as intended. Inaccurate milling can lead to issues with window operation, sealing, and security.",
    },
    {
      q: "What about ancillary machines?",
      a: "Depending on the product range, you might also need: • UPVC Profile Bending Machine: For manufacturing curved or arched windows. • UPVC End Trimming Machine: To trim the ends of profiles after welding or for specific fabrications. • UPVC Reinforcement Cutting Saw: For cutting steel reinforcements that are often inserted into UPVC profiles for added strength.",
    },
    {
      q: "What factors should I consider before buying machinery?",
      a: "• Production Volume: How many windows do you plan to produce daily/monthly? This dictates the speed and type of machines needed (e.g., single vs. double head welder). • Budget: What is your investment capacity? Machine prices vary significantly based on brand, features, and automation. • Space Availability: Measure your workshop and ensure sufficient space for the machines, material storage, and workflow. • Power Supply: Confirm your workshop has the required electrical capacity and voltage for the machines. • Technical Skill of Operators: Choose machines that match the skill level of your workforce, or factor in training costs. • Future Growth Plans: Consider if the machines can be upgraded or if you'll need more advanced models as your business expands.",
    },
    {
      q: "How do I choose a reliable machine supplier?",
      a: "• Reputation and Reviews: Research the supplier's history, customer feedback, and market standing. • After-Sales Service: Inquire about warranty, installation support, training, spare parts availability, and technical assistance. • Machine Demonstrations: Always request a live demonstration of the machines in operation. • Machine Quality: Inspect the build quality, materials used, and overall robustness of the machinery. • Transparency: Ensure clear pricing, terms, and conditions. • References: Ask for references from existing customers who have purchased similar equipment.",
    },
    {
      q: "What is the typical price range for a set of essential UPVC window machines?",
      a: "Prices vary greatly by manufacturer, country of origin, automation level, and capacity. A basic set (cutting, welding, cleaning, milling) from a reputable Chinese manufacturer might range from $10,000 to $30,000 USD. European-made machines with higher automation and precision can range from $40,000 to $100,000+ USD or significantly more for advanced CNC lines. Note: These are approximate ranges and subject to change based on market conditions.",
    },
    {
      q: "Should I buy new or used machinery?",
      a: "• New Machinery: Pros: Latest technology, full warranty, reliable performance, readily available support. Cons: Higher initial cost. • Used Machinery: Pros: Lower initial cost, can be a good option for startups or small-scale operations. Cons: May require more maintenance, no warranty, limited support, risk of hidden defects, potentially older technology. Recommendation: If buying used, ensure thorough inspection by a qualified technician and negotiate a short warranty period.",
    },
    {
      q: "What kind of training is usually provided?",
      a: "Reputable suppliers typically offer: • On-site Installation and Commissioning: Setting up the machines and ensuring they run correctly. • Operator Training: Instruction on how to operate each machine safely and efficiently. • Basic Maintenance Training: Guidance on routine cleaning, lubrication, and simple troubleshooting.",
    },
    {
      q: "What are the payment terms and financing options?",
      a: "• Payment Terms: Often involve an upfront deposit (e.g., 30%), with the balance due before shipment or upon delivery. • Financing: Some suppliers may offer payment plans, while others rely on external financing. Buyers often need to arrange their own business loans or leases. Inquire directly with the supplier about their policies.",
    },
    {
      q: "How long is the warranty period, and what does it cover?",
      a: "• Standard Warranty: Typically ranges from 6 months to 2 years, depending on the manufacturer and machine type. • Coverage: Usually covers manufacturing defects and component failures under normal operating conditions. It generally excludes consumables (blades, cutters), damage from misuse, lack of maintenance, or electrical surges.",
    },
    {
      q: "What about spare parts?",
      a: "• Availability: Ensure the supplier has a readily available stock of critical spare parts. Ask about lead times for ordering parts if they are not in stock. • Common Parts: Blades, cutters, heating elements, control board components, and belts are common wear items.",
    },
    {
      q: "Are all uPVC window brands the same?",
      a: "No, quality varies by manufacturer. Look for UV-stable polymers, reinforced frames, and reputable warranties when comparing brands.",
    },
    {
      q: "Can uPVC windows be recycled?",
      a: "Yes, uPVC is recyclable, making it an eco-friendly choice compared to some traditional materials.",
    },
    {
      q: "What are the main advantages of uPVC over wood or aluminium?",
      a: "• Low maintenance (no painting or polishing needed) • Excellent thermal and sound insulation • Resistance to rot, corrosion, and weathering • Cost-effective over the long term",
    },
    {
      q: "Can I replace my existing windows with uPVC?",
      a: "Yes, uPVC systems are suitable for both new builds and renovations.",
    },
    {
      q: "How do I measure for uPVC windows?",
      a: "Measure the width and height at multiple points, note any irregularities, and consult your supplier for precise requirements.",
    },
    {
      q: "What is the typical delivery and installation timeline?",
      a: "Timelines vary by supplier but usually range from a few days to several weeks. Always confirm with your vendor.",
    },
    {
      q: "Do uPVC windows require painting?",
      a: "No, uPVC does not need painting. Some specialized paints can be used for color changes, but this is uncommon.",
    },
    {
      q: "Are uPVC windows strong?",
      a: "Yes, especially when internally reinforced with galvanized steel. Fusion-welded corners further enhance strength.",
    },
    {
      q: "Are uPVC windows safe against break-ins?",
      a: "uPVC windows can be very secure, especially with multi-point locking systems and reinforced frames.",
    },
    {
      q: "Are uPVC windows fire-resistant?",
      a: 'uPVC does not support combustion and is self-extinguishing, but it can char under extreme heat. It has got an "A" class fire rating.',
    },
    {
      q: "Are uPVC windows soundproof?",
      a: "Double-glazed uPVC windows offer good sound insulation, though performance varies by glass type and installation. Double glazed uPVC windows and doors are able to cut down noise by as much as 70%.",
    },
    {
      q: "Do uPVC windows save energy?",
      a: "Yes, uPVC windows with double glazing significantly reduce heat loss and can lower energy bills. Double glazing alone is thought to reduce your energy bills by around £170; this thing is considerably increased with combined with the use of uPVC.",
    },
    {
      q: "What are double-glazed uPVC windows?",
      a: "These have two panes of glass with an air or gas gap in between, improving insulation.",
    },
    {
      q: "How much do uPVC windows cost?",
      a: "Prices range from £500 to £1,950 per window, depending on size, style, and features.",
    },
    {
      q: "What warranty is typical for uPVC windows?",
      a: "Most reputable brands offer 10 years on frames and glass, with 1–2 years on hardware.",
    },
    {
      q: "What are common uPVC window problems?",
      a: "• Draughts from poor sealing • Stiff or stuck mechanisms • Gasket sticking to the frame • Lock malfunctions",
    },
    {
      q: "How can I repair a stuck gasket?",
      a: "Gently separate the frame from the gasket using a bank card or blunt knife. Do not force the window.",
    },
    {
      q: "When should I replace my uPVC windows?",
      a: "Consider replacement if frames are warped, seals are failing, or condensation appears between panes.",
    },
    {
      q: "Where are uPVC windows made?",
      a: "uPVC windows are manufactured globally, including in Europe, India, and other regions with robust PVC industries.",
    },
    {
      q: "Do manufacturers use their own facilities or outsource?",
      a: "Quality control is often better with end-to-end manufacturers who handle both production and installation.",
    },
    {
      q: "What should I ask a uPVC vendor before purchasing?",
      a: "• Warranty details (frame, glass, hardware) • Written specifications and quotes • Real customer references or site photos • Service contact for after-sales support • Delivery and installation timeline",
    },
    {
      q: "What types of uPVC windows are available?",
      a: "Casement, sliding, tilt & turn, top-hung, and sash styles are common. Slider, Bay, Bow, Casement, etc. are some example of the varieties you can get when you are opting for uPVC windows and doors.",
    },
    {
      q: "How are uPVC windows made?",
      a: "uPVC profiles are extruded, cut, welded at corners, fitted with hardware and glazing, then quality checked.",
    },
    {
      q: 'What is a "rated" uPVC window?',
      a: "A rated window meets specific energy performance standards, often indicated by labels like ENERGY STAR or local certifications.",
    },
    {
      q: "Who do I contact for service issues?",
      a: "Always confirm your vendor’s after-sales support contact before purchase.",
    },
    {
      q: "How can one choose the right uPVC doors and windows?",
      a: "When you plan to buy uPVC window, there are a few important points you should consider carefully before making a decision... Selection of a right uPVC Profile and manufacturing department - Selection of a right uPVC Profile plays a major role... Attributes of good uPVC windows and doors - The profile must not contain lead... Source of Origin plays a crucial role - Source of origin is a major cause for price variation... Window and door System - All structure of uPVC system... Designing of the Windows and Doors - Designing of window is way too important... Secureness of the uPVC Windows and Doors - The uPVC doors and windows are generally tempered... Which style is the best for you? - The uPVC doors and windows come in a range of varieties and styles...",
    },
    {
      q: "When it comes to windows, is uPVC an ideal option?",
      a: "uPVC is extensively used because it is not easily affected by climatic changes unlike other substances like wood and the best part about it is it lasts longer without any such prior repairs. The main points which proves it an ideal option are follows- It is truly Fire-Resistant - Fire tests have shown... Resistant to corrosion and salt erosion - It is totally Resistant... It is Anti-Crowbar - Most uPVC doors and windows are anti-crowbar... Longer Life-Span - The longevity of uPVC windows... Little Maintenance Required - As uPVC is resistant... Recyclable Material - For those looking become eco-friendlier... External Noise Reduction - Living in a busy city... Saves Energy Costs - Many are surprised...",
    },
    {
      q: "What are the steps to follow for the installation of uPVC windows?",
      a: "uPVC windows are largely beneficial in a variety of ways... Put aside the tools that will come in handy - To make the overall process easier... Basic preparation - You must understand... The consultation process - Once the site visit... Remove the existing window - Firstly you will need... Fit the new window - In this regard... The glazing process - For this, you need to position...",
    },
    {
      q: "How many machines do one need to set up a UPVC window workshop?",
      a: "Depends on how many windows per week you need to make, you can make PVC windows with as little as 2 machines(a saw and a welder) up to between 20 & 30 machines. Most of the bigger machines work off 3 phase electricity supply so that would need taken into account as well.",
    },
    // Add more if needed, but this covers the majority without excessive duplication
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#281E5A] mb-3">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-[#EC1C24] mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore our comprehensive frequently asked questions to learn more
            about UPVC windows, manufacturing, installation, machinery, and
            more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                className="w-full text-left p-5 bg-[#281E5A] text-white font-semibold flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.q}</span>
                <span className="text-xl">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-5 text-gray-700 border-l-4 border-[#EC1C24]">
                  <pre className="whitespace-pre-wrap">{item.a}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h3 className="text-2xl font-bold text-[#281E5A] mb-6">
                Still Have Questions?
              </h3>
              <p className="text-gray-700 mb-6">
                Can't find the answer you're looking for? Our team is ready to
                help you with any questions about UPVC windows, fabrication
                machinery, installation, and services.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#281E5A] text-white p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Call Us</h4>
                    <p className="text-gray-600">+91 7065500903</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#281E5A] text-white p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email Us</h4>
                    <p className="text-gray-600">r.k.parida015@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#281E5A] text-white p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Visit Us</h4>
                    <p className="text-gray-600">
                      PARIDA RED LION INDIA PVT LTD GST NO - 09AAJCP6402H1ZC
                      Address - Plot No-106 ,Ecotec -3 Udhyog Kendra-1 ,Greater
                      Noida Gautambuddha Nagar ,Uttar Pradesh ,201306
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-[#281E5A] text-white p-8 rounded-lg shadow-lg max-w-md">
                <h3 className="text-2xl font-bold mb-4">
                  About Parida Red Lion
                </h3>
                <p className="mb-4">
                  Parida Red Lion is a leading manufacturer of high-quality UPVC
                  window fabrication machinery with over 25 years of industry
                  experience.
                </p>
                <p className="mb-4">
                  We specialize in creating innovative solutions for UPVC window
                  production, serving the construction and manufacturing
                  industries worldwide.
                </p>
                <div className="flex items-center mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
