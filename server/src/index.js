import { ApolloServer } from 'apollo-server'
import { connect as mongoConnect } from 'mongoose'
import { config as dotEnvConfig } from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'

import { Post, User } from './models'
import { resolvers } from './resolvers'

const typeDefsPath = join(__dirname, '../src', 'typeDefs.gql')
const typeDefs = readFileSync(typeDefsPath, 'utf-8')

dotEnvConfig({ path: 'variables.env' })

mongoConnect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log(`DB Connected`))
  .catch(err => console.error(err))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
})

server
  .listen()
  .then(({ url }) => console.log(`Listening on ${url}`))
  .catch(console.log.bind(console))
