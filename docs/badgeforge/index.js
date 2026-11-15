(()=> {
  "use strict";
  const React = vendetta.metro.common.React;
  const RN = vendetta.metro.common.ReactNative;
  const storage = vendetta.plugin.storage;
  const after = vendetta.patcher.after;
  const defaults = {
    enabled: true,
    badges: "Early Supporter|early_supporter\nActive Developer|verified_developer\nPartner|partner",
    created: "2019-06-12",
    games: "Minecraft|1240\nFortnite|380\nRoblox|95"
  };
  const get = (key) => storage["bf_" + key] ?? defaults[key];
  const set = (key, value) => { storage["bf_" + key] = value; };
  let unpatch = null;
  let active = false;

  function selfId() {
    try {
      const store = vendetta.metro.findByStoreName("UserStore");
      const user = store?.getCurrentUser?.() ?? store?.getCurrentUser;
      return typeof user === "object" ? user?.id : undefined;
    } catch (_) { return undefined; }
  }

  function iconFor(name) {
    const key = String(name || "").toLowerCase().replace(/[^a-z0-9_]/g, "");
    const known = ["staff","partner","hypesquad","bug_hunter_level_1","bug_hunter_level_2","early_supporter","verified_developer","active_developer","certified_moderator","premium"];
    return known.includes(key) ? key : "staff";
  }

  function makeBadges() {
    const result = [];
    const lines = String(get("badges") || "").split(/\r?\n/).filter(Boolean);
    lines.forEach((line, index) => {
      const parts = line.split("|");
      const label = (parts[0] || "").trim().slice(0, 48);
      if (!label) return;
      result.push({
        id: "badgeforge-custom-" + index,
        icon: iconFor(parts[1]),
        description: "CUSTOM SHOWCASE · " + label + " · Not a Discord-issued badge"
      });
    });
    const created = String(get("created") || "").trim();
    if (created) result.push({
      id: "badgeforge-age",
      icon: "early_supporter",
      description: "CUSTOM SHOWCASE · Pretend account creation date: " + created + " · Local display only"
    });
    String(get("games") || "").split(/\r?\n/).filter(Boolean).forEach((line, index) => {
      const parts = line.split("|");
      const game = (parts[0] || "Game").trim().slice(0, 32);
      const hours = (parts[1] || "0").trim().slice(0, 12);
      result.push({
        id: "badgeforge-game-" + index,
        icon: "verified_developer",
        description: "CUSTOM SHOWCASE · " + game + " playtime: " + hours + " hours · Mock statistic"
      });
    });
    return result.slice(0, 18);
  }

  function onLoad() {
    if (active) return;
    active = true;
    try {
      const hook = vendetta.metro.findByName("useBadges", false);
      if (!hook || typeof hook !== "function") throw new Error("Could not find Discord's profile badge hook on this build.");
      unpatch = after("default", hook, ([user], original) => {
        if (!get("enabled")) return original;
        const id = user?.userId ?? user?.id;
        const me = selfId();
        if (!id || !me || String(id) !== String(me)) return original;
        const custom = makeBadges();
        if (!custom.length) return original;
        const existing = Array.isArray(original) ? original : [];
        return [...custom, ...existing];
      });
      vendetta.logger.log("[BadgeForge] Loaded. Local self-profile showcase enabled.");
    } catch (error) {
      active = false;
      vendetta.logger.error("[BadgeForge] Failed to attach profile badge hook", error);
      try { RN.Alert.alert("BadgeForge could not start", String(error?.message || error)); } catch (_) {}
      throw error;
    }
  }

  function onUnload() {
    active = false;
    if (typeof unpatch === "function") unpatch();
    unpatch = null;
  }

  function Settings() {
    const [enabled, setEnabled] = React.useState(!!get("enabled"));
    const [badges, setBadges] = React.useState(String(get("badges") || ""));
    const [created, setCreated] = React.useState(String(get("created") || ""));
    const [games, setGames] = React.useState(String(get("games") || ""));
    const [saved, setSaved] = React.useState(false);
    const styles = {
      page: { padding: 16, paddingBottom: 36 },
      heading: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 6 },
      hint: { color: "#b5bac1", fontSize: 13, lineHeight: 19, marginBottom: 16 },
      label: { color: "#f2f3f5", fontSize: 14, fontWeight: "600", marginTop: 14, marginBottom: 6 },
      input: { color: "#f2f3f5", backgroundColor: "#202225", borderRadius: 10, borderWidth: 1, borderColor: "#3f4147", padding: 12, minHeight: 46 },
      multi: { minHeight: 112, textAlignVertical: "top" },
      button: { backgroundColor: "#5865f2", borderRadius: 10, padding: 14, alignItems: "center", marginTop: 20 },
      buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
      note: { color: "#f0b232", fontSize: 12, lineHeight: 18, marginTop: 14 }
    };
    const text = (value, style, key) => React.createElement(RN.Text, { key, style }, value);
    const input = (value, onChangeText, placeholder, multiline) => React.createElement(RN.TextInput, {
      value, onChangeText, placeholder, placeholderTextColor: "#777b84",
      multiline: !!multiline, style: [styles.input, multiline && styles.multi],
      autoCapitalize: "sentences"
    });
    return React.createElement(RN.ScrollView, { style: { flex: 1 }, contentContainerStyle: styles.page },
      text("BadgeForge", styles.heading, "heading"),
      text("Build a custom profile flex card using local-only badge labels and pretend stats.", styles.hint, "intro"),
      text("Show custom badges", styles.label, "toggleLabel"),
      React.createElement(RN.Switch, { value: enabled, onValueChange: setEnabled, trackColor: { true: "#5865f2" } }),
      text("Custom badges", styles.label, "badgesLabel"),
      input(badges, setBadges, "Label|icon, one badge per line", true),
      text("Optional icon names: staff, partner, hypesquad, bug_hunter_level_1, early_supporter, verified_developer, active_developer. Unknown names use the staff icon.", styles.hint, "icons"),
      text("Pretend account creation date", styles.label, "createdLabel"),
      input(created, setCreated, "2019-06-12", false),
      text("Games and pretend hours", styles.label, "gamesLabel"),
      input(games, setGames, "Minecraft|1240\nFortnite|380", true),
      text("Use one game per line: Game name|hours", styles.hint, "gamesHint"),
      React.createElement(RN.TouchableOpacity, {
        style: styles.button,
        onPress: () => {
          set("enabled", enabled);
          set("badges", badges);
          set("created", created);
          set("games", games);
          setSaved(true);
          try { vendetta.ui.toasts.showToast("BadgeForge settings saved. Reload Discord to refresh your profile."); } catch (_) {}
        }
      }, text(saved ? "Saved ✓" : "Save showcase", styles.buttonText, "saveText")),
      text("LOCAL DISPLAY ONLY. These custom labels and statistics are not issued by Discord, do not change your account creation date or real game hours, and are only patched in your own client when viewing your own profile. Other users will not see them.", styles.note, "disclaimer")
    );
  }

  return { onLoad, onUnload, settings: Settings };
})()
