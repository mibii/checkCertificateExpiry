// checkCertificateExpiry.js
require('dotenv').config();
const fs = require('fs');
const { X509Certificate } = require('crypto');

// Certificate configuration from environment variables
const certificates = [
    {
        domain: process.env.DOMAIN_1,
        path: process.env.DOMAIN_1_CERT_PATH
    },
    {
        domain: process.env.DOMAIN_2,
        path: process.env.DOMAIN_2_CERT_PATH
    }
].filter(cert => cert.domain && cert.path); // Only include certificates with configured values

function checkCertificateExpiry() {
    if (certificates.length === 0) {
        console.error('No certificates configured in environment variables');
        return;
    }

    certificates.forEach(cert => {
        try {
            // Read the certificate file
            const certFile = fs.readFileSync(cert.path);
            
            // Create X509Certificate object
            const x509 = new X509Certificate(certFile);
            
            // Get expiry date
            const expiryDate = new Date(x509.validTo);
            const now = new Date();
            
            // Calculate days until expiry
            const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
            
            // Format the date for display
            const formattedDate = expiryDate.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            console.log(`\nDomain: ${cert.domain}`);
            console.log(`Certificate expires on: ${formattedDate}`);
            console.log(`Days until expiry: ${daysUntilExpiry}`);
            
            // Add warning if certificate is expiring soon
            if (daysUntilExpiry <= 30) {
                console.log('\x1b[33m%s\x1b[0m', 'WARNING: Certificate will expire in less than 30 days!');
            }
            if (daysUntilExpiry <= 7) {
                console.log('\x1b[31m%s\x1b[0m', 'CRITICAL: Certificate will expire in less than 7 days!');
            }
            
        } catch (error) {
            console.error(`\nError checking certificate for ${cert.domain}:`);
            console.error(error.message);
        }
    });
}

// Run the check
checkCertificateExpiry();