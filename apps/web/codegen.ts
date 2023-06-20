import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  generates: {
    'src/app/graphql/schema/generated.d.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
}
export default config
