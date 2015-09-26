import fs from 'fs'

class DB {
  getData(type) {
    let content = fs.readFileSync(`${__dirname}/data/${type}.json`, 'utf8')
    return JSON.parse(content)
  }
}

export default new DB()