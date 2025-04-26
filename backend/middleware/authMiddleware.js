import { authJWToken } from "./jwt.js";

// Check if the request had jwt or API key
export const authenticateRequest = (req, res, next) => {
  try {
    if (req.headers['authorization']) {
      return authJWToken(req, res, next);
    }
    if (req.headers["x-api-key"]) {
      throw new Error("Hey! no APIs in this household!")
    }
  } catch (error) {
    console.error('Cannot authenticate request');
    return res.status(403).json({ message: 'Cannot authenticate request' });
  }
}

export const authWeb = (req, res, next) => {
    try {
        let key = req?.headers["web-api-key"]
        if (!key) {
            return res.status(401).json({ message: 'This request is not accessible.' });
        }
        if (key === process.env.WEB_SECRET) {
            next();
        }
        
    } catch (error) {
        console.error('Cannot authenticate web request');
        return res.status(403).json({ message: 'Cannot authenticate web request' });
    }
}