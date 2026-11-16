import keystaticConfig from "../../keystatic.config";

// GitHub mode needs the GitHub App credentials. Without them Keystatic's route handler throws
// on import, which would break the build, so the admin and its API answer 404 until all are set.
// Only checks that the variables exist; their values are never read here.
const githubEnvVars = [
  "KEYSTATIC_GITHUB_CLIENT_ID",
  "KEYSTATIC_GITHUB_CLIENT_SECRET",
  "KEYSTATIC_SECRET",
  "NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG",
];

export const keystaticEnabled =
  keystaticConfig.storage.kind === "local" || githubEnvVars.every((name) => !!process.env[name]);
