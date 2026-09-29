import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '#pow:0.4.1:24',
  releaseNotes: {
    en_US: "Update to the latest master commit - ac9b70c8b361f14e90e2c963b429a9bbb414aecb"
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
    other: {
        ['*']: {
            up: async ({ effects }) => {},
        }
    }
  },
})
