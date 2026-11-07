import keystaticConfig from "../../keystatic.config";

// Local mode writes to the filesystem, which only makes sense on a developer machine.
// In a production build the admin and its API answer 404 until GitHub mode is set up.
export const keystaticEnabled =
  keystaticConfig.storage.kind !== "local" || process.env.NODE_ENV !== "production";
