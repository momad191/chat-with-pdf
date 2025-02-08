export const LOGIN = '/login';
export const ROOT = '/';

export const PUBLIC_ROUTES = [
    '/login',
    '/register',
    
    '/api/auth/callback/google',
    '/api/auth/callback/github',
    '/api/register'
]

export const PROTECTED_SUB_ROUTES = [
    '/dashboard','/pricing',
]