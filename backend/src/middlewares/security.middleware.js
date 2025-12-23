/**
 * @description Prevents browsers and proxies from caching sensitive data.
 * This is crucial for Auth routes to ensure tokens aren't saved to the disk.
 */
export const noCache = (req, res, next) => {
  // Tells modern browsers not to store the response in any cache (disk or memory)
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  // Legacy support for HTTP/1.0 clients (older browsers/proxies)
  res.setHeader("Pragma", "no-cache");

  // Sets the expiration date to the past, marking the content as immediately 'stale'
  res.setHeader("Expires", "0");

  // Specifically tells intermediate CDNs/Caches not to store the response
  res.setHeader("Surrogate-Control", "no-store");

  next();
};

/**
 * @description Basic Security Headers to harden the HTTP response.
 */
export const securityHeaders = (req, res, next) => {
  // Prevents the browser from "guessing" the content type.
  // It forces the browser to stick to the 'application/json' we send.
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevents your site from being put in an <iframe> on another site.
  // This protects against "Clickjacking" attacks.
  res.setHeader("X-Frame-Options", "DENY");

  // Enables the Cross-Site Scripting (XSS) filter built into most browsers.
  res.setHeader("X-XSS-Protection", "1; mode=block");

  next();
};
