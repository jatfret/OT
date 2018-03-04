const host = 'http://127.0.0.1'
const port = '3000'
const remotePath = {
  path: process.env.NODE_ENV === 'production' ? '' : `${host}:${port}`,
  socketHost: process.env.NODE_ENV === 'production' ? 'http://172.105.235.49:3000' : `${host}:${port}`
}

export { remotePath }
