// Test script for the Resend email serverless function
// Run with: node test-email.js

// IMPORTANT: Replace 'YOUR_RESEND_API_KEY_HERE' with your actual Resend API key
process.env.RESEND_API_KEY = 're_arKdDEt2_5TqyxbYAz6jxfFhAuKvqsvtf';

// Import the serverless function (ES module)
import handler from './api/send-quote.js';

// Test data - modify as needed
const testData = {
    name: 'Test Customer',
    email: 'info@bigthicketlawn.com', // Change to your email to receive the test
    phone: '555-123-4567',
    address: '123 Main St, Lumberton, TX',
    propertySize: 'medium',
    servicesNeeded: ['mowing', 'trimming', 'edging'],
    additionalNotes: 'This is a test email from the serverless function.',
    geocodedAddress: {
        formatted: '123 Main St, Lumberton, TX 77657, USA',
        coordinates: [-94.2249430, 30.2779033],
        city: 'Lumberton',
        state: 'Texas'
    }
};

// Mock Vercel request/response objects
const mockReq = {
    method: 'POST',
    body: testData
};

const mockRes = {
    status: (code) => ({
        json: (data) => {
            console.log(`\n✅ Response ${code}:`);
            console.log(JSON.stringify(data, null, 2));
            if (code === 200) {
                console.log('\n🎉 Email sent successfully! Check your inbox.');
            } else {
                console.log('\n❌ Email failed to send.');
            }
            return mockRes;
        }
    })
};

// Run the test
console.log('🧪 Testing Resend email serverless function...');
console.log('📧 Sending test email to:', testData.email);
console.log('📍 Test address:', testData.address);
console.log('🛠️  Services:', testData.servicesNeeded.join(', '));
console.log('\n⏳ Sending email via Resend API...');

handler(mockReq, mockRes).catch((error) => {
    console.error('\n❌ Test failed with error:');
    console.error(error.message);
    console.error('\nPossible issues:');
    console.error('- Check your RESEND_API_KEY is correct');
    console.error('- Verify your domain is set up in Resend');
    console.error('- Make sure quotes@bigthicketlawn.com is verified');
});
