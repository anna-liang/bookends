export default {
    transformIgnorePatterns: [
        'node_modules/(?!(uuid)/)', // Force Jest to transform the uuid package
    ],
    setupFiles: ["<rootDir>/jest.setup.js"],
    automock: false,
};