({
  onLoad() {
    const logger = window.vendetta?.logger ?? window.Vendetta?.logger ?? window.Bunny?.logger;
    try { logger?.log?.("[BadgeForge] Loaded."); } catch {}
  },
  onUnload() {
    const logger = window.vendetta?.logger ?? window.Vendetta?.logger ?? window.Bunny?.logger;
    try { logger?.log?.("[BadgeForge] Unloaded."); } catch {}
  }
})
