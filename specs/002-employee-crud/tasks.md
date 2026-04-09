---
description: "Task list for Employee CRUD Management feature"
---

# Tasks: Employee CRUD Management

**Input**: Design documents from `/specs/002-employee-crud/`
**Prerequisites**: plan.md ✅, spec.md ✅, 001-initial-layout (complete) ✅

**Tests**: No testing required per project constitution

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5, US6)
- Include exact file paths in descriptions

## Path Conventions

Using Next.js 16 App Router structure:

- `app/` directory contains all routes and components
- `app/components/` for shared components
- `app/utils/` for utility functions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify existing infrastructure and prepare for employee CRUD implementation

- [ ] T001 Verify Employee and Department interfaces exist in app/types.ts with required fields
- [ ] T002 Verify getEmployees(), addEmployee(), updateEmployee(), deleteEmployee() exist in app/utils/storage.ts
- [ ] T003 [P] Verify getDepartments() exists in app/utils/storage.ts for dropdown population
- [ ] T004 [P] Review existing Modal component in app/components/Modal.tsx for reusability

**Checkpoint**: Infrastructure verified and ready for CRUD implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create reusable components that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Create Pagination component skeleton in app/components/Pagination.tsx with TypeScript interface
- [ ] T006 Implement Pagination props: currentPage, totalPages, onPageChange callback
- [ ] T007 Add Previous button with disabled state when currentPage === 1
- [ ] T008 Add Next button with disabled state when currentPage === totalPages
- [ ] T009 Add current page / total pages display text
- [ ] T010 [P] Style Pagination component with Tailwind matching app theme (gray/blue palette)
- [ ] T011 [P] Create ConfirmDialog component skeleton in app/components/ConfirmDialog.tsx
- [ ] T012 Implement ConfirmDialog props: isOpen, title, message, onConfirm, onCancel
- [ ] T013 Use existing Modal component as wrapper in ConfirmDialog
- [ ] T014 Add two buttons in ConfirmDialog: Confirm (danger style) and Cancel
- [ ] T015 Style ConfirmDialog with red/danger styling for destructive actions

**Checkpoint**: Foundation ready - reusable components complete, user story implementation can begin

---

## Phase 3: User Story 1 - View Employee List (Priority: P1) 🎯 MVP

**Goal**: Transform employees page from placeholder to functional paginated table showing employee data

**Independent Test**: Navigate to /employees, verify table displays with columns (ID, Name, Email, Contact, Department, Actions) and shows max 5 employees per page with pagination controls

### Implementation for User Story 1

- [ ] T016 [P] [US1] Update app/employees/page.tsx to be a client component ('use client')
- [ ] T017 [US1] Import getEmployees and getDepartments from app/utils/storage.ts in employees page
- [ ] T018 [US1] Add state: employees (Employee[]), departments (Department[]), currentPage (number)
- [ ] T019 [US1] Set itemsPerPage constant to 5 in employees page
- [ ] T020 [US1] Add useEffect to load employees and departments from localStorage on mount
- [ ] T021 [US1] Create department lookup map (departmentId → department name) for table display
- [ ] T022 [US1] Calculate startIndex and endIndex based on currentPage and itemsPerPage
- [ ] T023 [US1] Slice employees array to get paginatedEmployees for current page
- [ ] T024 [US1] Calculate totalPages = Math.ceil(employees.length / itemsPerPage)
- [ ] T025 [US1] Create table with columns: Employee ID, Name, Email, Contact, Department, Actions
- [ ] T026 [US1] Map over paginatedEmployees to render table rows
- [ ] T027 [US1] Display employee.id in Employee ID column
- [ ] T028 [US1] Display employee.name in Name column
- [ ] T029 [US1] Display employee.email in Email column
- [ ] T030 [US1] Display employee.phone in Contact column (handle empty phone)
- [ ] T031 [US1] Resolve departmentId to department name using lookup map in Department column
- [ ] T032 [US1] Add Actions column with placeholder for edit/delete icons
- [ ] T033 [US1] Style table with Tailwind: borders, alternating row colors, proper spacing
- [ ] T034 [US1] Add empty state component when employees.length === 0
- [ ] T035 [US1] Empty state displays centered message with icon and helpful text
- [ ] T036 [US1] Import and add Pagination component below table
- [ ] T037 [US1] Pass currentPage, totalPages, and onPageChange handler to Pagination
- [ ] T038 [US1] Implement onPageChange handler to update currentPage state
- [ ] T039 [US1] Conditionally render Pagination only when totalPages > 1
- [ ] T040 [US1] Add page title "Employees" as h1 at top of page

**Checkpoint**: User Story 1 complete - Employee table displaying with pagination working

---

## Phase 4: User Story 2 - Search for Employees (Priority: P1)

**Goal**: Add real-time search filtering for employees by name, email, or department

**Independent Test**: Type in search input, verify table filters to show only matching employees and pagination resets to page 1

### Implementation for User Story 2

- [ ] T041 [P] [US2] Add searchQuery state (string) to app/employees/page.tsx
- [ ] T042 [US2] Create search input field with Tailwind styling at top left of page
- [ ] T043 [US2] Add search icon (🔍) inside search input for visual clarity
- [ ] T044 [US2] Bind search input value to searchQuery state
- [ ] T045 [US2] Add onChange handler to update searchQuery (debounced 300ms)
- [ ] T046 [US2] Implement debounce logic using setTimeout and clearTimeout
- [ ] T047 [US2] Create filterEmployees function that filters by name, email, department (case-insensitive)
- [ ] T048 [US2] Apply searchQuery filter before pagination: filteredEmployees = filterEmployees(employees, searchQuery)
- [ ] T049 [US2] Update pagination calculations to use filteredEmployees.length instead of employees.length
- [ ] T050 [US2] Update paginatedEmployees to slice from filteredEmployees instead of employees
- [ ] T051 [US2] Reset currentPage to 1 when searchQuery changes (useEffect dependency)
- [ ] T052 [US2] Add clear button (X icon) in search input when searchQuery is not empty
- [ ] T053 [US2] Implement clear button onClick to set searchQuery to empty string
- [ ] T054 [US2] Display filtered count: "Showing X of Y employees" below search input
- [ ] T055 [US2] Update empty state to show "No employees match your search" when filtering results in 0

**Checkpoint**: User Story 2 complete - Search filtering working with pagination

---

## Phase 5: User Story 3 - Create New Employee (Priority: P2)

**Goal**: Implement create employee functionality via modal form with validation

**Independent Test**: Click Create Employee button, fill form, submit, verify modal closes and new employee appears in table

### Implementation for User Story 3

- [ ] T056 [P] [US3] Create EmployeeForm component skeleton in app/components/EmployeeForm.tsx
- [ ] T057 [US3] Define EmployeeForm props: initialData (optional), departments, onSubmit, onCancel
- [ ] T058 [US3] Add form state in EmployeeForm: name, email, phone, departmentId
- [ ] T059 [US3] Add validation errors state: nameError, emailError, departmentError
- [ ] T060 [US3] Create controlled input for Name field with label and error display
- [ ] T061 [US3] Create controlled select dropdown for Department with label and error display
- [ ] T062 [US3] Populate department dropdown with departments from props
- [ ] T063 [US3] Create controlled input for Email field with email type and error display
- [ ] T064 [US3] Create controlled input for Phone with tel type (optional)
- [ ] T065 [US3] Implement validateName function: required, min 2 characters
- [ ] T066 [US3] Implement validateEmail function: required, valid email format regex
- [ ] T067 [US3] Implement validateDepartment function: required
- [ ] T068 [US3] Add handleSubmit function that validates all fields before calling onSubmit
- [ ] T069 [US3] Display inline error messages below each field when validation fails
- [ ] T070 [US3] Add Submit button with appropriate text ("Create Employee" or "Save Changes")
- [ ] T071 [US3] Add Cancel button that calls onCancel prop
- [ ] T072 [US3] Style form with Tailwind: proper spacing, labels, input styling
- [ ] T073 [US3] Pre-fill form fields with initialData if provided (for edit mode)
- [ ] T074 [US3] Add "Create Employee" button at top right of app/employees/page.tsx
- [ ] T075 [US3] Add showCreateModal state (boolean) to employees page
- [ ] T076 [US3] Implement handleCreateClick to set showCreateModal to true
- [ ] T077 [US3] Add Modal wrapper that shows when showCreateModal is true
- [ ] T078 [US3] Pass EmployeeForm component inside Modal with create mode
- [ ] T079 [US3] Implement handleCreateSubmit: check email uniqueness across all employees
- [ ] T080 [US3] If email exists, show validation error and prevent submission
- [ ] T081 [US3] If valid, call addEmployee from storage utils with form data
- [ ] T082 [US3] Refresh employees list by calling getEmployees() after successful creation
- [ ] T083 [US3] Close modal by setting showCreateModal to false
- [ ] T084 [US3] Reset form by re-rendering EmployeeForm (key change or state reset)
- [ ] T085 [US3] Handle modal close on outside click by setting showCreateModal to false

**Checkpoint**: User Story 3 complete - Create employee working with validation

---

## Phase 6: User Story 4 - Edit Employee Details (Priority: P2)

**Goal**: Implement edit employee functionality via modal form with pre-filled data

**Independent Test**: Click edit icon for an employee, modify data in modal, save, verify table updates immediately

### Implementation for User Story 4

- [ ] T086 [P] [US4] Add edit icon (✏️ or pencil SVG) to Actions column in table
- [ ] T087 [US4] Add showEditModal state (boolean) to app/employees/page.tsx
- [ ] T088 [US4] Add selectedEmployee state (Employee | null) to employees page
- [ ] T089 [US4] Implement handleEditClick(employee: Employee) to set selectedEmployee and showEditModal
- [ ] T090 [US4] Add Modal wrapper that shows when showEditModal is true
- [ ] T091 [US4] Pass EmployeeForm component inside edit Modal with initialData = selectedEmployee
- [ ] T092 [US4] Implement handleEditSubmit: check email uniqueness (allow same email for same employee ID)
- [ ] T093 [US4] Create isEmailUniqueForEdit function: filter employees excluding current employee ID
- [ ] T094 [US4] If email exists for different employee, show validation error
- [ ] T095 [US4] If valid, call updateEmployee from storage utils with employee ID and updated data
- [ ] T096 [US4] Refresh employees list by calling getEmployees() after successful update
- [ ] T097 [US4] Close modal by setting showEditModal to false and selectedEmployee to null
- [ ] T098 [US4] Handle modal close on outside click or cancel
- [ ] T099 [US4] Style edit icon with blue color and hover effect in Actions column
- [ ] T100 [US4] Position edit icon before delete icon in Actions column

**Checkpoint**: User Story 4 complete - Edit employee working with pre-filled data

---

## Phase 7: User Story 5 - Delete Employee (Priority: P3)

**Goal**: Implement delete functionality with confirmation modal for safety

**Independent Test**: Click delete icon, confirm in modal, verify employee removed from table

### Implementation for User Story 5

- [ ] T101 [P] [US5] Add delete icon (🗑️ or trash SVG) to Actions column in table
- [ ] T102 [US5] Add showDeleteModal state (boolean) to app/employees/page.tsx
- [ ] T103 [US5] Add employeeToDelete state (Employee | null) to employees page
- [ ] T104 [US5] Implement handleDeleteClick(employee: Employee) to set employeeToDelete and showDeleteModal
- [ ] T105 [US5] Add ConfirmDialog that shows when showDeleteModal is true
- [ ] T106 [US5] Pass title: "Delete Employee" to ConfirmDialog
- [ ] T107 [US5] Pass message: "Are you sure you want to delete [employee.name]?" to ConfirmDialog
- [ ] T108 [US5] Implement handleConfirmDelete: call deleteEmployee from storage utils with employee ID
- [ ] T109 [US5] Refresh employees list by calling getEmployees() after successful deletion
- [ ] T110 [US5] Check if current page is now empty after deletion
- [ ] T111 [US5] If current page empty and not page 1, navigate to previous page (currentPage - 1)
- [ ] T112 [US5] Close modal by setting showDeleteModal to false and employeeToDelete to null
- [ ] T113 [US5] Implement handleCancelDelete to close modal without deletion
- [ ] T114 [US5] Style delete icon with red color and hover effect in Actions column
- [ ] T115 [US5] Position delete icon after edit icon in Actions column

**Checkpoint**: User Story 5 complete - Delete employee working with confirmation

---

## Phase 8: User Story 6 - Navigate Paginated Results (Priority: P3)

**Goal**: Enhance pagination with page number buttons and ellipsis for better navigation

**Independent Test**: Verify page numbers appear, clicking numbers navigates to that page, ellipsis shows for many pages

### Implementation for User Story 6

- [ ] T116 [P] [US6] Enhance Pagination component to display page number buttons
- [ ] T117 [US6] Implement logic to show up to 5 page numbers with ellipsis if totalPages > 7
- [ ] T118 [US6] Calculate visible page numbers based on currentPage and totalPages
- [ ] T119 [US6] Always show page 1 and last page in visible pages
- [ ] T120 [US6] Show ellipsis (...) between page numbers when gaps exist
- [ ] T121 [US6] Make page numbers clickable with onClick handler
- [ ] T122 [US6] Highlight current page number with different background color (blue)
- [ ] T123 [US6] Style page number buttons with Tailwind: borders, hover effects, spacing
- [ ] T124 [US6] Ensure Previous button is before page numbers
- [ ] T125 [US6] Ensure Next button is after page numbers
- [ ] T126 [US6] Test pagination with various scenarios: 1 page, 5 pages, 10+ pages
- [ ] T127 [US6] Verify pagination works correctly with search filtering

**Checkpoint**: User Story 6 complete - Full pagination navigation working

---

## Phase 9: Edge Cases & Polish (Priority: P3)

**Purpose**: Handle edge cases, final validation, and polish user experience

- [ ] T128 Test email uniqueness validation: create with duplicate email shows error
- [ ] T129 Test email uniqueness in edit: allow same email for same employee
- [ ] T130 Test empty department dropdown: show message if no departments exist
- [ ] T131 Handle very long employee names: truncate with ellipsis in table, show full in modal
- [ ] T132 Handle very long emails: truncate with ellipsis in table, show full in modal
- [ ] T133 Test phone number validation: basic format check, allow various formats
- [ ] T134 Test deleting last employee on page 2+: verify navigation to previous page
- [ ] T135 Test searching while on page 3: verify reset to page 1 with search results
- [ ] T136 Test clearing search: verify return to original page or page 1
- [ ] T137 Test with 0 employees: verify empty state displays correctly
- [ ] T138 Test with exactly 5 employees: verify no pagination controls show
- [ ] T139 Test with 6 employees: verify pagination shows 2 pages
- [ ] T140 Test with 50+ employees: verify pagination with ellipsis works
- [ ] T141 Verify modal closes when clicking outside modal content
- [ ] T142 Verify modal closes when pressing Escape key (if implemented)
- [ ] T143 Test form reset after successful create: verify form clears for next use
- [ ] T144 Test cancel button in forms: verify no data saved and modal closes
- [ ] T145 Add focus management: auto-focus first input when modal opens
- [ ] T146 Test department resolution: verify department names display correctly (not IDs)
- [ ] T147 Test "Unknown Department" display when employee's department was deleted
- [ ] T148 Verify localStorage persistence: refresh page and verify data persists
- [ ] T149 Add loading state handling if localStorage operations are slow (unlikely but safe)
- [ ] T150 Test search with special characters: verify no errors, proper filtering

**Checkpoint**: All edge cases handled, user experience polished

---

## Phase 10: Final Validation (Priority: P3)

**Purpose**: Comprehensive validation of all functional requirements and success criteria

- [ ] T151 Verify FR-001: Search input at top left ✓
- [ ] T152 Verify FR-002: Create Employee button at top right ✓
- [ ] T153 Verify FR-003: Create button opens modal ✓
- [ ] T154 Verify FR-004: Modal has Name, Department, Email, Phone fields ✓
- [ ] T155 Verify FR-005: Modal has Create Employee submit button ✓
- [ ] T156 Verify FR-006: Name and Email are required ✓
- [ ] T157 Verify FR-007: Email validation for format ✓
- [ ] T158 Verify FR-008: Email uniqueness enforced ✓
- [ ] T159 Verify FR-009: Successful create closes modal and refreshes table ✓
- [ ] T160 Verify FR-010: Table has all required columns ✓
- [ ] T161 Verify FR-011: Table displays max 5 rows per page ✓
- [ ] T162 Verify FR-012: Pagination shows when > 5 employees ✓
- [ ] T163 Verify FR-013: Actions column has edit and delete icons ✓
- [ ] T164 Verify FR-014: Edit icon opens modal with pre-filled data ✓
- [ ] T165 Verify FR-015: Edit modal allows modification of all fields ✓
- [ ] T166 Verify FR-016: Save updates localStorage and closes modal ✓
- [ ] T167 Verify FR-017: Delete icon opens confirmation modal ✓
- [ ] T168 Verify FR-018: Confirmation shows employee name ✓
- [ ] T169 Verify FR-019: Confirm removes employee ✓
- [ ] T170 Verify FR-020: Cancel closes modal without deletion ✓
- [ ] T171 Verify FR-021: Search filters in real-time ✓
- [ ] T172 Verify FR-022: Search matches name, email, department ✓
- [ ] T173 Verify FR-023: Search results paginated ✓
- [ ] T174 Verify FR-024: Clearing search restores full list ✓
- [ ] T175 Verify FR-025: Pagination shows current/total pages ✓
- [ ] T176 Verify FR-026: Pagination has Previous, Next, page numbers ✓
- [ ] T177 Verify FR-027: Employee ID auto-generated ✓
- [ ] T178 Verify FR-028: Data persists in localStorage ✓
- [ ] T179 Verify FR-029: Modals close on outside click ✓
- [ ] T180 Verify FR-030: Empty state displays correctly ✓
- [ ] T181 Run TypeScript compilation: verify no errors
- [ ] T182 Check browser console: verify no errors or warnings
- [ ] T183 Test in Chrome, Firefox, Safari: verify cross-browser compatibility
- [ ] T184 Verify styling consistent with app theme from 001-initial-layout
- [ ] T185 Verify all Success Criteria (SC-001 through SC-010) met

**Checkpoint**: All requirements validated - feature complete and ready for merge

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - US1 (Phase 3): Can start after Foundation
  - US2 (Phase 4): Depends on US1 (modifies same page)
  - US3 (Phase 5): Depends on US1 (adds to same page)
  - US4 (Phase 6): Depends on US3 (reuses EmployeeForm component)
  - US5 (Phase 7): Depends on US1 (adds to actions column)
  - US6 (Phase 8): Depends on US1 (enhances Pagination component)
- **Edge Cases (Phase 9)**: Depends on all user stories being complete
- **Validation (Phase 10)**: Depends on everything being complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundation → Can start immediately
- **User Story 2 (P1)**: US1 complete → Modifies same page with search
- **User Story 3 (P2)**: US1 complete → Needs table to display created employees
- **User Story 4 (P2)**: US1 + US3 complete → Reuses EmployeeForm from US3
- **User Story 5 (P3)**: US1 complete → Adds delete to actions column
- **User Story 6 (P3)**: US1 complete → Enhances existing Pagination

### Within Each Phase

**Phase 2 (Foundational)**:

- T005-T010 (Pagination): Sequential
- T011-T015 (ConfirmDialog): Can run in parallel with Pagination (different files)

**Phase 3 (User Story 1)**:

- T016-T040: Mostly sequential, some styling tasks can be parallel

**Phase 5 (User Story 3)**:

- T056-T073 (EmployeeForm component): Sequential
- T074-T085 (Integration in page): Depends on EmployeeForm being complete

### Parallel Opportunities

```bash
# Phase 1: Setup - all can run in parallel (verification tasks)
T001, T002, T003, T004

# Phase 2: Foundational - partial parallelization
T005-T010: Pagination component (sequential within)
T011-T015: ConfirmDialog component ← Can run PARALLEL with Pagination

# Phase 5: US3 - partial parallelization
T056-T073: EmployeeForm component (app/components/EmployeeForm.tsx)
T074-T074: Create Button (app/employees/page.tsx) ← Can prepare PARALLEL
Then T075-T085 must be sequential (integration)

# Phase 9: Edge cases - many can run in parallel (testing)
T128-T150: Most edge case tests can run in parallel
```

---

## Implementation Strategy

### Recommended Execution Order (Sequential - Single Developer)

1. ✅ Complete Phase 1: Setup (T001-T004) - verify infrastructure
2. ✅ Complete Phase 2: Foundational (T005-T015) - Critical blocker
3. ✅ Complete Phase 3: User Story 1 (T016-T040) - MVP table view
   - **STOP and TEST**: Verify table displays with pagination
4. ✅ Complete Phase 4: User Story 2 (T041-T055) - Search functionality
   - **STOP and TEST**: Verify search filters correctly
5. ✅ Complete Phase 5: User Story 3 (T056-T085) - Create employee
   - **STOP and TEST**: Verify create modal works
6. ✅ Complete Phase 6: User Story 4 (T086-T100) - Edit employee
   - **STOP and TEST**: Verify edit modal works
7. ✅ Complete Phase 7: User Story 5 (T101-T115) - Delete employee
   - **STOP and TEST**: Verify delete confirmation works
8. ✅ Complete Phase 8: User Story 6 (T116-T127) - Enhanced pagination
   - **STOP and TEST**: Verify page numbers work
9. ✅ Complete Phase 9: Edge Cases (T128-T150)
10. ✅ Complete Phase 10: Final Validation (T151-T185)

### Alternative: Parallel Development Strategy

If 2-3 developers available:

1. **All developers**: Phase 1 + Phase 2 (foundation)
2. Once Phase 2 complete, split work:
   - **Developer A**: T016-T040 (US1 Table), T116-T127 (US6 Pagination enhancement)
   - **Developer B**: T056-T073 (EmployeeForm component), T011-T015 (ConfirmDialog if not done)
   - **Developer C**: Documentation, edge case planning
3. After US1 complete:
   - **Developer A**: T041-T055 (US2 Search)
   - **Developer B**: T074-T085 (US3 Create integration)
4. After EmployeeForm complete:
   - **Developer A**: T086-T100 (US4 Edit)
   - **Developer B**: T101-T115 (US5 Delete)
5. Merge and complete Phase 9-10 together

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- No testing infrastructure per constitution (no test files to create)
- Commit after each logical group of tasks or after each phase
- Stop at checkpoints to validate story independently
- TypeScript compilation should be checked continuously during development
- EmployeeForm component is designed for maximum reuse (create + edit modes)
- ConfirmDialog designed for reuse beyond just employee deletion

---

## Success Criteria Mapping

Each phase contributes to overall success criteria:

- **SC-001** (100% data accuracy): All phases contribute
- **SC-002** (Search < 1s): Phase 4 (debounced search)
- **SC-003** (Create < 30s): Phase 5 (form UX)
- **SC-004** (Edit immediate update): Phase 6 (instant table refresh)
- **SC-005** (Delete < 10s): Phase 7 (simple confirmation)
- **SC-006** (5 per page 100%): Phases 3, 8 (strict pagination)
- **SC-007** (100% validation): Phase 5-6 (comprehensive validation)
- **SC-008** (100% persist): All CRUD phases (localStorage)
- **SC-009** (Smooth modals): Phase 2, 5-7 (modal components)
- **SC-010** (Accurate search): Phase 4 (filtering logic)

**Total Tasks**: 185 tasks across 10 phases  
**Estimated Time**: 4-5 hours for single developer, 3-4 hours with parallelization
