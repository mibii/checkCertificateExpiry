// README.md
# SSL Certificate Expiry Checker

A simple Node.js script to check SSL certificate expiry dates for multiple domains.

## Setup

1. Install dependencies:
\```bash
npm install
\```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your domain names and certificate paths

## Usage

Run the script using:
\```bash
npm run check
\```

## Environment Variables

- `DOMAIN_1`: First domain name
- `DOMAIN_1_CERT_PATH`: Path to first domain's certificate
- `DOMAIN_2`: Second domain name
- `DOMAIN_2_CERT_PATH`: Path to second domain's certificate