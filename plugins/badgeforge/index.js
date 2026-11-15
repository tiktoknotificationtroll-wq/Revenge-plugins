// BadgeForge: local-only profile showcase preview for Revenge.
const DEFAULTS = {
  enabled: true,
  displayName: "Your profile",
  accountCreated: "2018-04-01",
  badges: "Nitro, Active Developer, Partner, Early Supporter",
  games: "Minecraft: 2,400h\nFortnite: 850h\nRoblox: 1,200h",
  note: "Custom profile showcase"
};

function safeText(value, fallback) {
  return typeof value === "string" ? value : fallback;
}

function BadgeForgeSettings({ api }) {
  const React = api.unscoped.react.React;
  const RN = api.unscoped.react.ReactNative;
  const h = React.createElement;
  const stored = api.jsonStorage.use() || {};
  const settings = { ...DEFAULTS, ...stored };

  const update = (key, value) => {
    api.jsonStorage.set({ ...settings, [key]: value });
  };

  const colors = {
    background: "#17191f",
    panel: "#242832",
    border: "#3b4150",
    text: "#f2f3f5",
    muted: "#aeb5c2",
    accent: "#8b7cff",
    badge: "#34394a"
  };

  const label = (value) => h(RN.Text, {
    style: { color: colors.muted, fontSize: 12, fontWeight: "700", marginBottom: 6, marginTop: 12 }
  }, value);

  const field = (title, key, multiline) => h(RN.View, { key, style: { marginBottom: 3 } },
    label(title),
    h(RN.TextInput, {
      value: safeText(settings[key], DEFAULTS[key]),
      onChangeText: value => update(key, value),
      multiline: !!multiline,
      placeholderTextColor: "#7d8492",
      autoCapitalize: "sentences",
      style: {
        color: colors.text, backgroundColor: colors.panel, borderColor: colors.border,
        borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10,
        minHeight: multiline ? 84 : 42, textAlignVertical: multiline ? "top" : "center"
      }
    })
  );

  const badgeNames = safeText(settings.badges, "").split(",").map(x => x.trim()).filter(Boolean).slice(0, 12);
  const gameLines = safeText(settings.games, "").split("\n").map(x => x.trim()).filter(Boolean).slice(0, 12);

  return h(RN.ScrollView, { style: { flex: 1, backgroundColor: colors.background }, contentContainerStyle: { padding: 16, paddingBottom: 36 } },
    h(RN.Text, { style: { color: colors.text, fontSize: 24, fontWeight: "800" } }, "BadgeForge"),
    h(RN.Text, { style: { color: colors.muted, fontSize: 13, marginTop: 4, marginBottom: 14 } },
      "Build a custom local-only profile showcase. These are visual mock badges, not Discord entitlements."
    ),
    h(RN.View, { style: { backgroundColor: colors.panel, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 14, marginBottom: 14 } },
      h(RN.Text, { style: { color: colors.text, fontSize: 18, fontWeight: "800" } }, safeText(settings.displayName, DEFAULTS.displayName)),
      h(RN.Text, { style: { color: colors.muted, fontSize: 12, marginTop: 3 } }, "Account created · " + safeText(settings.accountCreated, DEFAULTS.accountCreated)),
      h(RN.View, { style: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 } },
        ...badgeNames.map((name, i) => h(RN.View, {
          key: name + i,
          style: { backgroundColor: colors.badge, borderRadius: 7, paddingHorizontal: 9, paddingVertical: 6, marginRight: 6, marginBottom: 6, borderWidth: 1, borderColor: colors.border }
        }, h(RN.Text, { style: { color: colors.text, fontSize: 11, fontWeight: "700" } }, name)))
      ),
      h(RN.Text, { style: { color: colors.accent, fontSize: 12, fontWeight: "700", marginTop: 8 } }, "GAME STATS"),
      ...gameLines.map((game, i) => h(RN.Text, { key: game + i, style: { color: colors.text, fontSize: 13, marginTop: 5 } }, game)),
      h(RN.Text, { style: { color: colors.muted, fontSize: 11, marginTop: 12 } }, safeText(settings.note, DEFAULTS.note))
    ),
    field("Display name", "displayName", false),
    field("Pretend account creation date", "accountCreated", false),
    field("Badges (comma-separated)", "badges", true),
    field("Games and hours (one per line)", "games", true),
    field("Small profile note", "note", false),
    h(RN.Pressable, {
      onPress: () => api.jsonStorage.set({ ...DEFAULTS }),
      style: { marginTop: 16, backgroundColor: "#383e4d", borderRadius: 10, padding: 12, alignItems: "center" }
    }, h(RN.Text, { style: { color: colors.text, fontWeight: "700" } }, "Reset preview"))
  );
}

export default plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start({ logger }) {
    logger.log("BadgeForge loaded. All profile stats are local preview data.");
  },
  SettingsComponent: BadgeForgeSettings
});
