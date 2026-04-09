# Feature Specification: Authentication and Role-Based Access Control (RBAC)

**Feature Branch**: `004-auth-rbac`  
**Created**: 2026-04-09  
**Status**: Draft  
**Input**: User description: "Implement authentication and role-based access control using static credentials and local storage (no backend APIs). Implement a login system using predefined static credentials and restrict route access based on user roles. Use proxy.ts to enforce authentication and authorization at the routing level. Login page with email/password, validate required fields and email format. Static credentials: admin@example.com/password (admin role) and manager@example.com/password (manager role). Protected routes: /dashboard, /employee, /department. If no auth-token cookie redirect to /login. If authenticated allow /dashboard and /employee, but /department only for admin role, otherwise redirect to /unauthorized."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - User Login (Priority: P1)

Users should be able to log in using static credentials on a login page, with form validation for email and password fields.

**Why this priority**: Authentication is foundational - users must be able to log in before accessing any protected routes. Without this, no other features can be tested or used.

**Independent Test**: Navigate to /login page, enter valid credentials (admin@example.com / password or manager@example.com / password), click login, verify redirect to dashboard and auth-token cookie is set.

**Acceptance Scenarios**:

1. **Given** user navigates to /login page, **When** the page loads, **Then** they see a login form with email input, password input, and login button
2. **Given** user enters admin@example.com and password, **When** they click login, **Then** they are redirected to /dashboard with auth-token cookie set
3. **Given** user enters manager@example.com and password, **When** they click login, **Then** they are redirected to /dashboard with auth-token cookie set
4. **Given** user enters invalid credentials, **When** they click login, **Then** they see an error message "Invalid email or password"
5. **Given** user leaves email field empty, **When** they click login, **Then** they see validation error "Email is required"
6. **Given** user leaves password field empty, **When** they click login, **Then** they see validation error "Password is required"
7. **Given** user enters invalid email format, **When** they blur the field, **Then** they see validation error "Invalid email format"

---

### User Story 2 - Route Protection (Priority: P1)

Unauthenticated users should be redirected to the login page when attempting to access protected routes, ensuring secure access to application features.

**Why this priority**: Route protection is critical security requirement - must be implemented immediately after login to prevent unauthorized access to protected pages.

**Independent Test**: Without logging in, attempt to navigate to /dashboard, /employees, or /departments, verify redirect to /login page with appropriate error message or notification.

**Acceptance Scenarios**:

1. **Given** user is not logged in, **When** they navigate to /dashboard, **Then** they are redirected to /login page
2. **Given** user is not logged in, **When** they navigate to /employees, **Then** they are redirected to /login page
3. **Given** user is not logged in, **When** they navigate to /departments, **Then** they are redirected to /login page
4. **Given** user is logged in, **When** they navigate to /dashboard, **Then** the dashboard page loads successfully
5. **Given** user is logged in, **When** they navigate to /employees, **Then** the employees page loads successfully
6. **Given** user clears cookies/logs out, **When** they try to navigate to protected routes, **Then** they are redirected to /login

---

### User Story 3 - Role-Based Authorization for Department Access (Priority: P2)

Only admin users should be able to access the /departments route, with manager users redirected to an unauthorized page.

**Why this priority**: Role-based access is important but depends on authentication being implemented first. This enforces business rules about who can manage departments.

**Independent Test**: Log in as manager@example.com, attempt to navigate to /departments, verify redirect to /unauthorized page. Log in as admin@example.com, verify /departments loads successfully.

**Acceptance Scenarios**:

1. **Given** user is logged in as admin, **When** they navigate to /departments, **Then** the departments page loads successfully
2. **Given** user is logged in as manager, **When** they navigate to /departments, **Then** they are redirected to /unauthorized page
3. **Given** user is on /unauthorized page, **When** they view the page, **Then** they see a message explaining they don't have permission
4. **Given** user is on /unauthorized page, **When** they view the page, **Then** they see a link/button to return to dashboard
5. **Given** admin user is on /departments, **When** page loads, **Then** they can perform all CRUD operations on departments

---

### User Story 4 - User Logout (Priority: P2)

Users should be able to log out, which clears their authentication state and redirects them to the login page.

**Why this priority**: Logout is important for security but less critical than login itself. Users need a way to end their session, especially on shared devices.

**Independent Test**: Log in as any user, click logout button in sidebar, verify redirect to /login and auth-token cookie is removed.

**Acceptance Scenarios**:

1. **Given** user is logged in, **When** they click the logout button, **Then** auth-token cookie is removed
2. **Given** user is logged in, **When** they click logout, **Then** they are redirected to /login page
3. **Given** user has logged out, **When** they try to access protected routes, **Then** they are redirected to /login
4. **Given** user is on login page after logout, **When** page loads, **Then** they see a message "You have been logged out successfully" (optional)
5. **Given** user logs out, **When** they click browser back button, **Then** they cannot access protected pages (must re-authenticate)

---

### User Story 5 - Persistent Authentication (Priority: P3)

Users should remain logged in across page refreshes and browser sessions (until they logout or token expires) using cookies.

**Why this priority**: User experience enhancement - prevents requiring re-login on every page refresh. Less critical than core authentication but important for usability.

**Independent Test**: Log in as any user, refresh the page, verify user remains logged in and can access protected routes without re-authenticating.

**Acceptance Scenarios**:

1. **Given** user is logged in, **When** they refresh the page, **Then** they remain logged in
2. **Given** user is logged in, **When** they navigate between protected routes, **Then** they don't need to re-authenticate
3. **Given** user closes browser and reopens, **When** they visit the site, **Then** they remain logged in (if cookie hasn't expired)
4. **Given** auth-token cookie is present, **When** user visits /login page, **Then** they are redirected to /dashboard
5. **Given** user is logged in, **When** cookie expires, **Then** they are redirected to /login on next route access

---

### User Story 6 - Visual Feedback for User Role (Priority: P3)

Users should see visual indicators of their current role (admin/manager) in the UI, helping them understand their access level.

**Why this priority**: Nice-to-have UX improvement - helps users understand their permissions but not critical for core functionality.

**Independent Test**: Log in as admin, verify UI shows "Admin" badge or indicator. Log in as manager, verify shows "Manager" indicator.

**Acceptance Scenarios**:

1. **Given** admin user is logged in, **When** they view the sidebar, **Then** they see "Admin" role indicator
2. **Given** manager user is logged in, **When** they view the sidebar, **Then** they see "Manager" role indicator
3. **Given** manager user is logged in, **When** they view the sidebar, **Then** Department link is hidden or disabled
4. **Given** admin user is logged in, **When** they view the sidebar, **Then** all navigation links are visible
5. **Given** user is logged in, **When** they view the sidebar, **Then** they see their email address displayed

---

### Edge Cases

- What happens when user enters admin@EXAMPLE.COM (uppercase)? → Email should be case-insensitive for authentication
- What happens when user manually types /departments URL as manager? → Should redirect to /unauthorized
- What happens when auth-token cookie is manually modified? → Should treat as invalid, redirect to /login
- What happens when user logs in, then auth-token expires while browsing? → Next route navigation should redirect to /login
- What happens when user is on /login and already logged in? → Should auto-redirect to /dashboard
- What happens when user tries to navigate to /login after logging in? → Should redirect to /dashboard (prevent redundant login)
- What happens when proxy.ts fails to parse cookie? → Should treat as not authenticated, redirect to /login
- What happens when user logs out and clicks back button? → Should not allow access to cached protected pages
- What happens when two users log in on same browser (different tabs)? → Last login should override previous auth-token
- What happens when user stays logged in for extended period? → Cookie expiration should be enforced (suggest 24 hours)

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST provide a /login route with a login form
- **FR-002**: Login form MUST include email input field with type="email"
- **FR-003**: Login form MUST include password input field with type="password"
- **FR-004**: Login form MUST include a submit/login button
- **FR-005**: Email field MUST validate for required (cannot be empty)
- **FR-006**: Email field MUST validate for proper email format (regex)
- **FR-007**: Password field MUST validate for required (cannot be empty)
- **FR-008**: System MUST support two static user credentials:
  - admin@example.com / password → role: "admin"
  - manager@example.com / password → role: "manager"
- **FR-009**: Email matching MUST be case-insensitive
- **FR-010**: System MUST display error message "Invalid email or password" for incorrect credentials
- **FR-011**: Successful login MUST create auth-token cookie with user data (email, role)
- **FR-012**: Successful login MUST redirect user to /dashboard
- **FR-013**: auth-token cookie MUST be HttpOnly=false (accessible to client JavaScript for Next.js routing)
- **FR-014**: auth-token cookie MUST have expiration time (recommend 24 hours)
- **FR-015**: System MUST create proxy.ts at project root for route interception
- **FR-016**: proxy.ts MUST intercept all route requests before page load
- **FR-017**: proxy.ts MUST check for auth-token cookie on protected routes
- **FR-018**: Protected routes MUST include: /dashboard, /employees, /departments
- **FR-019**: If auth-token cookie is missing on protected route, MUST redirect to /login
- **FR-020**: If authenticated user accesses /dashboard or /employees, MUST allow access
- **FR-021**: If authenticated user accesses /departments, MUST check role
- **FR-022**: If user role is "admin", MUST allow access to /departments
- **FR-023**: If user role is "manager", MUST redirect to /unauthorized when accessing /departments
- **FR-024**: System MUST provide /unauthorized route with appropriate error message
- **FR-025**: Unauthorized page MUST display message "You don't have permission to access this page"
- **FR-026**: Unauthorized page MUST include link/button to return to /dashboard
- **FR-027**: System MUST provide logout functionality available in sidebar
- **FR-028**: Logout MUST remove auth-token cookie
- **FR-029**: Logout MUST redirect user to /login page
- **FR-030**: If logged-in user navigates to /login, MUST redirect to /dashboard
- **FR-031**: Sidebar MUST display user's email address when logged in
- **FR-032**: Sidebar MUST display user's role (Admin/Manager) when logged in
- **FR-033**: Sidebar MUST hide/disable Department link for manager role users
- **FR-034**: System MUST validate auth-token cookie format and integrity
- **FR-035**: Invalid or expired auth-token MUST be treated as unauthenticated

### Key Entities

- **User Credentials** (static, hardcoded):
  - email (string): admin@example.com or manager@example.com
  - password (string): "password" for both users
  - role (string): "admin" or "manager"

- **Auth Token Cookie**:
  - name: "auth-token"
  - value: JSON string containing { email: string, role: string, timestamp: number }
  - httpOnly: false (accessible to client)
  - maxAge: 86400 (24 hours in seconds)
  - path: "/"

- **Login Form State**:
  - email (string)
  - password (string)
  - errors: { email: string, password: string, general: string }
  - isLoading (boolean)

- **Protected Routes**:
  - /dashboard (requires: authenticated)
  - /employees (requires: authenticated)
  - /departments (requires: authenticated + role === "admin")

- **Proxy Configuration**:
  - Route interception logic
  - Cookie parsing
  - Authentication check
  - Authorization check (role-based)
  - Redirect logic

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can log in with valid credentials and access protected routes 100% of the time
- **SC-002**: Invalid credentials show error message 100% of the time
- **SC-003**: Unauthenticated users are redirected to /login when accessing protected routes 100% of the time
- **SC-004**: Manager users cannot access /departments route (100% enforcement)
- **SC-005**: Admin users can access all routes including /departments 100% of the time
- **SC-006**: Users remain authenticated after page refresh 100% of the time (until logout or expiration)
- **SC-007**: Logout functionality removes auth-token and redirects to /login 100% of the time
- **SC-008**: Form validation prevents submission with empty or invalid fields 100% of the time
- **SC-009**: proxy.ts intercepts and protects routes with < 100ms overhead per request
- **SC-010**: Authentication state is consistent across all tabs in same browser
- **SC-011**: Cookie expiration is enforced within 1 minute of expiry time
- **SC-012**: Visual role indicators (Admin/Manager) display correctly based on user 100% of the time

## Assumptions

- No backend API - all authentication logic is client-side with static credentials
- proxy.ts is supported by Next.js 16 for route interception (need to verify Next.js 16 proxy support)
- If proxy.ts not available in Next.js 16, use middleware.ts as alternative
- Cookies are the preferred method for storing auth state (not localStorage for security reasons with Next.js routing)
- Password is not hashed since credentials are static and client-side only (no real security needed)
- Two roles are sufficient: "admin" (full access) and "manager" (limited access)
- Cookie expiration set to 24 hours is acceptable for this implementation
- Users on /login page will not see sidebar navigation
- Unauthorized page (/unauthorized) will show sidebar but with limited content
- Browser back button should not expose protected content after logout
- Email comparison is case-insensitive (admin@EXAMPLE.COM = admin@example.com)
- `/` root route redirects to /dashboard if authenticated, otherwise to /login
- No "Remember Me" functionality in v1 (all logins use 24-hour cookie)
- No password reset or forgot password functionality (static credentials)
- No user registration - only predefined two users
- No session timeout warning - silent redirect on expiration
- No multi-factor authentication in v1
- Sidebar logout button is always visible to authenticated users
- Login page has minimal styling consistent with app theme
- Form uses controlled components (React state)

## Technical Considerations

### Next.js 16 Routing & Middleware

Since Next.js 16 may not support `proxy.ts`, we'll use `middleware.ts` as the standard Next.js approach:

- **middleware.ts** at project root for route interception
- Runs on Edge Runtime (fast, lightweight)
- Can access and modify cookies
- Can redirect users based on authentication state
- Matcher configuration for protected routes

### Alternative: Client-Side Route Guards

If middleware has limitations, fallback to:

- Route guards in layout.tsx for protected routes
- useEffect hooks to check auth on mount
- Redirect using Next.js router
- Less secure but functional for client-side only auth

### Cookie vs localStorage

Chosen: **Cookies** (via middleware access)
- Works with middleware.ts
- HttpOnly can be false for client access
- Automatic expiration
- Sent with every request

Alternative: localStorage
- No automatic expiration
- Can't be accessed in middleware
- Requires client-side checks only

### Security Note

This is NOT production-ready authentication:
- Static credentials hardcoded in client code
- No encryption or hashing
- No CSRF protection  
- No rate limiting
- Suitable for learning/demo purposes only

## Dependencies

- Next.js 16 middleware.ts support ✅
- Cookie parsing library (built-in or simple implementation)
- React state management for login form
- Next.js routing and redirect capabilities ✅
- Tailwind CSS for styling ✅

## Out of Scope (v1)

- Backend API integration
- Real database for user credentials
- Password hashing/encryption
- User registration
- Password reset/forgot password
- Remember me functionality
- Session timeout warnings
- Multi-factor authentication
- OAuth/social login
- Email verification
- User profile management
- Audit logging of authentication events
- Rate limiting on login attempts
- CAPTCHA for bot protection
