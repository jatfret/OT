// const host = 'http://120.77.36.131'
const host = 'http://127.0.0.1'
const port = '3000'
const remotePath = {
  path: process.env.NODE_ENV === 'production' ? '' : `${host}:${port}`,
  socketHost: process.env.NODE_ENV === 'production' ? 'http://120.77.36.131:3000' : `${host}:${port}`
}

export { remotePath }
