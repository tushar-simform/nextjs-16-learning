---
description: "Task list for Initial Layout & Navigation feature"
---

# Tasks: Initial Layout & Navigation

**Input**: Design documents from `/specs/001-initial-layout/`
**Prerequisites**: plan.md ✅, spec.md ✅

**Tests**: No testing required per project constitution

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

Using Next.js 16 App Router structure:

- `app/` directory contains all routes and components
- `app/components/` for shared components
- `app/utils/` for utility functions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify project setup and prepare type definitions

- [ ] T001 Verify Next.js 16, React 19, TypeScript, and Tailwind CSS are properly installed
- [ ] T002 Verify app/globals.css has Tailwind directives configured
- [ ] T003 [P] Create TypeScript interfaces for Employee and Department in app/types.ts

**Checkpoint**: Basic project structure ready

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Create localStorage utility module in app/utils/storage.ts with type-safe get/set functions
- [ ] T005 Implement getEmployees() and getDepartments() functions that return empty arrays if no data
- [ ] T006 Implement saveEmployees() and saveDepartments() functions for future CRUD operations
- [ ] T007 Add sample data initialization function (optional helper for future use)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Application Landing Page (Priority: P1) 🎯 MVP

**Goal**: Establish foundational layout with sidebar and dashboard displaying summary statistics

**Independent Test**: Open application at "/" and verify sidebar with three menu items is visible, Dashboard is highlighted, and metric cards show employee/department counts

### Implementation for User Story 1

- [ ] T008 [P] [US1] Create Sidebar component in app/components/Sidebar.tsx with 'use client' directive
- [ ] T009 [P] [US1] Add dark theme styling to Sidebar (bg-gray-900, text-white, w-64)
- [ ] T010 [US1] Add app title "Team Management" and subtitle "Employee & Dept System" in Sidebar header
- [ ] T011 [US1] Create three navigation links in Sidebar using Next.js Link component (Dashboard, Employees, Departments)
- [ ] T012 [US1] Add emoji icons to menu items (📊 Dashboard, 👥 Employees, 🏢 Departments)
- [ ] T013 [US1] Implement active state detection using usePathname() hook in Sidebar
- [ ] T014 [US1] Apply blue background (bg-blue-600) to active menu item in Sidebar
- [ ] T015 [US1] Add hover states to menu items (hover:bg-gray-800) for better UX
- [ ] T016 [US1] Modify app/layout.tsx to include Sidebar component in root layout
- [ ] T017 [US1] Configure flexbox layout in app/layout.tsx (sidebar left, main content right)
- [ ] T018 [US1] Update app/page.tsx to be a client component ('use client')
- [ ] T019 [US1] Import storage utilities in app/page.tsx
- [ ] T020 [US1] Add useState hooks for employee count and department count in app/page.tsx
- [ ] T021 [US1] Add useEffect hook to load counts from localStorage on mount in app/page.tsx
- [ ] T022 [US1] Create metric card layout with two cards side by side in app/page.tsx
- [ ] T023 [US1] Implement Employee Count metric card with appropriate styling (border, shadow, padding)
- [ ] T024 [US1] Implement Department Count metric card with matching styling
- [ ] T025 [US1] Add page title "Dashboard" as h1 in app/page.tsx
- [ ] T026 [US1] Ensure graceful handling of zero state (display 0 if no data exists)

**Checkpoint**: At this point, User Story 1 should be fully functional - landing page with sidebar and dashboard metrics working

---

## Phase 4: User Story 2 - Navigate to Employee Management (Priority: P2)

**Goal**: Enable navigation to Employees section with placeholder content

**Independent Test**: Click "Employee" menu item, verify URL changes to "/employees", menu item is highlighted, and placeholder page displays

### Implementation for User Story 2

- [ ] T027 [P] [US2] Create app/employees directory
- [ ] T028 [US2] Create app/employees/page.tsx as a simple server component
- [ ] T029 [US2] Add page title "Employees" as h1 in app/employees/page.tsx
- [ ] T030 [US2] Add placeholder message "Employee management functionality will be available soon." in app/employees/page.tsx
- [ ] T031 [US2] Apply consistent styling with Tailwind (text-2xl for title, text-gray-600 for message)
- [ ] T032 [US2] Center content for better visual appearance in app/employees/page.tsx
- [ ] T033 [US2] Verify Sidebar's usePathname() correctly detects "/employees" route
- [ ] T034 [US2] Test navigation from Dashboard to Employees page

**Checkpoint**: User Story 2 complete - Employees section accessible with placeholder content

---

## Phase 5: User Story 3 - Navigate to Department Management (Priority: P2)

**Goal**: Enable navigation to Departments section with placeholder content

**Independent Test**: Click "Department" menu item, verify URL changes to "/departments", menu item is highlighted, and placeholder page displays

### Implementation for User Story 3

- [ ] T035 [P] [US3] Create app/departments directory
- [ ] T036 [US3] Create app/departments/page.tsx as a simple server component
- [ ] T037 [US3] Add page title "Departments" as h1 in app/departments/page.tsx
- [ ] T038 [US3] Add placeholder message "Department management functionality will be available soon." in app/departments/page.tsx
- [ ] T039 [US3] Apply consistent styling matching Employees page in app/departments/page.tsx
- [ ] T040 [US3] Center content for better visual appearance in app/departments/page.tsx
- [ ] T041 [US3] Verify Sidebar's usePathname() correctly detects "/departments" route
- [ ] T042 [US3] Test navigation from Dashboard to Departments page

**Checkpoint**: User Story 3 complete - Departments section accessible with placeholder content

---

## Phase 6: User Story 4 - Return to Dashboard (Priority: P3)

**Goal**: Enable return navigation to Dashboard from any page

**Independent Test**: From Employees or Departments page, click "Dashboard" menu item and verify return to "/" with dashboard content displayed

### Implementation for User Story 4

- [ ] T043 [US4] Test clicking Dashboard menu item from Employees page
- [ ] T044 [US4] Test clicking Dashboard menu item from Departments page
- [ ] T045 [US4] Verify Dashboard menu item highlights correctly when on "/" route
- [ ] T046 [US4] Verify metric cards re-display correctly when returning to dashboard
- [ ] T047 [US4] Test complete navigation loop: Dashboard → Employees → Departments → Dashboard

**Checkpoint**: User Story 4 complete - Full navigation cycle working

---

## Phase 7: Custom 404 Handling (Priority: P3)

**Purpose**: Handle invalid routes gracefully with custom error page

- [ ] T048 [P] Create app/not-found.tsx for custom 404 page
- [ ] T049 Add "404 - Page Not Found" heading in app/not-found.tsx
- [ ] T050 Add helpful message "The page you're looking for doesn't exist." in app/not-found.tsx
- [ ] T051 Add Link component to return to dashboard in app/not-found.tsx
- [ ] T052 Style 404 page consistently with application theme
- [ ] T053 Test invalid URL (e.g., /invalid-route) shows custom 404 page
- [ ] T054 Verify Sidebar remains visible on 404 page (inherited from layout)
- [ ] T055 Verify link back to dashboard works from 404 page

**Checkpoint**: 404 handling complete - invalid routes handled gracefully

---

## Phase 8: Browser Navigation & Edge Cases (Priority: P3)

**Purpose**: Verify browser back/forward buttons and edge case handling

- [ ] T056 Test browser back button navigation (Dashboard → Employees → back)
- [ ] T057 Test browser forward button navigation
- [ ] T058 Verify active menu item updates correctly with back/forward navigation
- [ ] T059 Test direct URL entry for each route (/, /employees, /departments)
- [ ] T060 Verify URL bar always reflects current page correctly
- [ ] T061 Check for any console errors or warnings during navigation
- [ ] T062 Verify no layout shift occurs during page transitions

**Checkpoint**: All navigation scenarios working correctly

---

## Phase 9: Polish & Final Validation (Priority: P3)

**Purpose**: Final quality checks and requirement validation

- [ ] T063 Verify all functional requirements FR-001 through FR-017 from spec.md
- [ ] T064 Test complete navigation flow: Dashboard → Employees → Departments → Dashboard
- [ ] T065 Verify sidebar width is exactly 256px (w-64)
- [ ] T066 Verify dark theme colors match specification (gray-900, white text, blue-600 active)
- [ ] T067 Check emoji icons display correctly on all browsers
- [ ] T068 Verify app title "Team Management" and subtitle display correctly
- [ ] T069 Test metric cards on dashboard show correct counts
- [ ] T070 Verify placeholder messages on Employees and Departments pages
- [ ] T071 Check page load time meets < 2 seconds requirement
- [ ] T072 Verify no TypeScript compilation errors
- [ ] T073 Run Next.js build to ensure production build succeeds
- [ ] T074 Visual review: consistent spacing, alignment, and styling across all pages
- [ ] T075 Accessibility check: verify semantic HTML usage (nav, main, h1)

**Checkpoint**: All requirements validated - feature complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (different routes/pages)
  - Or sequentially in priority order (US1 → US2 → US3 → US4)
- **Custom 404 (Phase 7)**: Can proceed in parallel with user stories
- **Browser Nav (Phase 8)**: Depends on US1-US4 being complete
- **Polish (Phase 9)**: Depends on all previous phases being complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundation (Phase 2) complete → Can start immediately
- **User Story 2 (P2)**: Foundation (Phase 2) complete → Can run in parallel with US1 (different files)
- **User Story 3 (P2)**: Foundation (Phase 2) complete → Can run in parallel with US1, US2 (different files)
- **User Story 4 (P3)**: Depends on US1, US2, US3 being complete (tests navigation between them)

### Within Each User Story

**User Story 1 (Dashboard + Sidebar)**:

- T008-T015 (Sidebar component): Sequential within component, but Sidebar is independent file
- T016-T017 (Layout): Depends on Sidebar being created
- T018-T026 (Dashboard page): Can run in parallel with Sidebar creation (different file)

**User Story 2 (Employees page)**:

- All tasks sequential but independent from other stories

**User Story 3 (Departments page)**:

- All tasks sequential but independent from other stories

### Parallel Opportunities

```bash
# Phase 1: Setup - these can run in parallel
T001: Verify dependencies
T003: Create types.ts (different file)

# Phase 2: Foundational - sequential within storage.ts
T004-T007 must run in order

# Phase 3: User Story 1 - partial parallelization possible
T008-T015: Sidebar component (app/components/Sidebar.tsx)
T018-T026: Dashboard page (app/page.tsx) ← Can run PARALLEL with Sidebar
T016-T017: Layout modification (after Sidebar complete)

# Phase 4 & 5: Can run in PARALLEL with each other
User Story 2 (app/employees/page.tsx)
User Story 3 (app/departments/page.tsx)

# Phase 7: Can run in PARALLEL with Phase 4-5
Custom 404 page (app/not-found.tsx)
```

---

## Implementation Strategy

### Recommended Execution Order (Sequential)

1. ✅ Complete Phase 1: Setup (T001-T003)
2. ✅ Complete Phase 2: Foundational (T004-T007) - Critical blocker
3. ✅ Complete Phase 3: User Story 1 (T008-T026) - MVP foundation
   - **STOP and TEST**: Verify dashboard and sidebar working
4. ✅ Complete Phase 4: User Story 2 (T027-T034) - Employees page
   - **STOP and TEST**: Verify navigation to Employees works
5. ✅ Complete Phase 5: User Story 3 (T035-T042) - Departments page
   - **STOP and TEST**: Verify navigation to Departments works
6. ✅ Complete Phase 6: User Story 4 (T043-T047) - Return navigation
7. ✅ Complete Phase 7: Custom 404 (T048-T055)
8. ✅ Complete Phase 8: Browser Navigation (T056-T062)
9. ✅ Complete Phase 9: Polish & Validation (T063-T075)

### Alternative: Parallel Development Strategy

If multiple developers available:

1. **Developer A**: Phase 1 + Phase 2 (foundation)
2. Once Phase 2 complete, split work:
   - **Developer A**: T008-T017, T027-T034 (Sidebar + Employees)
   - **Developer B**: T018-T026, T035-T042 (Dashboard + Departments)
   - **Developer C**: T048-T055 (404 page)
3. Merge and complete Phase 6, 8, 9 together

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- No testing infrastructure per constitution (no test files to create)
- Commit after each logical group of tasks
- Stop at checkpoints to validate story independently
- TypeScript compilation should be checked continuously during development
- Next.js dev server provides hot reload for rapid iteration

---

## Success Criteria Mapping

Each phase contributes to overall success criteria:

- **SC-001** (Load < 2s): Phases 1-3 (minimal components, efficient layout)
- **SC-002** (Navigation works 100%): Phases 3-6 (all routes functional)
- **SC-003** (Active highlighting 100%): Phase 3 (Sidebar usePathname logic)
- **SC-004** (URL reflects page 100%): Phases 3-6 (Next.js routing)
- **SC-005** (Consistent layout): Phases 3, 9 (shared layout, visual review)

Total Estimated Time: 90-130 minutes across all phases
