"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server"); // Adjust the path as needed
const supertest_1 = __importDefault(require("supertest"));
let server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Start the server explicitly before tests
    server = server_1.app.listen(5000);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the server is closed after tests
    yield new Promise((resolve) => server.close(() => resolve()));
}));
describe('Notes API', () => {
    it('should return an empty array on GET /notes', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).get('/notes');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    }));
    it('should create a new note on POST /notes', () => __awaiter(void 0, void 0, void 0, function* () {
        const newNote = {
            title: 'Test Note',
            description: 'This is a test note',
        };
        const response = yield (0, supertest_1.default)(server_1.app)
            .post('/notes')
            .send(newNote)
            .expect(201);
        expect(response.body.title).toBe(newNote.title);
        expect(response.body.description).toBe(newNote.description);
    }));
});
