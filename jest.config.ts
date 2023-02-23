/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  // Chemin d'accès aux fichiers de test
  testPathIgnorePatterns: ['/node_modules/', '/build/'],

  // Les fichiers qui nécessitent un traitement particulier
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  // Les fichiers qui sont acceptés pour les tests
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // Les fichiers ignorés
  modulePathIgnorePatterns: ['/build/'],

  // Les reporters qui vont afficher les résultats des tests
  reporters: ['default', 'jest-junit'],

  // La configuration de la couverture de code
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  extra: {
    ssl: process.env.NODE_ENV === 'production',
  },
  ...(process.env.NODE_ENV === 'test' && {
    name: 'default',
    url: process.env.DATABASE_URL_TEST,
  }),
};
