import { ApolloServer } from 'apollo-server'
import { connect as mongoConnect } from 'mongoose'
import { config as dotEnvConfig } from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'

import { resolvers } from './resolvers'
import { contextResolver as context } from './context-resolver'
import { initFirebase } from './firebase'

const typeDefsPath = join(__dirname, '../src', 'type-defs.gql')
const typeDefs = readFileSync(typeDefsPath, 'utf-8')

dotEnvConfig({ path: 'variables.env' })

initFirebase()

mongoConnect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log(`DB Connected`))
  .catch(err => console.error(err))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})

const port = process.env.PORT || 4000
server
  .listen({ port })
  .then(({ url }) => console.log(`Listening on ${url}`))
  .catch(console.log.bind(console))
