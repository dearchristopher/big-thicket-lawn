// Vercel serverless function to send quote request emails
// Uses Resend for email delivery (free tier: 3,000 emails/month)

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, phone, address, propertySize, servicesNeeded, additionalNotes, geocodedAddress } = req.body;

        // Basic validation
        if (!name || !email || !phone || !address || !propertySize || !servicesNeeded?.length) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Email content
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
                    New Quote Request - Big Thicket Lawn Services
                </h2>
                
                <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #374151; margin-top: 0;">Customer Information</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
                </div>

                <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #374151; margin-top: 0;">Property Details</h3>
                    <p><strong>Address:</strong> ${address}</p>
                    ${geocodedAddress ? `<p><strong>Verified Address:</strong> ${geocodedAddress.formatted}</p>` : ''}
                    ${geocodedAddress ? `<p><strong>Coordinates:</strong> ${geocodedAddress.coordinates.join(', ')}</p>` : ''}
                    <p><strong>Property Size:</strong> ${propertySize}</p>
                </div>

                <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #374151; margin-top: 0;">Services Requested</h3>
                    <ul style="margin: 0; padding-left: 20px;">
                        ${servicesNeeded.map(service => `<li style="margin: 5px 0;">${service}</li>`).join('')}
                    </ul>
                    ${additionalNotes ? `<p><strong>Additional Notes:</strong><br>${additionalNotes}</p>` : ''}
                </div>

                <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">
                        <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', {
            timeZone: 'America/Chicago',
            dateStyle: 'full',
            timeStyle: 'short'
        })}
                    </p>
                </div>

                <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">
                        This quote request was submitted through the Big Thicket Lawn Services website.
                    </p>
                </div>
            </div>
        `;

        // Plain text version
        const emailText = `
New Quote Request - Big Thicket Lawn Services

Customer Information:
Name: ${name}
Email: ${email}
Phone: ${phone}

Property Details:
Address: ${address}
${geocodedAddress ? `Verified Address: ${geocodedAddress.formatted}\n` : ''}
${geocodedAddress ? `Coordinates: ${geocodedAddress.coordinates.join(', ')}\n` : ''}
Property Size: ${propertySize}

Services Requested:
${servicesNeeded.map(service => `• ${service}`).join('\n')}

${additionalNotes ? `Additional Notes:\n${additionalNotes}\n` : ''}

Submitted: ${new Date().toLocaleString('en-US', {
            timeZone: 'America/Chicago',
            dateStyle: 'full',
            timeStyle: 'short'
        })}
        `.trim();


        const RESEND_API_KEY = process.env.RESEND_API_KEY;

        if (!RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY environment variable is not set');
        }

        // Send email using Resend API (following official docs pattern)
        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'Big Thicket Lawn <estimates@bigthicketlawn.com>', // Use your verified domain
                to: ['info@bigthicketlawn.com'],
                reply_to: email,
                subject: `New Quote Request from ${name}`,
                html: emailHtml,
                text: emailText,
            }),
        });

        if (!resendResponse.ok) {
            const errorData = await resendResponse.json();
            console.error('Resend API error:', errorData);
            throw new Error('Failed to send email');
        }

        const result = await resendResponse.json();
        console.log('Email sent successfully:', result.id);

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Quote request sent successfully!',
            emailId: result.id
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            error: 'Failed to send quote request. Please try again or contact us directly.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}
