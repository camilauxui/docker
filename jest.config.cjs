// jest.config.cjs  
module.exports = {  
    preset: 'ts-jest',  
    testEnvironment: 'jsdom',  
    moduleNameMapper: {  
        '\\.(css|less|scss)$': 'identity-obj-proxy', // Para manejar archivos de estilo  
    },  
    transform: {  
        '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma archivos TypeScript  
    },  
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignora estas carpetas  
};