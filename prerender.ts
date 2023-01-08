import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p: string) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render }  = await import('./dist/server/entry-server.js')

const routesToPrerender = fs
    .readdirSync(toAbsolute('src/pages'))
    .map((file) => {
        const name = file.replace(/\.tsx$/, '').toLowerCase()
        return name === 'home' ? `/` : `/${name}`
    })

;(async () => {
    for (const url of routesToPrerender) {
        const {appHtml} = await render(url)

        const html = template.replace(`<!--content-->`, appHtml)

        const filePath = `dist/static${url === '/' ? '/index' : url}.html`
        fs.writeFileSync(toAbsolute(filePath), html)
        console.log('pre-rendered:', filePath)
    }
})()
