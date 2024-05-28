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

  create = (table, data) => {
    if (Array.isArray(this.#data[table])) {
      this.#data[table].push(data)
    } else {
      this.#data[table] = [data]
    }

    this.#persist()
  }
}
