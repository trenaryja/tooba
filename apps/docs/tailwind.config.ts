import sharedConfig from 'tailwind-config/tailwind.config'
import { Config } from 'tailwindcss'

export default {
  content: sharedConfig.content,
  presets: [sharedConfig],
} satisfies Config
