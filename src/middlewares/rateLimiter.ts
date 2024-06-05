import { rateLimit } from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 1000, // 1 second
  limit: 3, // Limit each IP to 3 requests per `window` (here, per 1 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  handler: (req, res) => {
    // when the limits are reached this handler method is executed
    // just a console log in the develope mode
    console.log("limit reached");
    // redirect to the recaptcha page
    res.redirect("http://localhost:5173/");
  },
});

// for more information visit: https://www.npmjs.com/package/express-rate-limit
