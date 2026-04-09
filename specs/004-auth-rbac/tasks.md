---
description: "Task list for Authentication and Role-Based Access Control (RBAC) feature"
---

# Tasks: Authentication and Role-Based Access Control (RBAC)

**Input**: Design documents from `/specs/004-auth-rbac/`
**Prerequisites**: plan.md ✅, spec.md ✅, 001-initial-layout (complete) ✅, 002-employee-crud (complete) ✅, 003-department-crud (complete) ✅

**Tests**: No testing required per project constitution

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5, US6, Foundation)
- Include exact file paths in descriptions

## Path Conventions

Using Next.js 16 App Router structure:

- `app/` directory contains all routes and components
- `app/login/` for login page route
- `app/unauthorized/` for unauthorized page route
- `app/components/` for shared components (updating Sidebar)
- `app/utils/` for utility functions (new auth.ts)
- `middleware.ts` at repository root for route protection

---

## Phase 1: Setup (Verify Infrastructure)

**Purpose**: Verify existing infrastructure and Next.js 16 middleware.ts support

- [ ] T001 Verify Next.js version is 16.x in package.json
- [ ] T002 Verify app/components/Sidebar.tsx exists and is functional
- [ ] T003 Verify app/layout.tsx exists for potential auth context
- [ ] T004 Verify Tailwind CSS is configured and working
- [ ] T005 Research Next.js 16 middleware.ts documentation for route protection patterns
- [ ] T006 Confirm middleware.ts is supported in Next.js 16 (NOT proxy.ts as mentioned in spec)
- [ ] T007 Verify cookie handling capabilities in Next.js 16 middleware

**Checkpoint**: Infrastructure verified and Next.js 16 middleware approach confirmed

---

## Phase 2: Foundational (Auth Utilities) - Blocking Prerequisites

**Purpose**: Create authentication utilities with static credentials, token management, and validation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Auth Utilities Foundation

- [ ] T008 [P] [Foundation] Create app/utils/auth.ts file
- [ ] T009 [Foundation] Define TypeScript interface User: { email: string, password: string, role: 'admin' | 'manager' }
- [ ] T010 [Foundation] Define TypeScript interface AuthToken: { email: string, role: 'admin' | 'manager', timestamp: number }
- [ ] T011 [Foundation] Create USERS constant array with two static users:
  ```typescript
  const USERS = [
    { email: "admin@example.com", password: "password", role: "admin" },
    { email: "manager@example.com", password: "password", role: "manager" },
  ];
  ```
- [ ] T012 [Foundation] Export validateCredentials(email: string, password: string): User | null function
- [ ] T013 [Foundation] In validateCredentials, normalize email to lowercase for case-insensitive matching
- [ ] T014 [Foundation] In validateCredentials, find user matching email (case-insensitive)
- [ ] T015 [Foundation] In validateCredentials, check if password matches exactly
- [ ] T016 [Foundation] In validateCredentials, return full User object if valid, null if invalid
- [ ] T017 [Foundation] Export createAuthToken(email: string, role: string): string function
- [ ] T018 [Foundation] In createAuthToken, create AuthToken object with email, role, and Date.now() timestamp
- [ ] T019 [Foundation] In createAuthToken, serialize token to JSON string and return
- [ ] T020 [Foundation] Export parseAuthToken(token: string): AuthToken | null function
- [ ] T021 [Foundation] In parseAuthToken, wrap in try-catch for JSON parse errors
- [ ] T022 [Foundation] In parseAuthToken, parse JSON string to AuthToken object
- [ ] T023 [Foundation] In parseAuthToken, validate token structure (has email, role, timestamp)
- [ ] T024 [Foundation] In parseAuthToken, check if token is expired using isTokenExpired helper
- [ ] T025 [Foundation] In parseAuthToken, return AuthToken if valid and not expired, null otherwise
- [ ] T026 [Foundation] Export isTokenExpired(timestamp: number): boolean function
- [ ] T027 [Foundation] In isTokenExpired, calculate age: Date.now() - timestamp
- [ ] T028 [Foundation] In isTokenExpired, return true if age > 24 hours (86400000 ms), false otherwise
- [ ] T029 [Foundation] Add proper TypeScript type exports for User and AuthToken interfaces
- [ ] T030 [Foundation] Add JSDoc comments for all exported functions

**Checkpoint**: Auth utilities complete with static credential validation and token management

---

## Phase 3: User Story 1 - User Login (Priority: P1) 🎯 MVP

**Goal**: Create login page with email/password form, validation, and authentication

**Independent Test**: Navigate to /login, enter admin@example.com/password, submit form, verify redirect to /dashboard and auth-token cookie is set

### Login Page Structure

- [ ] T031 [P] [US1] Create app/login directory
- [ ] T032 [US1] Create app/login/page.tsx as client component ('use client')
- [ ] T033 [US1] Import useRouter from next/navigation in login page
- [ ] T034 [US1] Import validateCredentials and createAuthToken from app/utils/auth.ts

### Login Form State Management

- [ ] T035 [P] [US1] Add email state (string) initialized to empty string
- [ ] T036 [P] [US1] Add password state (string) initialized to empty string
- [ ] T037 [P] [US1] Add emailError state (string) initialized to empty string
- [ ] T038 [P] [US1] Add passwordError state (string) initialized to empty string
- [ ] T039 [P] [US1] Add generalError state (string) initialized to empty string for invalid credentials
- [ ] T040 [P] [US1] Add isLoading state (boolean) initialized to false

### Email Input Implementation

- [ ] T041 [P] [US1] Create email input field with type="email", id="email", name="email"
- [ ] T042 [US1] Add label for email input: "Email Address"
- [ ] T043 [US1] Bind email input value to email state
- [ ] T044 [US1] Add onChange handler to update email state and clear emailError
- [ ] T045 [US1] Add onBlur handler to validate email format on blur
- [ ] T046 [US1] Create validateEmail function using regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- [ ] T047 [US1] Display emailError below email input if emailError is not empty
- [ ] T048 [US1] Add required attribute to email input
- [ ] T049 [US1] Add autocomplete="email" to email input

### Password Input Implementation

- [ ] T050 [P] [US1] Create password input field with type="password", id="password", name="password"
- [ ] T051 [US1] Add label for password input: "Password"
- [ ] T052 [US1] Bind password input value to password state
- [ ] T053 [US1] Add onChange handler to update password state and clear passwordError
- [ ] T054 [US1] Display passwordError below password input if passwordError is not empty
- [ ] T055 [US1] Add required attribute to password input
- [ ] T056 [US1] Add autocomplete="current-password" to password input

### Form Validation Logic

- [ ] T057 [P] [US1] Create validateForm function that checks all fields
- [ ] T058 [US1] In validateForm, check if email is empty, set emailError: "Email is required"
- [ ] T059 [US1] In validateForm, check email format with validateEmail, set emailError: "Invalid email format"
- [ ] T060 [US1] In validateForm, check if password is empty, set passwordError: "Password is required"
- [ ] T061 [US1] In validateForm, return true if no errors, false otherwise

### Form Submission Handler

- [ ] T062 [P] [US1] Create handleSubmit async function
- [ ] T063 [US1] In handleSubmit, prevent default form submission
- [ ] T064 [US1] In handleSubmit, clear all error states first
- [ ] T065 [US1] In handleSubmit, call validateForm and return early if validation fails
- [ ] T066 [US1] In handleSubmit, set isLoading to true before authentication
- [ ] T067 [US1] In handleSubmit, call validateCredentials with email and password
- [ ] T068 [US1] If validateCredentials returns null, set generalError: "Invalid email or password"
- [ ] T069 [US1] If validateCredentials returns null, set isLoading to false and return
- [ ] T070 [US1] If credentials valid, call createAuthToken with user email and role
- [ ] T071 [US1] Create auth-token cookie: document.cookie = `auth-token=${token}; path=/; max-age=86400`
- [ ] T072 [US1] After cookie set, use router.push('/dashboard') to redirect
- [ ] T073 [US1] Wrap cookie and redirect in try-catch, set generalError on failure
- [ ] T074 [US1] Set isLoading to false in finally block

### Form UI Structure

- [ ] T075 [P] [US1] Create form element with onSubmit={handleSubmit}
- [ ] T076 [US1] Add h1 page title: "Login" at top of page
- [ ] T077 [US1] Display generalError above form if generalError is not empty
- [ ] T078 [US1] Create submit button with text "Log In"
- [ ] T079 [US1] Disable submit button when isLoading is true
- [ ] T080 [US1] Show loading text "Logging in..." on button when isLoading is true
- [ ] T081 [US1] Add Enter key support (form default behavior handles this)

### Styling and Layout

- [ ] T082 [P] [US1] Center login form on page using Tailwind flexbox
- [ ] T083 [US1] Create login card container with max-width, padding, and shadow
- [ ] T084 [US1] Style form inputs with Tailwind: border, padding, rounded corners
- [ ] T085 [US1] Style labels with Tailwind: font-medium, margin-bottom
- [ ] T086 [US1] Style error messages with red text color
- [ ] T087 [US1] Style submit button: blue background, white text, hover effects, disabled state
- [ ] T088 [US1] Add focus states to inputs with Tailwind ring utilities
- [ ] T089 [US1] Ensure responsive design for mobile screens
- [ ] T090 [US1] Match styling theme with rest of application (consistent with employees/departments)

**Checkpoint**: User Story 1 complete - Login page functional with validation and authentication

---

## Phase 4: User Story 2 - Route Protection (Priority: P1)

**Goal**: Implement middleware.ts for authentication checks and redirect unauthenticated users

**Independent Test**: Without logging in, navigate to /dashboard, /employees, or /departments, verify redirect to /login

### Middleware Setup

- [ ] T091 [P] [US2] Create middleware.ts file at repository root (same level as app/)
- [ ] T092 [US2] Import NextResponse and NextRequest from next/server
- [ ] T093 [US2] Import parseAuthToken from app/utils/auth.ts (note: may need path adjustment for Edge Runtime)

### Middleware Configuration

- [ ] T094 [P] [US2] Export config object with matcher array for performance
- [ ] T095 [US2] Add matcher patterns: ['/dashboard', '/employees', '/departments', '/login']
- [ ] T096 [US2] Add comment explaining matcher optimizes middleware execution

### Protected Routes Definition

- [ ] T097 [P] [US2] Define protectedRoutes array: ['/dashboard', '/employees', '/departments']
- [ ] T098 [US2] Create helper function isProtectedRoute(pathname: string): boolean

### Middleware Main Function

- [ ] T099 [P] [US2] Export default async middleware function with NextRequest parameter
- [ ] T100 [US2] Extract pathname from request.nextUrl.pathname
- [ ] T101 [US2] Get auth-token cookie using request.cookies.get('auth-token')?.value
- [ ] T102 [US2] Parse auth token using parseAuthToken (handle null case)

### Authentication Logic

- [ ] T103 [P] [US2] Check if pathname is protected route using isProtectedRoute
- [ ] T104 [US2] If protected route AND no valid token, redirect to /login
- [ ] T105 [US2] Create redirect URL: new URL('/login', request.url)
- [ ] T106 [US2] Return NextResponse.redirect for unauthenticated access
- [ ] T107 [US2] If authenticated on protected route, allow request to proceed with NextResponse.next()

### Login Page Redirect Logic

- [ ] T108 [P] [US2] Check if pathname is /login AND user is authenticated
- [ ] T109 [US2] If on /login with valid token, redirect to /dashboard
- [ ] T110 [US2] Create redirect URL: new URL('/dashboard', request.url)
- [ ] T111 [US2] Return NextResponse.redirect to prevent redundant login

### Edge Runtime Compatibility

- [ ] T112 [P] [US2] Ensure all code is Edge Runtime compatible (no Node.js-only APIs)
- [ ] T113 [US2] Test parseAuthToken works in Edge Runtime (JSON.parse is supported)
- [ ] T114 [US2] Add error handling for cookie parsing failures
- [ ] T115 [US2] Add fallback for invalid token format (treat as unauthenticated)

**Checkpoint**: User Story 2 complete - Route protection enforced via middleware for all protected routes

---

## Phase 5: User Story 3 - Role-Based Authorization (Priority: P2)

**Goal**: Restrict /departments access to admin only, redirect managers to /unauthorized page

**Independent Test**: Log in as manager@example.com, navigate to /departments, verify redirect to /unauthorized

### Middleware Role Authorization

- [ ] T116 [P] [US3] Define adminOnlyRoutes array in middleware.ts: ['/departments']
- [ ] T117 [US3] Create helper function isAdminOnlyRoute(pathname: string): boolean
- [ ] T118 [US3] In middleware, after authentication check, add authorization check
- [ ] T119 [US3] Check if pathname is admin-only route using isAdminOnlyRoute
- [ ] T120 [US3] Check if user role from parsed token is NOT 'admin'
- [ ] T121 [US3] If manager trying to access admin route, redirect to /unauthorized
- [ ] T122 [US3] Create redirect URL: new URL('/unauthorized', request.url)
- [ ] T123 [US3] Return NextResponse.redirect for unauthorized access
- [ ] T124 [US3] If admin accessing admin route, allow with NextResponse.next()

### Unauthorized Page Structure

- [ ] T125 [P] [US3] Create app/unauthorized directory
- [ ] T126 [US3] Create app/unauthorized/page.tsx as client component ('use client')
- [ ] T127 [US3] Import Link from next/link for navigation

### Unauthorized Page Content

- [ ] T128 [P] [US3] Add h1 title: "Access Denied" or "Unauthorized"
- [ ] T129 [US3] Add main message: "You don't have permission to access this page"
- [ ] T130 [US3] Add explanation: "This page requires admin privileges"
- [ ] T131 [US3] Add lock icon or warning icon using SVG or emoji (🔒)
- [ ] T132 [US3] Create Link component to /dashboard with text "Return to Dashboard"

### Unauthorized Page Styling

- [ ] T133 [P] [US3] Center content vertically and horizontally with Tailwind
- [ ] T134 [US3] Style container with max-width and padding
- [ ] T135 [US3] Use warning/error color scheme (amber or red theme)
- [ ] T136 [US3] Style h1 with large font size and semibold weight
- [ ] T137 [US3] Style messages with appropriate spacing
- [ ] T138 [US3] Style link/button with blue color and hover effects
- [ ] T139 [US3] Ensure page is responsive for mobile devices
- [ ] T140 [US3] Maintain consistency with app theme and layout

**Checkpoint**: User Story 3 complete - Role-based authorization working, manager blocked from /departments

---

## Phase 6: User Story 4 - User Logout (Priority: P2)

**Goal**: Add logout button to sidebar that removes auth-token cookie and redirects to login

**Independent Test**: Log in, click logout button, verify redirect to /login and cookie removed

### Sidebar Client Component Setup

- [ ] T141 [P] [US4] Open app/components/Sidebar.tsx
- [ ] T142 [US4] Add 'use client' directive if not already present
- [ ] T143 [US4] Import useRouter from next/navigation
- [ ] T144 [US4] Import parseAuthToken from app/utils/auth.ts

### Sidebar Auth State

- [ ] T145 [P] [US4] Add userEmail state (string | null) initialized to null
- [ ] T146 [P] [US4] Add userRole state ('admin' | 'manager' | null) initialized to null
- [ ] T147 [US4] Add useEffect to read auth-token cookie on component mount
- [ ] T148 [US4] In useEffect, get cookie using document.cookie and parse for auth-token
- [ ] T149 [US4] Create helper function getCookie(name: string): string | null to parse cookies
- [ ] T150 [US4] In useEffect, call parseAuthToken with cookie value
- [ ] T151 [US4] If token valid, set userEmail and userRole from parsed token
- [ ] T152 [US4] If token invalid or missing, keep states as null

### Logout Handler Implementation

- [ ] T153 [P] [US4] Create handleLogout function in Sidebar component
- [ ] T154 [US4] In handleLogout, remove auth-token cookie by setting max-age=0
- [ ] T155 [US4] Cookie removal: document.cookie = 'auth-token=; path=/; max-age=0'
- [ ] T156 [US4] After cookie removal, use router.push('/login') to redirect
- [ ] T157 [US4] Optional: call router.refresh() before redirect to ensure clean state

### Logout Button UI

- [ ] T158 [P] [US4] Add logout button at bottom of sidebar navigation
- [ ] T159 [US4] Button text: "Log Out" or "Logout"
- [ ] T160 [US4] Bind onClick handler to handleLogout function
- [ ] T161 [US4] Conditionally render logout button only when userEmail is not null
- [ ] T162 [US4] Style button with red/danger color scheme
- [ ] T163 [US4] Add hover effect to logout button
- [ ] T164 [US4] Add icon to logout button (logout SVG or exit icon)
- [ ] T165 [US4] Ensure button is full-width within sidebar
- [ ] T166 [US4] Add proper spacing below other navigation links

**Checkpoint**: User Story 4 complete - Logout functionality working with cookie removal and redirect

---

## Phase 7: User Story 5 - Persistent Authentication (Priority: P3)

**Goal**: Verify authentication persists across page refreshes via middleware cookie checks

**Independent Test**: Log in, refresh page multiple times, verify still logged in and can access protected routes

### Middleware Persistence Verification

- [ ] T167 [P] [US5] Verify middleware checks auth-token cookie on every request (already implemented in Phase 4)
- [ ] T168 [US5] Verify cookie has 24-hour expiration (max-age=86400 in login page)
- [ ] T169 [US5] Test: Log in, refresh /dashboard page, verify no redirect to /login
- [ ] T170 [US5] Test: Log in, navigate to /employees, refresh, verify no redirect
- [ ] T171 [US5] Test: Log in, navigate to /departments (as admin), refresh, verify no redirect

### Cookie Expiration Handling

- [ ] T172 [P] [US5] Verify isTokenExpired function checks 24-hour window correctly
- [ ] T173 [US5] Verify parseAuthToken returns null for expired tokens
- [ ] T174 [US5] Test: Manually modify cookie timestamp to expired value, verify redirect to /login
- [ ] T175 [US5] Ensure middleware treats expired token as unauthenticated

### Browser Session Persistence

- [ ] T176 [P] [US5] Test: Log in, close browser, reopen within 24 hours, verify still logged in
- [ ] T177 [US5] Verify cookie persists across browser close (no session-only cookie)
- [ ] T178 [US5] Test navigation between routes without re-authentication

### Login Redirect for Authenticated Users

- [ ] T179 [P] [US5] Verify middleware redirects authenticated users from /login to /dashboard
- [ ] T180 [US5] Test: While logged in, navigate to /login, verify auto-redirect to /dashboard
- [ ] T181 [US5] Ensure no infinite redirect loops between /login and /dashboard

**Checkpoint**: User Story 5 complete - Persistent authentication verified across refreshes and navigation

---

## Phase 8: User Story 6 - Visual Feedback for User Role (Priority: P3)

**Goal**: Display user email and role badge in sidebar, hide Department link for managers

**Independent Test**: Log in as admin, verify sidebar shows "Admin" badge. Log in as manager, verify "Manager" badge and no Department link

### User Info Display in Sidebar

- [ ] T182 [P] [US6] Create user info section in Sidebar above or below navigation links
- [ ] T183 [US6] Display userEmail in user info section when userEmail is not null
- [ ] T184 [US6] Truncate long emails with ellipsis if needed (max width consideration)
- [ ] T185 [US6] Add user icon or avatar placeholder next to email

### Role Badge Implementation

- [ ] T186 [P] [US6] Create role badge component or div in Sidebar
- [ ] T187 [US6] Display "Admin" badge when userRole === 'admin'
- [ ] T188 [US6] Display "Manager" badge when userRole === 'manager'
- [ ] T189 [US6] Conditionally render role badge only when userRole is not null
- [ ] T190 [US6] Style Admin badge with blue background and white text
- [ ] T191 [US6] Style Manager badge with green background and white text
- [ ] T192 [US6] Add padding, rounded corners, and small text size to badges
- [ ] T193 [US6] Position badge next to or below user email

### Conditional Navigation Links

- [ ] T194 [P] [US6] Locate Department link in Sidebar navigation
- [ ] T195 [US6] Conditionally render Department link only when userRole === 'admin'
- [ ] T196 [US6] Ensure Department link is completely hidden (not just disabled) for managers
- [ ] T197 [US6] Verify Employees link is visible for both admin and manager
- [ ] T198 [US6] Verify Dashboard link is visible for both admin and manager

### User Info Styling

- [ ] T199 [P] [US6] Create user info container with border or background color
- [ ] T200 [US6] Add padding to user info section
- [ ] T201 [US6] Position user info section (top or bottom of sidebar - recommend top)
- [ ] T202 [US6] Ensure text is readable with good contrast
- [ ] T203 [US6] Add responsive behavior for smaller screens
- [ ] T204 [US6] Maintain consistent spacing with other sidebar elements

**Checkpoint**: User Story 6 complete - Visual role indicators displaying, conditional navigation working

---

## Phase 9: Polish & Edge Cases

**Goal**: Handle edge cases, validation improvements, and user experience polish

### Edge Case Handling

- [ ] T205 [P] [Polish] Handle uppercase email on login: verify case-insensitive matching works
- [ ] T206 [Polish] Test with ADMIN@EXAMPLE.COM - should log in successfully
- [ ] T207 [P] [Polish] Handle manually modified auth-token cookie in browser devtools
- [ ] T208 [Polish] If cookie modified and invalid JSON, middleware should treat as unauthenticated
- [ ] T209 [P] [Polish] Handle auth-token cookie without required fields (email, role, timestamp)
- [ ] T210 [Polish] parseAuthToken should validate all required fields exist

### Browser Back Button Behavior

- [ ] T211 [P] [Polish] Test: Log out, click browser back button, verify redirect to /login
- [ ] T212 [Polish] Ensure middleware re-checks auth on back button navigation
- [ ] T213 [Polish] Add cache headers to prevent protected pages from being cached
- [ ] T214 [Polish] Consider adding no-cache headers in middleware for protected routes

### Form UX Improvements

- [ ] T215 [P] [Polish] Add autofocus to email input on login page load
- [ ] T216 [Polish] Clear password field if login fails (security best practice)
- [ ] T217 [P] [Polish] Optional: Add show/hide password toggle button
- [ ] T218 [Polish] Ensure Enter key submits form (default behavior should work)
- [ ] T219 [P] [Polish] Prevent form submission while isLoading is true (button disabled)
- [ ] T220 [Polish] Add smooth transitions for error messages (Tailwind transitions)

### Cookie Security Improvements

- [ ] T221 [P] [Polish] Consider adding SameSite=Lax attribute to auth-token cookie
- [ ] T222 [Polish] Document why httpOnly=false is necessary (middleware + client access)
- [ ] T223 [Polish] Add comment explaining this is NOT production-ready auth
- [ ] T224 [Polish] Consider adding Secure flag for HTTPS environments (check if in production)

### Loading States and Feedback

- [ ] T225 [P] [Polish] Add loading spinner icon to login button during submission
- [ ] T226 [Polish] Optional: Add logout success message on /login page after redirect
- [ ] T227 [Polish] Add smooth page transitions using Tailwind animations
- [ ] T228 [Polish] Ensure all state changes have visual feedback

### Error Handling

- [ ] T229 [P] [Polish] Wrap middleware logic in try-catch for unexpected errors
- [ ] T230 [Polish] Log errors to console in development mode
- [ ] T231 [Polish] Return NextResponse.next() or redirect to /login on middleware errors
- [ ] T232 [Polish] Add error boundaries if needed (optional for this feature)

### Multi-Tab Consistency

- [ ] T233 [P] [Polish] Test: Log in on tab 1, open tab 2, verify both tabs are authenticated
- [ ] T234 [Polish] Test: Log out on tab 1, navigate in tab 2, verify redirect to /login
- [ ] T235 [Polish] Cookie changes should affect all tabs (browser auto-handles this)

### Expiration Edge Cases

- [ ] T236 [P] [Polish] Test with manually modified timestamp to simulate expiration
- [ ] T237 [Polish] Set cookie timestamp to 25 hours ago, verify redirect to /login
- [ ] T238 [Polish] Ensure parseAuthToken correctly calculates 24-hour window (86400000 ms)

**Checkpoint**: All edge cases handled, UX polished, security considerations documented

---

## Phase 10: Final Validation

**Goal**: Comprehensive validation of all functional requirements and user stories

### User Story End-to-End Testing

- [ ] T239 [P] [Validation] Test US1: Navigate to /login, log in with admin@example.com, verify redirect
- [ ] T240 [Validation] Test US1: Log in with manager@example.com, verify redirect
- [ ] T241 [Validation] Test US1: Try invalid credentials, verify error message
- [ ] T242 [Validation] Test US1: Submit empty form, verify validation errors
- [ ] T243 [P] [Validation] Test US2: Without logging in, navigate to /dashboard, verify redirect to /login
- [ ] T244 [Validation] Test US2: Without logging in, navigate to /employees, verify redirect
- [ ] T245 [Validation] Test US2: Without logging in, navigate to /departments, verify redirect
- [ ] T246 [P] [Validation] Test US3: Log in as admin, navigate to /departments, verify access granted
- [ ] T247 [Validation] Test US3: Log in as manager, navigate to /departments, verify redirect to /unauthorized
- [ ] T248 [Validation] Test US3: On /unauthorized page, click return to dashboard, verify navigation
- [ ] T249 [P] [Validation] Test US4: Log in, click logout, verify redirect to /login
- [ ] T250 [Validation] Test US4: After logout, verify auth-token cookie is removed
- [ ] T251 [Validation] Test US4: After logout, try accessing /dashboard, verify redirect to /login
- [ ] T252 [P] [Validation] Test US5: Log in, refresh page, verify still logged in
- [ ] T253 [Validation] Test US5: Log in, close and reopen browser, verify still logged in (if within 24h)
- [ ] T254 [Validation] Test US5: Navigate between routes, verify no re-authentication needed
- [ ] T255 [P] [Validation] Test US6: Log in as admin, verify "Admin" badge in sidebar
- [ ] T256 [Validation] Test US6: Log in as manager, verify "Manager" badge in sidebar
- [ ] T257 [Validation] Test US6: As manager, verify Department link is hidden in sidebar
- [ ] T258 [Validation] Test US6: As admin, verify all navigation links visible

### Functional Requirements Validation

- [ ] T259 [P] [Validation] Verify FR-001 to FR-007: Login form has all required fields and validation
- [ ] T260 [Validation] Verify FR-008 to FR-011: Static credentials and token creation work
- [ ] T261 [Validation] Verify FR-012 to FR-015: Successful login redirects and creates cookie
- [ ] T262 [Validation] Verify FR-016 to FR-019: middleware.ts intercepts and protects routes
- [ ] T263 [Validation] Verify FR-020 to FR-023: Role-based authorization works correctly
- [ ] T264 [Validation] Verify FR-024 to FR-026: Unauthorized page displays and functions
- [ ] T265 [Validation] Verify FR-027 to FR-029: Logout removes cookie and redirects
- [ ] T266 [Validation] Verify FR-030 to FR-033: Sidebar displays user info and role
- [ ] T267 [Validation] Verify FR-034 to FR-035: Token validation and expiration work

### Cross-Browser Testing

- [ ] T268 [P] [Validation] Test login flow in Chrome browser
- [ ] T269 [Validation] Test login flow in Firefox browser
- [ ] T270 [Validation] Test login flow in Safari browser (if on macOS)
- [ ] T271 [Validation] Verify cookie handling consistent across browsers
- [ ] T272 [Validation] Verify redirects work in all browsers
- [ ] T273 [Validation] Verify styling is consistent across browsers

### TypeScript and Code Quality

- [ ] T274 [P] [Validation] Run TypeScript compilation: npm run build or tsc --noEmit
- [ ] T275 [Validation] Verify no TypeScript errors in all new files
- [ ] T276 [Validation] Verify all functions have proper type signatures
- [ ] T277 [Validation] Verify no 'any' types used (strict mode)
- [ ] T278 [Validation] Run linter if configured: npm run lint
- [ ] T279 [Validation] Fix any linting warnings or errors

### Performance Validation

- [ ] T280 [P] [Validation] Measure login form submission time (should be < 200ms)
- [ ] T281 [Validation] Measure middleware response time using network tab (should be < 50ms)
- [ ] T282 [Validation] Test with browser devtools throttling (slow 3G) for edge cases
- [ ] T283 [Validation] Verify no performance degradation on protected routes

### Success Criteria Checklist

- [ ] T284 [P] [Validation] SC-001: Valid credentials login works 100% of the time
- [ ] T285 [Validation] SC-002: Invalid credentials show error 100% of the time
- [ ] T286 [Validation] SC-003: Unauthenticated redirect to /login works 100%
- [ ] T287 [Validation] SC-004: Manager blocked from /departments 100%
- [ ] T288 [Validation] SC-005: Admin can access all routes 100%
- [ ] T289 [Validation] SC-006: Authentication persists after refresh 100%
- [ ] T290 [Validation] SC-007: Logout works 100% of the time
- [ ] T291 [Validation] SC-008: Form validation prevents invalid submission 100%
- [ ] T292 [Validation] SC-009: Middleware overhead < 100ms per request
- [ ] T293 [Validation] SC-012: Role indicators display correctly 100%

### Final Checks

- [ ] T294 [P] [Validation] Verify all new files follow project structure conventions
- [ ] T295 [Validation] Verify all console.log statements removed (or converted to proper logging)
- [ ] T296 [Validation] Verify no TODO or FIXME comments left in code
- [ ] T297 [Validation] Review all code for TypeScript best practices
- [ ] T298 [Validation] Verify Tailwind classes are used consistently
- [ ] T299 [Validation] Verify responsive design works on mobile (320px to 1920px)
- [ ] T300 [Validation] Create feature branch: git checkout -b 004-auth-rbac
- [ ] T301 [Validation] Commit all changes with descriptive commit messages
- [ ] T302 [Validation] Merge to main after all validation passes
- [ ] T303 [Validation] Update README if needed with auth documentation

**Checkpoint**: All validation complete - Feature ready for merge to main

---

## Summary Statistics

- **Total Tasks**: 303
- **Phases**: 10
- **User Stories**: 6 (2 P1, 2 P2, 2 P3)
- **New Files**: 4 (middleware.ts, app/utils/auth.ts, app/login/page.tsx, app/unauthorized/page.tsx)
- **Modified Files**: 1 (app/components/Sidebar.tsx)
- **Estimated Time**: 4-5.5 hours (per plan.md)

## Critical Path

1. **Phase 2 (Foundation)**: Auth utilities must be complete first
2. **Phase 3 (US1)**: Login page depends on auth utilities
3. **Phase 4 (US2)**: Middleware depends on auth utilities and login page
4. **Phase 5 (US3)**: Role authorization extends middleware functionality
5. **Phases 6-8**: Can be implemented in parallel after core auth flow works
6. **Phases 9-10**: Polish and validation after all features implemented

## Notes

- Tasks marked [P] can be executed in parallel with other [P] tasks in the same phase
- Each phase has a checkpoint to verify completion before moving to next phase
- Testing approach is manual due to project constitution excluding automated tests
- middleware.ts at root (NOT proxy.ts) is the correct approach for Next.js 16
- Cookie expiration set to 24 hours (86400 seconds)
- This implementation is NOT production-ready - suitable for learning/demo only
