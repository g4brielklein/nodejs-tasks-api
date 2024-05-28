import fs from 'node:fs/promises'

const dataFilePath = new URL('data.json', import.meta.url)

export class database {
  #data = {}

  constructor() {
    fs.readFile(dataFilePath)
      .then(data => {
        this.#data = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist = () => {
    fs.writeFile(dataFilePath, JSON.stringify(this.#data, null, 2))
  }

  select = (table) => {
    return this.#data[table]
  }

  selectById = (table, id) => {
    const index = this.#data[table].findIndex(row => row.id === String(id))
    if (index === -1) return null

    return this.#data[table][index]
  }

  create = (table, data) => {
    if (Array.isArray(this.#data[table])) {
      this.#data[table].push(data)
    } else {
      this.#data[table] = [data]
    }

    this.#persist()
  }

  put = (table, id, data) => {
    const index = this.#data[table].findIndex(row => row.id === String(id))
    if (index === -1) return null

    this.#data[table][index] = data

    this.#persist()
  }
}
