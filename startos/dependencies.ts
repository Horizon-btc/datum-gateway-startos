import { autoconfig } from 'bitcoin-knots-startos/startos/actions/config/autoconfig'
import { i18n } from './i18n'
import { bitcoinDescription } from './manifest/i18n'
import { sdk } from './sdk'
import { ownUiUrl } from './utils'

const bitcoindIcon =
  'https://raw.githubusercontent.com/Start9Labs/bitcoin-knots-startos/cd8e4a6c77c8513cf1eca1997eb8029ed62b3863/dep-icon.svg'

export const dependencies = sdk.Dependencies.of().addDependency(
  sdk.Dependency.optional('bitcoind', {
    description: bitcoinDescription,
    metadata: {
      title: 'Bitcoin',
      icon: bitcoindIcon,
    },
    versionRange: '>=#knots:29.4.1:7',
    kind: 'running',
    healthChecks: ['bitcoind'],
    // Optional in the manifest so Datum can be installed before Bitcoin, but
    // always enabled: the gateway has no useful configuration without it.
    enabled: async () => true,
  }).withInit(async (effects) => {
    // bitcoind reaches Datum's NOTIFY endpoint over the LXC bridge (replaces the
    // deprecated datum.startos DNS name). Until the bridge URL resolves there is
    // no value that could work, so skip the task — this handler re-runs once the
    // host appears and creates it with the real URL.
    const notifyBase = await ownUiUrl(effects)
    if (!notifyBase) return

    const blocknotify = `curl -s -m5 ${notifyBase}/NOTIFY`

    await sdk.action.createTask(effects, 'bitcoind', autoconfig, 'critical', {
      input: {
        kind: 'partial',
        accept: [{ blocknotify }],
        set: { blocknotify },
      },
      when: { condition: 'input-not-matches', once: false },
      reason: i18n('Datum requires a particular blocknotify url'),
    })
  }),
)
