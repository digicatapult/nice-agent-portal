import dotenv from 'dotenv'

const envVarNameToCamelCase = (identifier: string) => {
  return identifier
    .toLowerCase()
    .replace(/_+([a-z0-9])/g, (_, firstChar) => firstChar.toUpperCase())
}

const config: { [key: string]: { [key: string]: string } } = {
  alice: {
    portalUrl: 'http://localhost:3000/api',
    veritableUrl: 'http://localhost:3010',
  },
  bob: {
    portalUrl: 'http://localhost:3001/api',
    veritableUrl: 'http://localhost:3011',
  },
  issuer: {
    portalUrl: 'http://localhost:3002/api',
    veritableUrl: 'http://localhost:3012',
  },
}

for (const role of ['alice', 'bob', 'issuer']) {
  const roleConfig: { [key: string]: string } = {}
  dotenv.config({
    processEnv: roleConfig,
    path: `.env.nice-agent-${role}.local`,
  })
  for (const key in roleConfig) {
    config[role][envVarNameToCamelCase(key)] = roleConfig[key]
  }
}

export const getConfig = () => {
  return config
}
