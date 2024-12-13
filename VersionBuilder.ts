import type { PluginOption } from "vite"
import path from 'path'
import fs from 'fs'

export function VersionBuilder(): PluginOption {
	let isSSR = false
	return {
		name: 'version-builder',
		config(config) {
			isSSR = !!config.server?.warmup?.ssrFiles
    },
		async buildStart () {
			if (isSSR) {
				return
			}
			const fileContent = {
				version: new Date().getTime(),
				time: new Date().toISOString()
			}
			console.log('%c版本信息', 'color: green;', fileContent)
			const outputPath = path.resolve(__dirname, 'public/cvs.json')
			const dir = path.dirname(outputPath)
			if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
			fs.writeFileSync(outputPath, JSON.stringify(fileContent))
		},
	}
}