# Implementation Plan: Authentication and Role-Based Access Control (RBAC)

**Branch**: `004-auth-rbac` | **Date**: 2026-04-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-auth-rbac/spec.md`

## Summary

Implement authentication and role-based access control using static credentials (no backend) with Next.js 16 middleware for route protection. The system includes a login page with email/password validation, authentication state management via HTTP-only cookies, route protection for /dashboard, /employees, and /departments routes, and role-based authorization where only admin users can access /departments. Manager users accessing /departments are redirected to /unauthorized page. Features include logout functionality, persistent authentication across page refreshes, and visual role indicators in the sidebar.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16  
**Primary Dependencies**:

- next@16.x (App Router with middleware.ts)
- react@19.x
- tailwindcss@4.x
- No external auth libraries (vanilla implementation)

**Storage**: HTTP cookies for auth-token (accessible to middleware and client)  
**Testing**: None (per constitution - testing explicitly excluded)  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - last 2 versions)  
**Project Type**: Web application (Single Page Application)  
**Performance Goals**:

- Login form submission < 200ms
- Middleware authentication check < 50ms per request
- Cookie parsing and validation < 10ms
- Redirect response time < 100ms
- Page load with auth check < 500ms total

**Constraints**:

- Static credentials only (no database, no backend)
- Two users: admin@example.com and manager@example.com (both password: "password")
- Two roles: "admin" (full access) and "manager" (limited access)
- Client-side authentication (not production-ready)
- Cookie-based state (24-hour expiration)
- Middleware runs on Edge Runtime (limitations apply)
- No password hashing (static credentials visible in code)

**Scale/Scope**:

- 1 login page (app/login/page.tsx)
- 1 unauthorized page (app/unauthorized/page.tsx)
- 1 middleware file (middleware.ts at root)
- 1 auth utility file (app/utils/auth.ts)
- Update Sidebar component for logout and role display
- Update root layout for auth context
- 6 user stories (2 P1, 2 P2, 2 P3)

## Constitution Check

_GATE: Must pass before implementation._

✅ **Component Reusability**: Reusing Sidebar component with enhancements; auth utilities designed for reuse  
✅ **Local Storage First**: Using cookies (browser storage) for auth state - no backend APIs  
✅ **Next.js 16 & TypeScript**: All code uses Next.js 16 App Router with middleware.ts and TypeScript strict mode  
✅ **Tailwind CSS Styling**: All styling via Tailwind utility classes, consistent with app theme  
✅ **Simplicity & Speed**: Minimal new components (login page, unauthorized page), leveraging Next.js middleware, no testing, no external auth libraries

**No violations** - This implementation fully aligns with constitution principles and builds on existing infrastructure.

## Project Structure

### Documentation (this feature)

```text
specs/004-auth-rbac/
├── plan.md              # This file - implementation plan
└── spec.md              # Feature specification
```

### Source Code (repository root)

```text
middleware.ts            # NEW - Route protection and auth checks (Edge Runtime)
app/
├── login/
│   └── page.tsx         # NEW - Login form page
├── unauthorized/
│   └── page.tsx         # NEW - Unauthorized access page
├── components/
│   └── Sidebar.tsx      # MODIFY - Add logout button and user info display
├── utils/
│   └── auth.ts          # NEW - Auth utilities (validate credentials, cookies)
└── layout.tsx           # MODIFY - Add auth context/state if needed

public/                  # Static assets (EXISTING - no changes)
```

**Structure Decision**: Using Next.js 16 middleware.ts at root for route interception (standard approach). Login and unauthorized pages are new routes. Auth utilities centralized in app/utils/auth.ts. Sidebar updated to show user info and logout button. No complex state management needed - cookies handle persistence automatically via middleware.

## Complexity Tracking

> **No violations - this section intentionally empty**

The implementation follows all constitution principles. Component count is minimal (2 new pages), and middleware is standard Next.js functionality. All auth logic is essential for security requirements.

## Implementation Phases

### Phase 0: Preparation ✅ (Already Completed)

- [x] Specification written
- [x] Existing infrastructure from 001-003 (layout, sidebar, routing)
- [x] Next.js 16 middleware.ts support confirmed

### Phase 1: Auth Utilities & Static Credentials (Priority: Critical - Foundation)

**Goal**: Create authentication utilities with static credential validation and cookie management.

**Files to Create**:

1. `app/utils/auth.ts` - Authentication utilities

**Implementation Details**:

**Auth Utilities** (`app/utils/auth.ts`):

- Static credentials array:
  ```typescript
  const USERS = [
    { email: "admin@example.com", password: "password", role: "admin" },
    { email: "manager@example.com", password: "password", role: "manager" },
  ];
  ```
- Function `validateCredentials(email: string, password: string)`:
  - Normalize email to lowercase
  - Find matching user
  - Return user object if valid, null if invalid
- Function `createAuthToken(email: string, role: string)`:
  - Create JWT-like structure or simple JSON
  - Include: email, role, timestamp
  - Return token string
- Function `parseAuthToken(token: string)`:
  - Parse token string
  - Validate structure
  - Check expiration (24 hours)
  - Return { email, role } or null
- Function `isTokenExpired(timestamp: number)`:
  - Check if timestamp is > 24 hours old
  - Return boolean
- TypeScript interfaces:

  ```typescript
  interface User {
    email: string;
    password: string;
    role: "admin" | "manager";
  }

  interface AuthToken {
    email: string;
    role: "admin" | "manager";
    timestamp: number;
  }
  ```

**Acceptance Criteria**:

- validateCredentials returns user for valid credentials
- validateCredentials is case-insensitive for email
- validateCredentials returns null for invalid credentials
- createAuthToken generates valid JSON string
- parseAuthToken correctly parses valid tokens
- parseAuthToken returns null for expired tokens
- All functions properly typed with TypeScript

### Phase 2: Login Page (Priority: P1 - User Story 1)

**Goal**: Create login page with email/password form and validation.

**Files to Create**:

1. `app/login/page.tsx` - Login page with form

**Implementation Details**:

**Login Page** (`app/login/page.tsx`):

- Client component ('use client')
- Form state: email, password, errors, isLoading
- Email input:
  - type="email"
  - Required validation
  - Email format validation (basic regex)
  - onChange clears error
- Password input:
  - type="password"
  - Required validation
  - onChange clears error
- Submit handler:
  - Prevent default
  - Validate fields
  - Call validateCredentials from utils
  - If valid: create auth-token cookie, redirect to /dashboard
  - If invalid: show "Invalid email or password"
- Cookie creation:
  ```typescript
  document.cookie = `auth-token=${token}; path=/; max-age=86400`;
  ```
- Use useRouter() for redirect
- Loading state during submission
- Error display below form or per field
- Styling:
  - Centered login card
  - Consistent with app theme
  - Responsive design

**Acceptance Criteria**:

- Form displays with email, password inputs, and submit button
- Required validation prevents submission
- Email format validation works
- Valid credentials create cookie and redirect to /dashboard
- Invalid credentials show error message
- Loading state prevents double submission
- Styling matches app theme

### Phase 3: Middleware for Route Protection (Priority: P1 - User Story 2)

**Goal**: Implement middleware.ts for authentication and authorization checks on protected routes.

**Files to Create**:

1. `middleware.ts` - Route protection middleware (root level)

**Implementation Details**:

**Middleware** (`middleware.ts`):

- Import NextResponse, NextRequest
- Define protected routes array:
  ```typescript
  const protectedRoutes = ["/dashboard", "/employees", "/departments"];
  const adminOnlyRoutes = ["/departments"];
  ```
- Matcher configuration for performance:
  ```typescript
  export const config = {
    matcher: ["/dashboard", "/employees", "/departments", "/login"],
  };
  ```
- Main middleware function:
  - Get pathname from request
  - Get auth-token cookie from request.cookies
  - If on /login and authenticated: redirect to /dashboard
  - If on protected route and not authenticated: redirect to /login
  - If on /departments and not admin: redirect to /unauthorized
  - Otherwise: allow request to proceed
- Cookie parsing:
  ```typescript
  const token = request.cookies.get("auth-token")?.value;
  ```
- Use parseAuthToken from auth utils
- Return NextResponse.redirect() or NextResponse.next()

**Edge Runtime Considerations**:

- Middleware runs on Edge Runtime (lightweight)
- Can't use Node.js APIs
- Keep logic simple and fast
- Avoid heavy parsing

**Acceptance Criteria**:

- Unauthenticated users redirected to /login on protected routes
- Authenticated users can access /dashboard and /employees
- Admin users can access /departments
- Manager users redirected to /unauthorized on /departments
- Logged-in users on /login are redirected to /dashboard
- Middleware executes quickly (< 50ms)

### Phase 4: Unauthorized Page (Priority: P2 - User Story 3)

**Goal**: Create unauthorized page for permission denied scenarios.

**Files to Create**:

1. `app/unauthorized/page.tsx` - Unauthorized access page

**Implementation Details**:

**Unauthorized Page** (`app/unauthorized/page.tsx`):

- Simple page component
- Display message: "You don't have permission to access this page"
- Explanation: "This page requires admin privileges"
- Button/Link to return to dashboard
- Use Next.js Link component
- Styling:
  - Centered content
  - Warning/error theme (amber/red)
  - Icon (lock or warning symbol)
  - Consistent with app theme

**Acceptance Criteria**:

- Page displays clear permission denied message
- Link to dashboard is functional
- Styling is clear and indicates error/warning
- Consistent with app design

### Phase 5: Logout Functionality (Priority: P2 - User Story 4)

**Goal**: Add logout button to sidebar with cookie removal and redirect.

**Files to Modify**:

1. `app/components/Sidebar.tsx` - Add logout button and user info

**Implementation Details**:

**Sidebar Updates** (`app/components/Sidebar.tsx`):

- Make it a client component if not already ('use client')
- Add a state or directly read cookie for user info
- Get user email and role from auth-token cookie
- Display user info section at bottom/top of sidebar:
  - User email
  - Role badge (Admin/Manager)
- Add logout button below user info
- Logout handler:
  - Remove auth-token cookie: `document.cookie = 'auth-token=; path=/; max-age=0'`
  - Use router.push('/login') or router.refresh() + redirect
- Conditional rendering:
  - Hide Department link if role !== 'admin'
  - Show logout button only when authenticated
- Styling:
  - User info card/section
  - Role badge color-coded (blue for admin, green for manager)
  - Logout button with red/danger styling

**Acceptance Criteria**:

- User email displayed in sidebar
- Role badge shows correctly (Admin/Manager)
- Department link hidden for manager users
- Logout button visible when authenticated
- Clicking logout removes cookie
- After logout, redirected to /login
- Cannot access protected routes after logout

### Phase 6: Persistent Authentication (Priority: P3 - User Story 5)

**Goal**: Ensure authentication persists across page refreshes via cookie validation.

**Files to Verify**:

1. `middleware.ts` - Already handles this via cookie checks
2. `app/components/Sidebar.tsx` - Reads cookie on mount

**Implementation Details**:

**Verification Tasks**:

- Middleware already checks cookie on every request
- Cookie has 24-hour maxAge (automatic expiration)
- Browser automatically sends cookie with each request
- No additional code needed - verify functionality works

**Testing Scenarios**:

- Log in, refresh page → should stay logged in
- Log in, close browser, reopen within 24 hours → should stay logged in
- Log in, wait 24+ hours → should be logged out (cookie expired)
- Log in, navigate between routes → should not re-authenticate

**Acceptance Criteria**:

- User stays logged in after page refresh
- User stays logged in after browser close (if within 24 hours)
- Cookie expiration enforced at 24 hours
- No unnecessary re-authentication

### Phase 7: Visual Role Indicators (Priority: P3 - User Story 6)

**Goal**: Add visual feedback for user role in the UI.

**Files to Modify**:

1. `app/components/Sidebar.tsx` - Already addressed in Phase 5

**Implementation Details**:

**Visual Enhancements**:

- Role badge in sidebar (already in Phase 5)
- Conditional navigation (hide Department link for managers)
- Optional: Dashboard greeting with role
- Optional: User menu dropdown (instead of just displaying email)

**Acceptance Criteria**:

- Admin badge visible for admin users
- Manager badge visible for manager users
- Department link hidden/disabled for managers
- Visual distinction between roles clear

### Phase 8: Polish & Edge Cases

**Goal**: Handle edge cases, validation, and polish user experience.

**Tasks**:

1. Handle expired tokens gracefully:
   - If token expired, clear cookie and redirect to /login
   - Show "Session expired" message on login page
2. Handle invalid/malformed tokens:
   - If parseAuthToken fails, treat as not authenticated
   - Clear invalid cookie
3. Handle direct URL navigation:
   - Middleware catches all protected routes
   - Test by typing URLs directly
4. Handle browser back button after logout:
   - Middleware re-checks auth on navigation
   - Should redirect to /login
5. Handle case-insensitive email:
   - Already in validateCredentials function
   - Test with ADMIN@EXAMPLE.COM
6. Handle login while already logged in:
   - Middleware redirects /login to /dashboard if authenticated
   - Prevent redundant login
7. Form UX improvements:
   - Focus on email input on page load
   - Enter key submits form
   - Show/hide password toggle (optional)
   - Clear password on error
8. Loading states:
   - Disable form during submission
   - Show loading spinner on button
9. Validate cookie integrity:
   - Check token structure
   - Handle JSON parse errors
10. Test with browser devtools:
    - Manually modify cookie
    - Delete cookie
    - Expire cookie

**Acceptance Criteria**:

- All edge cases handled gracefully
- No console errors
- Clear error messages for users
- Smooth UX transitions
- Security checks robust

### Phase 9: Final Validation

**Goal**: Comprehensive validation of all functional requirements and success criteria.

**Tasks**:

1. Verify all 35 functional requirements (FR-001 through FR-035)
2. Test all 6 user stories end-to-end
3. Verify authentication flow:
   - Login with valid credentials
   - Access protected routes
   - Logout
   - Attempt access after logout
4. Verify authorization flow:
   - Login as admin, access /departments
   - Login as manager, attempt /departments → redirected
   - Verify unauthorized page displays
5. Test form validation:
   - Empty fields
   - Invalid email format
   - Invalid credentials
6. Test cookie handling:
   - Cookie created on login
   - Cookie removed on logout
   - Cookie expires after 24 hours
7. Test middleware:
   - Protected routes require auth
   - Admin-only routes enforce role
   - Login redirect for authenticated users
8. Test UI:
   - Role badges display correctly
   - Department link hidden for managers
   - Logout button works
9. Cross-browser testing:
   - Chrome, Firefox, Safari
   - Cookie behavior consistent
10. TypeScript compilation check:
    - No errors
    - All types correct

**Acceptance Criteria**:

- All 35 functional requirements met
- All 6 user stories work independently
- No TypeScript errors
- No console errors or warnings
- Authentication works 100% of the time
- Authorization enforced 100% of the time
- Cookies managed correctly
- UI displays role information accurately
- Consistent behavior across browsers

## Risk Assessment

**Low Risk**:

- Static credentials (no database complexity)
- Next.js middleware is standard feature
- Cookie handling is well-documented
- Simple authentication logic

**Moderate Risk**:

1. **Middleware Edge Runtime limitations**: Can't use all Node.js APIs
   - _Mitigation_: Keep middleware logic simple, use only Edge-compatible APIs, test early
2. **Cookie security**: HTTPOnly cookies can't be read by client JavaScript
   - _Mitigation_: Use HTTPOnly=false (acceptable for client-side auth), document security implications
3. **Token expiration edge cases**: Browser clock changes, timezone issues
   - _Mitigation_: Use server timestamp in middleware, validate on every request
4. **Logout race conditions**: Multiple tabs, cached pages
   - _Mitigation_: Middleware checks on every request, use router.refresh() after logout

**Potential Issues**:

1. **Browser back button after logout**: Cached pages might display
   - _Mitigation_: Middleware re-checks auth, add cache headers to prevent caching of protected pages
2. **Cookie size limits**: Auth token might be too large
   - _Mitigation_: Keep token minimal (email + role only), compress if needed
3. **Redirect loops**: Incorrect middleware logic could cause infinite redirects
   - _Mitigation_: Careful logic design, test thoroughly, add safeguards

## Success Metrics

- ✅ Users can log in with valid credentials 100% success rate
- ✅ Invalid credentials rejected 100% of the time
- ✅ Protected routes inaccessible without authentication (100% enforcement)
- ✅ /departments restricted to admin only (100% enforcement)
- ✅ Authentication persists across page refreshes
- ✅ Logout removes auth state and redirects successfully
- ✅ Middleware adds < 50ms overhead per request
- ✅ Form validation prevents invalid submissions
- ✅ Role indicators display correctly for all users
- ✅ Zero security vulnerabilities in auth logic (within client-side limitations)

## Dependencies & Prerequisites

**External**:

- Next.js 16 ✅
- Next.js middleware.ts support ✅
- Tailwind CSS ✅
- TypeScript ✅

**Internal**:

- Feature 001-initial-layout complete ✅
  - Sidebar layout
  - Basic routing structure
- Feature 002-employee-crud complete ✅ (for protected route testing)
- Feature 003-department-crud complete ✅ (for protected route testing)

**Blocked On**: Nothing - ready to implement

## Notes for Implementation

1. **Middleware.ts Best Practices**:
   - Keep logic minimal and fast
   - Use early returns
   - Avoid heavy computations
   - Cache parsed tokens if possible
   - Use matcher config to limit which routes run middleware

2. **Cookie Management**:
   - Set path=/ for site-wide access
   - Set maxAge=86400 (24 hours in seconds)
   - Don't use httpOnly (middleware needs to read it)
   - Use secure=true in production (HTTPS only)
   - Consider SameSite=Lax for CSRF protection

3. **Token Structure**:

   ```typescript
   {
     email: string,
     role: 'admin' | 'manager',
     timestamp: number  // Date.now()
   }
   ```

   - Serialize to JSON
   - Base64 encode for cookie storage (optional)
   - Keep minimal to avoid cookie size limits

4. **Redirect Patterns**:

   ```typescript
   // In middleware
   return NextResponse.redirect(new URL("/login", request.url));

   // In client component
   router.push("/login");
   router.refresh(); // Force re-render after auth change
   ```

5. **Sidebar Auth State**:
   - Read cookie on component mount
   - Use useEffect to parse auth-token
   - Store in component state or React Context
   - Re-read on route changes
   - Alternative: Create custom hook useAuth()

6. **Login Form Validation**:

   ```typescript
   const validateEmail = (email: string) => {
     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return regex.test(email);
   };
   ```

7. **Security Considerations**:
   - This is NOT production-ready (client-side only)
   - Static credentials visible in source code
   - No password hashing
   - No CSRF protection
   - No rate limiting
   - Document clearly: "For learning/demo purposes only"

8. **Testing Strategy** (Manual - No automated tests):
   - Test login flow with both users
   - Test route protection by navigating directly
   - Test role authorization by switching users
   - Test logout and verify cookie removal
   - Test persistence by refreshing pages
   - Test expiration by waiting 24+ hours (or manually set cookie expiry)

## Timeline Estimate

- Phase 1: 30-40 minutes (Auth utilities with static credentials)
- Phase 2: 45-60 minutes (Login page with form and validation)
- Phase 3: 45-60 minutes (Middleware for route protection - critical phase)
- Phase 4: 15-20 minutes (Unauthorized page - simple)
- Phase 5: 30-40 minutes (Sidebar updates for logout and user info)
- Phase 6: 10-15 minutes (Verify persistence - mostly testing)
- Phase 7: 10-15 minutes (Visual indicators - mostly done in Phase 5)
- Phase 8: 40-50 minutes (Edge cases, polish, testing)
- Phase 9: 30-40 minutes (Final validation, cross-browser testing)

**Total**: 4-5.5 hours

## Next Steps

1. ✅ Plan approved
2. → Move to task breakdown (create tasks.md)
3. → Create feature branch: git checkout -b 004-auth-rbac
4. → Begin Phase 1 implementation (Auth utilities)
5. → Progress through phases sequentially (Critical → P1 → P2 → P3)
6. → Validate against spec after each phase
7. → Manual testing throughout
8. → Full validation before marking complete
9. → Commit and merge to main after all validation passes

**Critical Path**: Phase 1 (utilities) → Phase 2 (login) → Phase 3 (middleware) form the core authentication flow that must work before proceeding to other features.
