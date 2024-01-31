// USE for values that might be added later.
// E.g: API_MANAGER_HOST: 'localhost',
// E.g: API_MANAGER_PORT: 8080,
const config = {}

if (!Window.config) {
  Window.config = {}
}

Window.config = Object.keys(config).reduce((out, next) => {
  if (!out.hasOwnProperty(next)) out[next] = config[next]
  return out
}, {})
