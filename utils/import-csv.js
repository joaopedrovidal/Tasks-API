import fs from 'node:fs'
import { parse } from 'csv-parse'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const processFile = async () => {
    const parser = fs
        .createReadStream(`${__dirname}/tasks.csv`)
        .pipe(
            parse({
                delimiter: ",",
                skip_empty_lines: true,
            })
        )

    let isFirstLine = true

    for await (const record of parser) {
        if (isFirstLine) {
            isFirstLine = false
            continue
        }

        const [title, description] = record

        await fetch("http://localhost:3333/tasks", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description })
        })

        console.log(`Tasks importadas ${title}`)
    }
}

processFile().catch((err) => console.error(err))