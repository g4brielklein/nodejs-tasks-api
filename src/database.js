export class database {
  #data = {}

  select = (table) => {
    return this.#data[table]
  }

  create = (table, data) => {
    const { id, title, description } = data
    const created_at = new Date()

    const task = {
      id,
      title,
      description,
      completed_at: null,
      created_at,
      updated_at: created_at,
    }

    this.#data[table].push(task)
  }
}
