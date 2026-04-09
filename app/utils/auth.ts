/**
 * Authentication utilities for static credential validation and token management.
 * 
 * WARNING: This is NOT production-ready authentication.
 * - Static credentials are visible in client code
 * - No password hashing or encryption
 * - Client-side only validation
 * - Suitable for learning/demo purposes only
 */

// TypeScript Interfaces

export interface User {
  email: string;
  password: string;
  role: 'admin' | 'manager';
}

export interface AuthToken {
  email: string;
  role: 'admin' | 'manager';
  timestamp: number;
}

// Static Credentials (hardcoded - NOT production-ready)

const USERS: User[] = [
  {
    email: 'admin@example.com',
    password: 'password',
    role: 'admin'
  },
  {
    email: 'manager@example.com',
    password: 'password',
    role: 'manager'
  }
];

/**
 * Validates user credentials against static user list.
 * Email matching is case-insensitive.
 * 
 * @param email - User email address
 * @param password - User password
 * @returns User object if credentials are valid, null otherwise
 */
export function validateCredentials(email: string, password: string): User | null {
  // Normalize email to lowercase for case-insensitive comparison
  const normalizedEmail = email.toLowerCase().trim();
  
  // Find user with matching email
  const user = USERS.find(u => u.email.toLowerCase() === normalizedEmail);
  
  // Check if user exists and password matches
  if (user && user.password === password) {
    return user;
  }
  
  return null;
}

/**
 * Creates an authentication token for a logged-in user.
 * Token includes user email, role, and timestamp for expiration checking.
 * 
 * @param email - User email address
 * @param role - User role ('admin' or 'manager')
 * @returns JSON string representation of auth token
 */
export function createAuthToken(email: string, role: 'admin' | 'manager'): string {
  const token: AuthToken = {
    email,
    role,
    timestamp: Date.now()
  };
  
  return JSON.stringify(token);
}

/**
 * Parses and validates an authentication token string.
 * Checks token structure and expiration (24 hours).
 * 
 * @param token - JSON string representation of auth token
 * @returns Parsed AuthToken if valid and not expired, null otherwise
 */
export function parseAuthToken(token: string): AuthToken | null {
  try {
    const parsed = JSON.parse(token) as AuthToken;
    
    // Validate token structure
    if (!parsed.email || !parsed.role || !parsed.timestamp) {
      return null;
    }
    
    // Check if token is expired
    if (isTokenExpired(parsed.timestamp)) {
      return null;
    }
    
    // Validate role is one of the allowed values
    if (parsed.role !== 'admin' && parsed.role !== 'manager') {
      return null;
    }
    
    return parsed;
  } catch {
    // JSON parse error or invalid format
    return null;
  }
}

/**
 * Checks if a token timestamp is expired (older than 24 hours).
 * 
 * @param timestamp - Token creation timestamp (from Date.now())
 * @returns true if token is expired, false otherwise
 */
export function isTokenExpired(timestamp: number): boolean {
  const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000; // 86400000 milliseconds
  const age = Date.now() - timestamp;
  
  return age > TWENTY_FOUR_HOURS_MS;
}
