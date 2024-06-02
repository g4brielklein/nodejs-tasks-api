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
  
  delete = (table, id) => {
    const index = this.#data[table].findIndex(item => item.id === id)

    if (index === -1) {
      return 
    }

    this.#data[table].splice(index, 1)
    this.#persist()
  }

  markTaskAsCompleted = (id, data) => {
    const index = this.#data['tasks'].findIndex(task => task.id === id)

    if (index === -1) {
      return
    }

    this.#data['tasks'][index].completed_at = data.completed_at

    this.#persist()
  }
}
