---
description: "Task list for Department CRUD Management feature"
---

# Tasks: Department CRUD Management

**Input**: Design documents from `/specs/003-department-crud/`
**Prerequisites**: plan.md ✅, spec.md ✅, 001-initial-layout (complete) ✅, 002-employee-crud (complete) ✅

**Tests**: No testing required per project constitution

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5, US6)
- Include exact file paths in descriptions

## Path Conventions

Using Next.js 16 App Router structure:

- `app/` directory contains all routes and components
- `app/components/` for shared components (reusing from 002)
- `app/utils/` for utility functions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify existing infrastructure and prepare for department CRUD implementation

- [ ] T001 Verify Department and Employee interfaces exist in app/types.ts with required fields
- [ ] T002 Verify getDepartments(), addDepartment(), updateDepartment(), deleteDepartment() exist in app/utils/storage.ts
- [ ] T003 [P] Verify getEmployees() exists in app/utils/storage.ts for employee count calculation
- [ ] T004 [P] Verify Modal component exists in app/components/Modal.tsx from 002-employee-crud
- [ ] T005 [P] Verify Pagination component exists in app/components/Pagination.tsx from 002-employee-crud
- [ ] T006 [P] Verify ConfirmDialog component exists in app/components/ConfirmDialog.tsx from 002-employee-crud
- [ ] T007 Review app/employees/page.tsx structure for consistency patterns to follow

**Checkpoint**: Infrastructure verified and ready for CRUD implementation with maximum component reuse

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create DepartmentForm component - the ONLY new component needed

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 [P] [Foundation] Create DepartmentForm component skeleton in app/components/DepartmentForm.tsx
- [ ] T009 [Foundation] Define DepartmentForm props: initialData (optional), onSubmit, onCancel, existingDepartmentNames (for uniqueness)
- [ ] T010 [Foundation] Add form state in DepartmentForm: name, description, manager
- [ ] T011 [Foundation] Add validation errors state: nameError
- [ ] T012 [Foundation] Create controlled input for Name field with label and error display
- [ ] T013 [Foundation] Create controlled textarea for Description field with label (optional)
- [ ] T014 [Foundation] Create controlled input for Manager field with label (optional)
- [ ] T015 [Foundation] Implement validateName function: required, min 2 characters
- [ ] T016 [Foundation] Implement name uniqueness check: case-insensitive comparison against existingDepartmentNames
- [ ] T017 [Foundation] Add handleSubmit function that validates before calling onSubmit
- [ ] T018 [Foundation] Display inline error message below name field when validation fails
- [ ] T019 [Foundation] Add Submit button with appropriate text ("Create Department" or "Save Changes")
- [ ] T020 [Foundation] Add Cancel button that calls onCancel prop
- [ ] T021 [Foundation] Style form with Tailwind: proper spacing, labels, input styling (consistent with EmployeeForm)
- [ ] T022 [Foundation] Pre-fill form fields with initialData if provided (for edit mode)
- [ ] T023 [Foundation] Add 500 character limit to description textarea
- [ ] T024 [Foundation] Reset form state when initialData changes (for switching between create/edit)

**Checkpoint**: DepartmentForm component complete and ready for reuse in create/edit modals

---

## Phase 3: User Story 1 - View Department List (Priority: P1) 🎯 MVP

**Goal**: Transform departments page from placeholder to functional paginated table showing department data with employee count

**Independent Test**: Navigate to /departments, verify table displays with columns (ID, Name, Description, Manager, Employee Count, Actions) and shows max 5 departments per page with pagination controls

### Implementation for User Story 1

- [ ] T025 [P] [US1] Update app/departments/page.tsx to be a client component ('use client')
- [ ] T026 [US1] Import getDepartments and getEmployees from app/utils/storage.ts in departments page
- [ ] T027 [US1] Add state: departments (Department[]), employees (Employee[]), currentPage (number)
- [ ] T028 [US1] Set itemsPerPage constant to 5 in departments page
- [ ] T029 [US1] Add useEffect to load departments AND employees from localStorage on mount
- [ ] T030 [US1] Create employee count map using useMemo: departmentId → employee count
- [ ] T031 [US1] Calculate employee count for each department: employees.filter(emp => emp.departmentId === dept.id).length
- [ ] T032 [US1] Calculate startIndex and endIndex based on currentPage and itemsPerPage
- [ ] T033 [US1] Slice departments array to get paginatedDepartments for current page
- [ ] T034 [US1] Calculate totalPages = Math.ceil(departments.length / itemsPerPage)
- [ ] T035 [US1] Create table with columns: Department ID, Name, Description, Manager, Employee Count, Actions
- [ ] T036 [US1] Map over paginatedDepartments to render table rows
- [ ] T037 [US1] Display department.id in Department ID column
- [ ] T038 [US1] Display department.name in Name column
- [ ] T039 [US1] Display truncated description in Description column (max ~50 chars with ellipsis)
- [ ] T040 [US1] Add title attribute to description cell for full text on hover
- [ ] T041 [US1] Display department.manager in Manager column (show "-" if empty)
- [ ] T042 [US1] Display employee count from map in Employee Count column (right-aligned)
- [ ] T043 [US1] Add Actions column with placeholder for edit/delete icons
- [ ] T044 [US1] Style table with Tailwind: borders, alternating row colors, proper spacing (consistent with employees table)
- [ ] T045 [US1] Add empty state component when departments.length === 0
- [ ] T046 [US1] Empty state displays centered message with icon and helpful text
- [ ] T047 [US1] Import and add Pagination component below table (reused from 002)
- [ ] T048 [US1] Pass currentPage, totalPages, and onPageChange handler to Pagination
- [ ] T049 [US1] Implement onPageChange handler to update currentPage state
- [ ] T050 [US1] Conditionally render Pagination only when totalPages > 1
- [ ] T051 [US1] Add page title "Departments" as h1 at top of page
- [ ] T052 [US1] Ensure description truncation works with CSS or substring+ellipsis logic

**Checkpoint**: User Story 1 complete - Department table displaying with employee count and pagination working

---

## Phase 4: User Story 2 - Search for Departments (Priority: P1)

**Goal**: Add real-time search filtering for departments by name, description, or manager

**Independent Test**: Type in search input, verify table filters to show only matching departments and pagination resets to page 1

### Implementation for User Story 2

- [ ] T053 [P] [US2] Add searchQuery state (string) to app/departments/page.tsx
- [ ] T054 [US2] Create search input field with Tailwind styling at top left of page
- [ ] T055 [US2] Add placeholder text "Search departments..." in search input
- [ ] T056 [US2] Bind search input value to searchQuery state
- [ ] T057 [US2] Add onChange handler to update searchQuery (debounced 300ms)
- [ ] T058 [US2] Implement debounce logic using setTimeout and clearTimeout
- [ ] T059 [US2] Create filterDepartments function that filters by name, description, manager (case-insensitive)
- [ ] T060 [US2] Apply searchQuery filter before pagination: filteredDepartments = filterDepartments(departments, searchQuery)
- [ ] T061 [US2] Update pagination calculations to use filteredDepartments.length instead of departments.length
- [ ] T062 [US2] Update paginatedDepartments to slice from filteredDepartments instead of departments
- [ ] T063 [US2] Reset currentPage to 1 when searchQuery changes (useEffect dependency)
- [ ] T064 [US2] Display filtered count: "Showing X of Y departments" below search input
- [ ] T065 [US2] Update empty state to show "No departments match your search" when filtering results in 0
- [ ] T066 [US2] Ensure employee count still calculates correctly for filtered departments

**Checkpoint**: User Story 2 complete - Search filtering working with pagination and employee count

---

## Phase 5: User Story 3 - Create New Department (Priority: P2)

**Goal**: Implement create department functionality via modal form with validation

**Independent Test**: Click Create Department button, fill form, submit, verify modal closes and new department appears in table

### Implementation for User Story 3

- [ ] T067 [P] [US3] Add "Create Department" button at top right of app/departments/page.tsx
- [ ] T068 [US3] Add showCreateModal state (boolean) to departments page
- [ ] T069 [US3] Implement handleCreateClick to set showCreateModal to true
- [ ] T070 [US3] Import Modal component from app/components/Modal.tsx
- [ ] T071 [US3] Add Modal wrapper that shows when showCreateModal is true
- [ ] T072 [US3] Pass DepartmentForm component inside Modal with create mode (no initialData)
- [ ] T073 [US3] Create list of existing department names for uniqueness check
- [ ] T074 [US3] Normalize department names to lowercase for case-insensitive comparison
- [ ] T075 [US3] Pass existingDepartmentNames prop to DepartmentForm
- [ ] T076 [US3] Implement handleCreateSubmit: check name uniqueness (case-insensitive)
- [ ] T077 [US3] If name exists, show validation error in form and prevent submission
- [ ] T078 [US3] If valid, call addDepartment from storage utils with form data (and auto-generated ID)
- [ ] T079 [US3] Refresh departments list by calling getDepartments() after successful creation
- [ ] T080 [US3] Close modal by setting showCreateModal to false
- [ ] T081 [US3] Handle modal close on outside click by setting showCreateModal to false
- [ ] T082 [US3] Verify new department appears in table with employee count of 0
- [ ] T083 [US3] Ensure form resets properly for next use (via key prop or state reset)

**Checkpoint**: User Story 3 complete - Create department working with name uniqueness validation

---

## Phase 6: User Story 4 - Edit Department Details (Priority: P2)

**Goal**: Implement edit department functionality via modal form with pre-filled data

**Independent Test**: Click edit icon for a department, modify data in modal, save, verify table updates immediately

### Implementation for User Story 4

- [ ] T084 [P] [US4] Add edit icon (pencil SVG) to Actions column in table (consistent with employees page)
- [ ] T085 [US4] Add showEditModal state (boolean) to app/departments/page.tsx
- [ ] T086 [US4] Add selectedDepartment state (Department | null) to departments page
- [ ] T087 [US4] Implement handleEditClick(department: Department) to set selectedDepartment and showEditModal
- [ ] T088 [US4] Add Modal wrapper that shows when showEditModal is true
- [ ] T089 [US4] Pass DepartmentForm component inside edit Modal with initialData = selectedDepartment
- [ ] T090 [US4] Create list of existing department names excluding current department for uniqueness check
- [ ] T091 [US4] Implement handleEditSubmit: check name uniqueness (allow same name for same department, case-insensitive)
- [ ] T092 [US4] Create isNameUniqueForEdit function: filter departments excluding current department ID
- [ ] T093 [US4] If name exists for different department, show validation error
- [ ] T094 [US4] If valid, call updateDepartment from storage utils with department ID and updated data
- [ ] T095 [US4] Refresh departments list by calling getDepartments() after successful update
- [ ] T096 [US4] Close modal by setting showEditModal to false and selectedDepartment to null
- [ ] T097 [US4] Handle modal close on outside click or cancel button
- [ ] T098 [US4] Style edit icon with blue color and hover effect in Actions column
- [ ] T099 [US4] Position edit icon before delete icon in Actions column
- [ ] T100 [US4] Verify employee count remains accurate after edit (read-only data)

**Checkpoint**: User Story 4 complete - Edit department working with pre-filled data and uniqueness validation

---

## Phase 7: User Story 5 - Delete Department (Priority: P3)

**Goal**: Implement delete functionality with confirmation modal and validation to prevent deleting departments with employees

**Independent Test**: Click delete icon, verify confirmation modal for departments with no employees and error message for departments with employees

### Implementation for User Story 5

- [ ] T101 [P] [US5] Add delete icon (trash SVG) to Actions column in table (consistent with employees page)
- [ ] T102 [US5] Add showDeleteModal state (boolean) to app/departments/page.tsx
- [ ] T103 [US5] Add departmentToDelete state (Department | null) to departments page
- [ ] T104 [US5] Add deleteError state (string) for displaying employee count error
- [ ] T105 [US5] Implement handleDeleteClick(department: Department) to check employee count first
- [ ] T106 [US5] Get employee count for selected department from employeeCountMap
- [ ] T107 [US5] If employeeCount > 0, set deleteError message and do NOT open modal
- [ ] T108 [US5] Error message: "Cannot delete department with X assigned employee(s). Please reassign or remove employees first."
- [ ] T109 [US5] If employeeCount === 0, clear deleteError and set departmentToDelete + showDeleteModal
- [ ] T110 [US5] Import ConfirmDialog component from app/components/ConfirmDialog.tsx
- [ ] T111 [US5] Add ConfirmDialog that shows when showDeleteModal is true
- [ ] T112 [US5] Pass title: "Delete Department" to ConfirmDialog
- [ ] T113 [US5] Pass message: "Are you sure you want to delete [department.name]?" to ConfirmDialog
- [ ] T114 [US5] Implement handleConfirmDelete: call deleteDepartment from storage utils with department ID
- [ ] T115 [US5] Refresh departments list by calling getDepartments() after successful deletion
- [ ] T116 [US5] Check if current page is now empty after deletion
- [ ] T117 [US5] If current page empty and not page 1, navigate to previous page (currentPage - 1)
- [ ] T118 [US5] Close modal by setting showDeleteModal to false and departmentToDelete to null
- [ ] T119 [US5] Implement handleCancelDelete to close modal without deletion
- [ ] T120 [US5] Style delete icon with red color and hover effect in Actions column
- [ ] T121 [US5] Position delete icon after edit icon in Actions column
- [ ] T122 [US5] Display deleteError message near delete button or in a toast/alert if set
- [ ] T123 [US5] Clear deleteError when user clicks to try delete again or after timeout
- [ ] T124 [US5] Consider visual indicator (disabled/grayed delete icon) if department has employees

**Checkpoint**: User Story 5 complete - Delete department working with employee validation and confirmation

---

## Phase 8: User Story 6 - Navigate Paginated Results (Priority: P3)

**Goal**: Verify pagination works correctly (already implemented via component reuse from 002)

**Independent Test**: Verify page numbers appear, clicking numbers navigates to that page, works with departments

### Implementation for User Story 6

- [ ] T125 [P] [US6] Verify Pagination component works correctly with department data
- [ ] T126 [US6] Test pagination with 0 departments: verify no pagination shows
- [ ] T127 [US6] Test pagination with exactly 5 departments: verify no pagination shows
- [ ] T128 [US6] Test pagination with 6 departments: verify 2 pages display
- [ ] T129 [US6] Test pagination with 50+ departments: verify page numbers with ellipsis work
- [ ] T130 [US6] Verify Previous button disabled on page 1
- [ ] T131 [US6] Verify Next button disabled on last page
- [ ] T132 [US6] Verify current page highlighted correctly
- [ ] T133 [US6] Verify pagination works correctly with search results
- [ ] T134 [US6] Verify pagination resets to page 1 when search query changes

**Checkpoint**: User Story 6 complete - Pagination verified working with departments (no code changes needed)

---

## Phase 9: Edge Cases & Polish (Priority: P3)

**Purpose**: Handle edge cases, final validation, and polish user experience

- [ ] T135 Test department name uniqueness validation: create with duplicate name (case-insensitive) shows error
- [ ] T136 Test department name uniqueness in edit: allow same name for same department
- [ ] T137 Test department name uniqueness case variations: "Engineering" vs "engineering" vs "ENGINEERING"
- [ ] T138 Test delete prevention: departments with 1+ employees cannot be deleted
- [ ] T139 Test delete allowed: departments with 0 employees can be deleted
- [ ] T140 Test very long department names: verify display in table (no truncation needed for name)
- [ ] T141 Test very long descriptions: verify truncation with ellipsis in table (~50 chars)
- [ ] T142 Test very long descriptions in form: verify 500 char limit enforced
- [ ] T143 Test empty manager field: verify "-" displays in table when manager is empty
- [ ] T144 Test description hover: verify full text shows via title attribute
- [ ] T145 Test deleting last department on page 2+: verify navigation to previous page
- [ ] T146 Test searching while on page 3: verify reset to page 1 with search results
- [ ] T147 Test clearing search: verify return to page 1 or original state
- [ ] T148 Test with 0 departments: verify empty state displays correctly
- [ ] T149 Test employee count accuracy: create employees, verify counts update correctly
- [ ] T150 Test employee count with deleted departments: verify orphaned employees show "Unknown" in employee page
- [ ] T151 Verify modal closes when clicking outside modal content
- [ ] T152 Test form reset after successful create: verify form clears for next use
- [ ] T153 Test cancel button in forms: verify no data saved and modal closes
- [ ] T154 Add focus management: auto-focus first input (name) when modal opens
- [ ] T155 Verify localStorage persistence: refresh page and verify data persists
- [ ] T156 Test search with special characters in department names: verify proper filtering
- [ ] T157 Test creating department with empty description: verify optional field works
- [ ] T158 Test creating department with empty manager: verify optional field works
- [ ] T159 Test description textarea resize: verify proper display and UX
- [ ] T160 Verify all icons consistent with employees page (same edit/delete icons)

**Checkpoint**: All edge cases handled, user experience polished and consistent with employees feature

---

## Phase 10: Final Validation (Priority: P3)

**Purpose**: Comprehensive validation of all functional requirements and success criteria

- [ ] T161 Verify FR-001: Search input at top left ✓
- [ ] T162 Verify FR-002: Create Department button at top right ✓
- [ ] T163 Verify FR-003: Create button opens modal ✓
- [ ] T164 Verify FR-004: Modal has Name, Description, Manager fields ✓
- [ ] T165 Verify FR-005: Modal has Create Department submit button ✓
- [ ] T166 Verify FR-006: Name is required ✓
- [ ] T167 Verify FR-007: Name uniqueness enforced (case-insensitive) ✓
- [ ] T168 Verify FR-008: Description and Manager are optional ✓
- [ ] T169 Verify FR-009: Successful create closes modal and refreshes table ✓
- [ ] T170 Verify FR-010: Table has all required columns (ID, Name, Description, Manager, Employee Count, Actions) ✓
- [ ] T171 Verify FR-011: Table displays max 5 rows per page ✓
- [ ] T172 Verify FR-012: Pagination shows when > 5 departments ✓
- [ ] T173 Verify FR-013: Actions column has edit and delete icons ✓
- [ ] T174 Verify FR-014: Edit icon opens modal with pre-filled data ✓
- [ ] T175 Verify FR-015: Edit modal allows modification of all fields ✓
- [ ] T176 Verify FR-016: Save updates localStorage and closes modal ✓
- [ ] T177 Verify FR-017: Delete icon opens confirmation modal ✓
- [ ] T178 Verify FR-018: Confirmation shows department name ✓
- [ ] T179 Verify FR-019: Cannot delete departments with employees (100% enforcement) ✓
- [ ] T180 Verify FR-020: Confirm deletes department with no employees ✓
- [ ] T181 Verify FR-021: Cancel closes modal without deletion ✓
- [ ] T182 Verify FR-022: Search filters in real-time ✓
- [ ] T183 Verify FR-023: Search matches name, description, manager ✓
- [ ] T184 Verify FR-024: Search results paginated ✓
- [ ] T185 Verify FR-025: Clearing search restores full list ✓
- [ ] T186 Verify FR-026: Pagination shows current/total pages ✓
- [ ] T187 Verify FR-027: Pagination has Previous, Next, page numbers ✓
- [ ] T188 Verify FR-028: Department ID auto-generated ✓
- [ ] T189 Verify FR-029: Employee Count displays correctly ✓
- [ ] T190 Verify FR-030: Data persists in localStorage ✓
- [ ] T191 Verify FR-031: Modals close on outside click ✓
- [ ] T192 Verify FR-032: Empty state displays correctly ✓
- [ ] T193 Verify FR-033: Description truncates in table with ellipsis ✓
- [ ] T194 Verify FR-034: Full description shows on hover ✓
- [ ] T195 Run TypeScript compilation: verify no errors
- [ ] T196 Check browser console: verify no errors or warnings
- [ ] T197 Test in Chrome, Firefox, Safari: verify cross-browser compatibility
- [ ] T198 Verify styling consistent with employees page and app theme
- [ ] T199 Verify all Success Criteria (SC-001 through SC-012) met
- [ ] T200 Final review: compare departments page with employees page for consistency

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
  - US4 (Phase 6): Depends on US3 (reuses DepartmentForm component)
  - US5 (Phase 7): Depends on US1 (adds to actions column, needs employeeCountMap)
  - US6 (Phase 8): Verification only - depends on US1 (uses existing Pagination)
- **Edge Cases (Phase 9)**: Depends on all user stories being complete
- **Validation (Phase 10)**: Depends on everything being complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundation → Can start immediately
- **User Story 2 (P1)**: US1 complete → Modifies same page with search
- **User Story 3 (P2)**: US1 complete → Needs table to display created departments
- **User Story 4 (P2)**: US1 + US3 complete → Reuses DepartmentForm from US3
- **User Story 5 (P3)**: US1 complete → Needs employeeCountMap for validation
- **User Story 6 (P3)**: US1 complete → Verification only (Pagination already exists)

### Within Each Phase

**Phase 2 (Foundational)**:

- T008-T024 (DepartmentForm): Sequential - single component creation

**Phase 3 (User Story 1)**:

- T025-T052: Mostly sequential, some styling tasks can be parallel

**Phase 5 (User Story 3)**:

- T067-T083: Sequential integration with DepartmentForm

### Parallel Opportunities

```bash
# Phase 1: Setup - all can run in parallel (verification tasks)
T001, T002, T003, T004, T005, T006, T007

# Phase 2: Foundational - single component (sequential)
T008-T024: DepartmentForm component (sequential)

# Phase 5: US3 - partial parallelization
T067-T069: Create Button preparation
T070-T083: Integration (sequential after button)

# Phase 9: Edge cases - many can run in parallel (testing)
T135-T160: Most edge case tests can run in parallel
```

---

## Implementation Strategy

### Recommended Execution Order (Sequential - Single Developer)

1. ✅ Complete Phase 1: Setup (T001-T007) - verify infrastructure and component reuse
2. ✅ Complete Phase 2: Foundational (T008-T024) - Create DepartmentForm component
3. ✅ Complete Phase 3: User Story 1 (T025-T052) - MVP table view with employee count
   - **STOP and TEST**: Verify table displays with pagination and employee count
4. ✅ Complete Phase 4: User Story 2 (T053-T066) - Search functionality
   - **STOP and TEST**: Verify search filters correctly
5. ✅ Complete Phase 5: User Story 3 (T067-T083) - Create department
   - **STOP and TEST**: Verify create modal works with uniqueness validation
6. ✅ Complete Phase 6: User Story 4 (T084-T100) - Edit department
   - **STOP and TEST**: Verify edit modal works
7. ✅ Complete Phase 7: User Story 5 (T101-T124) - Delete department with validation
   - **STOP and TEST**: Verify delete confirmation and employee validation works
8. ✅ Complete Phase 8: User Story 6 (T125-T134) - Verify pagination
   - **STOP and TEST**: Verify pagination works with departments
9. ✅ Complete Phase 9: Edge Cases (T135-T160)
10. ✅ Complete Phase 10: Final Validation (T161-T200)

### Alternative: Parallel Development Strategy

If 2 developers available:

1. **Both developers**: Phase 1 + Phase 2 (foundation)
2. Once Phase 2 complete, split work:
   - **Developer A**: T025-T052 (US1 Table with employee count)
   - **Developer B**: Documentation review, edge case planning
3. After US1 complete:
   - **Developer A**: T053-T066 (US2 Search)
   - **Developer B**: T067-T083 (US3 Create integration)
4. After DepartmentForm proven:
   - **Developer A**: T084-T100 (US4 Edit)
   - **Developer B**: T101-T124 (US5 Delete)
5. Merge and complete Phase 8-10 together

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- No testing infrastructure per constitution (no test files to create)
- Maximum component reuse: Modal, Pagination, ConfirmDialog from 002-employee-crud
- Only 1 new component: DepartmentForm (similar structure to EmployeeForm)
- Commit after each logical group of tasks or after each phase
- Stop at checkpoints to validate story independently
- TypeScript compilation should be checked continuously during development
- DepartmentForm designed for maximum reuse (create + edit modes)
- Employee count calculation must use useMemo for performance
- Description truncation critical for UX (table readability)
- Delete validation (employee check) is unique to departments - must be thorough

---

## Success Criteria Mapping

Each phase contributes to overall success criteria:

- **SC-001** (100% data accuracy): All phases contribute
- **SC-002** (Employee count accurate): Phase 3 (useMemo calculation)
- **SC-003** (Search < 1s): Phase 4 (debounced search)
- **SC-004** (Create < 30s): Phase 5 (form UX)
- **SC-005** (Edit immediate update): Phase 6 (instant table refresh)
- **SC-006** (Delete with validation): Phase 7 (employee check)
- **SC-007** (Cannot delete with employees): Phase 7 (100% validation)
- **SC-008** (5 per page 100%): Phases 3, 8 (strict pagination)
- **SC-009** (100% validation): Phase 5-6 (name uniqueness)
- **SC-010** (Name uniqueness 100%): Phase 5-6 (case-insensitive)
- **SC-011** (Smooth modals): Phase 2, 5-7 (reused modal components)
- **SC-012** (Accurate search): Phase 4 (filtering logic)

**Total Tasks**: 200 tasks across 10 phases  
**Estimated Time**: 3.5-4.5 hours for single developer, 3-3.5 hours with parallelization (faster than employees due to component reuse)

---

## Component Reuse Summary

**Reused from 002-employee-crud** (no changes needed):

- ✅ Modal.tsx - All modals (create, edit, delete confirmation)
- ✅ Pagination.tsx - Table pagination with page numbers
- ✅ ConfirmDialog.tsx - Delete confirmation dialog

**New for 003-department-crud**:

- ⭐ DepartmentForm.tsx - Form component for create/edit (only new component)

**Pattern Consistency**:

- Follow exact same page structure as app/employees/page.tsx
- Use same table styling patterns
- Use same icon styling (edit/delete)
- Use same search input patterns
- Use same empty state patterns

This maximizes code reuse and ensures visual/UX consistency across the application.
