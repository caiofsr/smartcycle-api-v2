import 'reflect-metadata'
import execa from 'execa'
import { join } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'

process.env.NODE_ENV = 'testing'
process.env.DATABASE_URL = 'postgres://docker:123456@192.168.99.100/smartcycle-test'
process.env.ADONIS_ACE_CWD = join(__dirname, '..')
sourceMapSupport.install({ handleUncaughtExceptions: false })

async function runMigrations () {
  await execa.node('ace', ['migration:run'], {
    stdio: 'inherit',
  })
} async function rollbackMigrations () {
  await execa.node('ace', ['migration:rollback'], {
    stdio: 'inherit',
  })
}
async function startHttpServer () {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

configure({
  files: [
    'build/test/**/*.spec.js',
  ],
  before: [
    runMigrations, startHttpServer,
  ],
  after: [ rollbackMigrations ]})
