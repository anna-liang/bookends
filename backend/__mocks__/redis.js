const mockRedisClient = {
    connect: jest.fn().mockResolvedValue(),
    on: jest.fn(),
};

const createClient = jest.fn(() => mockRedisClient);

const redisMock = {
    createClient,
};

export default redisMock;