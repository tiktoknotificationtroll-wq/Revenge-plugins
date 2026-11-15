import { Design } from '@revenge-mod/discord/design'

interface Settings {
  displayName: string
  accountCreated: string
  badges: string
  games: string
  note: string
}

const defaults: Settings = {
  displayName: 'Your profile',
  accountCreated: '2018-04-01',
  badges: 'Nitro, Active Developer, Partner, Early Supporter',
  games: 'Minecraft: 2,400h\nFortnite: 850h\nRoblox: 1,200h',
  note: 'Custom profile showcase',
}

export default plugin<{ jsonStorage: Settings }>({
  jsonStorage: { load: true, default: defaults },

  start({ logger }) {
    logger.log('BadgeForge loaded')
  },

  SettingsComponent({ api }) {
    const { TableRowGroup, TableInputRow, TableRow } = Design
    const settings = api.jsonStorage.use() ?? defaults

    const update = (key: keyof Settings, value: string) => {
      api.jsonStorage.set({ ...settings, [key]: value })
    }

    return (
      <>
        <TableRowGroup title="Profile showcase">
          <TableInputRow
            label="Display name"
            value={settings.displayName}
            onChange={(value: string) => update('displayName', value)}
          />
          <TableInputRow
            label="Pretend account creation date"
            value={settings.accountCreated}
            onChange={(value: string) => update('accountCreated', value)}
          />
          <TableInputRow
            label="Badges (comma-separated)"
            value={settings.badges}
            onChange={(value: string) => update('badges', value)}
          />
          <TableInputRow
            label="Games and hours (one per line)"
            value={settings.games}
            onChange={(value: string) => update('games', value)}
          />
          <TableInputRow
            label="Profile note"
            value={settings.note}
            onChange={(value: string) => update('note', value)}
          />
        </TableRowGroup>
        <TableRowGroup title="Preview">
          <TableRow label={settings.displayName} subLabel={'Created ' + settings.accountCreated} />
          <TableRow label="Badges" subLabel={settings.badges || 'None'} />
          <TableRow label="Game hours" subLabel={settings.games || 'None'} />
          <TableRow label="Note" subLabel={settings.note || 'None'} />
        </TableRowGroup>
        <TableRowGroup>
          <TableRow label="Local showcase only" subLabel="These custom values are not Discord-issued badges or account/game statistics, and are not visible to other users." />
        </TableRowGroup>
      </>
    )
  },
})
