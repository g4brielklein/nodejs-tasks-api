export const json = async (req, res) => {
  const buffers = []
    
  for await (let chunk of req) {
    buffers.push(chunk)
  }

  return buffers.length ? JSON.parse(Buffer.concat(buffers)) : {}
}
