import { describe, it, expect } from 'vitest';
import { authenticate } from '../../core/thunk/authenticate';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../../core/store/store';

const mock = new MockAdapter(axios);

describe('authenticate thunk', () => {
    it('should authenticate user successfully', async () => {
        const userData = { email: 'test@example.com', password: 'password123' };
        const response = {
            status: 'success',
            token: 'fakeToken',
        };

        mock.onPost('/api/v1/users/login').reply(200, response);

        const result = await store.dispatch(authenticate(userData));

        expect(result.type).toBe('auth/authenticate/fulfilled');
        expect(result.payload).toEqual(response);
    });

    it('should handle authentication failure', async () => {
        const userData = { email: 'test@example.com', password: 'wrongPassword' };
        const errorResponse = { message: 'Invalid email or password' };

        mock.onPost('/api/v1/users/login').reply(401, errorResponse);

        const result = await store.dispatch(authenticate(userData));

        expect(result.type).toBe('auth/authenticate/rejected');
        expect(result.payload).toEqual(errorResponse);
    });
});