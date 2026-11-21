# Security

- No secrets in source control; configure them in the Netlify environment.
- Separate preview and production env values; least privilege.
- Resend / email keys are server-side only (never `NEXT_PUBLIC_*`).
- Input validation, rate limiting, and bounded payloads required before any API/BOM endpoints ship.
- Affiliate resolver validates HTTPS destinations and blocks visitor-controlled redirects (open-redirect prevention).
- Report vulnerabilities privately to the repository owner.
