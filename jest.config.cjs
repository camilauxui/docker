// jest.config.cjs  
module.exports = {  
    preset: 'ts-jest',  
    testEnvironment: 'jsdom',  
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Ajusta la ruta según donde guardaste el archivo  
    moduleNameMapper: {  
        '\\.(css|less|scss)$': 'identity-obj-proxy',  
    },  
    transform: {  
        '^.+\\.(ts|tsx)$': 'ts-jest',  
    },  
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],  
};