const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
const ExcelJS = require("exceljs");

// 1. Naya contact submission handle karega
exports.submitContact = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message || !subject) {
    return res.status(400).json({
      success: false,
      message: "Name, email, subject, and message are required",
    });
  }

  try {
    // Database mein save karein
    const newContact = await Contact.create({ name, email, phone, subject, message });

    // Email bhejne ke liye transporter banayein
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email ka content
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ success: true, message: "Message sent successfully!", data: newContact });
  } catch (error) {
    console.error("Error submitting contact:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// 2. Sabhi contacts ko Excel file mein export karega
exports.exportContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Contacts");

    worksheet.columns = [
      { header: "Date", key: "createdAt", width: 25 },
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Subject", key: "subject", width: 40 },
      { header: "Message", key: "message", width: 60 },
    ];
    
    worksheet.getRow(1).font = { bold: true };

    contacts.forEach((contact) => {
      worksheet.addRow({
        ...contact.toObject(),
        createdAt: contact.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=contacts.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exporting contacts:", error);
    res.status(500).json({ success: false, message: "Error exporting contacts" });
  }
};