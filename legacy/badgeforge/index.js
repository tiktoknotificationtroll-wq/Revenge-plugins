// BadgeForge legacy Revenge/Vendetta-style plugin entry point.
// This is a safe install smoke test and local-only showcase scaffold.
const { logger } = window.Vendetta ?? window.Bunny ?? {};
let toast;
export default {
  onLoad() {
    try {
      logger?.log?.("[BadgeForge] Loaded successfully.");
    } catch {}
  },
  onUnload() {
    try {
      logger?.log?.("[BadgeForge] Unloaded.");
    } catch {}
  },
};
