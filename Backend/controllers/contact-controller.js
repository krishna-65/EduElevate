const mailSender = require("../utils/mailSender");

exports.ContactController = async (req, res) => {
    console.log("Contact form endpoint hit");

    const { firstName, lastName, email, phoneNo, message } = req.body;

    // Log request body for debugging
    console.log("Request body:", req.body);

    if (!firstName || !lastName || !email || !phoneNo || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {
        const response = await mailSender(
            'sharmakrishnakant721@gmail.com',
            "User contact related to website",
           ( `
            <h1>Contact Form Submission</h1>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile:</strong> ${phoneNo}</p>
            <p><strong>Message:</strong> ${message}</p>
        `)
        );

        if (response) {
            console.log("Email sent successfully:", response);
            return res.status(200).json({
                success: true,
                message: "Message sent successfully",
            });
        }
    } catch (error) {
        console.error("Error in ContactController:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while processing contact form",
            error: error.message,
        });
    }
};
