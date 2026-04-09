# Implementation Plan: Department CRUD Management

**Branch**: `003-department-crud` | **Date**: 2026-04-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-department-crud/spec.md`

## Summary

Implement a complete CRUD interface for department management with search, pagination, and modal-based forms. The page features a search input (top left) and create button (top right), a paginated table displaying 5 departments per page with columns for ID, Name, Description, Manager, Employee Count, and Actions (edit/delete icons). Create and Edit operations use modal forms with validation for Name (required, unique), Description (textarea, optional), and Manager (optional). Delete operations require confirmation via modal with additional validation to prevent deletion of departments with assigned employees. All data persists to localStorage with real-time search filtering and pagination controls. Employee count is calculated dynamically from employee records.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16  
**Primary Dependencies**:

- next@16.x (App Router)
- react@19.x
- react-modal (already installed)
- tailwindcss@4.x
- Reusing components from 002-employee-crud (Modal, Pagination, ConfirmDialog)

**Storage**: Browser localStorage (JSON format) - using existing storage utilities  
**Testing**: None (per constitution - testing explicitly excluded)  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - last 2 versions)  
**Project Type**: Web application (Single Page Application)  
**Performance Goals**:

- Search filtering < 1 second response time
- Modal open/close < 100ms
- Table render with pagination < 500ms
- Employee count calculation < 200ms
- Real-time search as user types (debounced 300ms)

**Constraints**:

- Table limited to 5 rows per page (strict pagination)
- Maximum component reuse (Modal, Pagination, ConfirmDialog from employee feature)
- All styling via Tailwind utility classes only
- No external form libraries
- Department name must be unique (case-insensitive)
- Cannot delete departments with assigned employees
- Modal-based workflow (no inline editing)
- Description truncated in table with ellipsis (~50 chars)

**Scale/Scope**:

- 1 main page component (app/departments/page.tsx - modify existing placeholder)
- 1 form component (DepartmentForm - reusable for create/edit)
- Reuse 3 existing components (Modal, Pagination, ConfirmDialog)
- Support for hundreds of departments with efficient filtering
- 6 user stories (2 P1, 2 P2, 2 P3)

## Constitution Check

_GATE: Must pass before implementation._

✅ **Component Reusability**: Modal, Pagination, ConfirmDialog components reused from 002-employee-crud; DepartmentForm designed for reuse between create/edit  
✅ **Local Storage First**: All department data persisted in localStorage using existing utilities from app/utils/storage.ts  
✅ **Next.js 16 & TypeScript**: All code uses Next.js 16 App Router with TypeScript strict mode  
✅ **Tailwind CSS Styling**: All styling via Tailwind utility classes, consistent with app theme  
✅ **Simplicity & Speed**: Minimal new components (1 new: DepartmentForm), maximum reuse from employee feature, no testing, no external form libraries

**No violations** - This implementation fully aligns with constitution principles and maximizes reuse from 002-employee-crud.

## Project Structure

### Documentation (this feature)

```text
specs/003-department-crud/
├── plan.md              # This file - implementation plan
└── spec.md              # Feature specification
```

### Source Code (repository root)

```text
app/
├── departments/
│   └── page.tsx         # Complete department CRUD page (MODIFY - currently placeholder)
├── components/
│   ├── Sidebar.tsx      # Existing sidebar (NO CHANGE)
│   ├── Modal.tsx        # Existing from 002 (REUSE - no changes needed)
│   ├── Pagination.tsx   # Existing from 002 (REUSE - no changes needed)
│   ├── ConfirmDialog.tsx # Existing from 002 (REUSE - no changes needed)
│   └── DepartmentForm.tsx # Department form fields (NEW - reused in create/edit modals)
├── utils/
│   └── storage.ts       # Existing localStorage utilities (VERIFY - department helpers should exist)
└── types.ts             # Existing type definitions (VERIFY Department interface)

public/                  # Static assets (EXISTING - no changes)
```

**Structure Decision**: Building on infrastructure from 001-initial-layout and maximizing reuse from 002-employee-crud. The departments/page.tsx will transform from placeholder to full CRUD page following the same patterns as employees page. We're reusing Modal, Pagination, and ConfirmDialog components directly with no modifications. Only creating DepartmentForm component (single new component), which follows the same pattern as EmployeeForm.

## Complexity Tracking

> **No violations - this section intentionally empty**

The implementation follows all constitution principles. Component count is minimized through aggressive reuse from employee feature, and all functionality is essential for the CRUD requirements.

## Implementation Phases

### Phase 0: Preparation ✅ (Already Completed)

- [x] Specification written
- [x] Git branch created (003-department-crud)
- [x] Existing infrastructure from 001 (layout, sidebar, storage utilities)
- [x] Existing components from 002 (Modal, Pagination, ConfirmDialog)
- [x] Department type interface exists in app/types.ts
- [x] Department storage functions exist in app/utils/storage.ts

### Phase 1: Core Table & Data Display (Priority: P1 - User Story 1)

**Goal**: Transform departments page from placeholder to functional paginated table showing department data with employee count.

**Files to Create/Modify**:

1. `app/departments/page.tsx` - Complete rewrite with table and state management
2. `app/utils/storage.ts` - Verify department CRUD functions exist and add helper for employee count if needed

**Implementation Details**:

**Departments Page** (`app/departments/page.tsx`):

- Client component ('use client')
- State: departments array, employees array, currentPage, itemsPerPage (constant 5), searchQuery
- useEffect to load departments AND employees from localStorage on mount
- Function to calculate employee count per department: count employees where departmentId matches
- Calculate paginated data: slice departments array based on currentPage
- Display department table with columns: ID, Name, Description, Manager, Employee Count, Actions
- Description truncated with ellipsis if > 50 characters (use CSS or substring)
- Empty state when no departments: centered message with icon
- Reuse Pagination component from 002 (only show if > 5 departments)
- Actions column with placeholder icons (edit/delete) - icons visible but not functional yet

**Employee Count Calculation**:

- Create Map or function: departmentId → employee count
- Use useMemo to optimize calculation
- Count = employees.filter(emp => emp.departmentId === dept.id).length
- Display "0" if no employees

**Acceptance Criteria**:

- Table displays with correct columns
- Maximum 5 departments per page
- Pagination controls appear when > 5 departments (reused component)
- Empty state shows when 0 departments
- Employee count calculates correctly for each department
- Description truncates with ellipsis if too long
- Styling consistent with employees page and overall app theme

### Phase 2: Search Functionality (Priority: P1 - User Story 2)

**Goal**: Add real-time search filtering for departments by name, description, or manager.

**Files to Modify**:

1. `app/departments/page.tsx` - Add search input and filtering logic

**Implementation Details**:

**Search Implementation**:

- Add search input at top left of page (same position as employees page)
- State: searchQuery (string)
- Filter logic: case-insensitive match on name, description, or manager
- Filtered results = departments.filter(matches searchQuery)
- Pagination calculated from filtered results, not all departments
- Search resets currentPage to 1 when query changes
- Debounce search input (300ms) for performance (use setTimeout/clearTimeout)
- Show count of filtered results

**UI Layout**:

- Top bar with search input (left) and create button placeholder (right)
- Search input with search icon and placeholder "Search departments..."
- Show "X of Y departments" below search (filtered vs total)
- Exact same layout pattern as employees page for consistency

**Acceptance Criteria**:

- Search filters in real-time as user types
- Matches against name, description, manager (case-insensitive)
- Empty state when no search results
- Pagination updates to reflect filtered count
- Clearing search restores full list
- Search resets to page 1
- Employee count still accurate for filtered departments

### Phase 3: Create Department Modal (Priority: P2 - User Story 3)

**Goal**: Implement create department functionality via modal form.

**Files to Create/Modify**:

1. `app/components/DepartmentForm.tsx` - Reusable form component
2. `app/departments/page.tsx` - Add create modal state and integration

**Implementation Details**:

**DepartmentForm Component** (`app/components/DepartmentForm.tsx`):

- Props: initialData (optional - for edit mode), onSubmit, onCancel, existingDepartmentNames (for uniqueness check)
- Fields: Name (text, required), Description (textarea, optional), Manager (text, optional)
- Client-side validation:
  - Name required, min 2 chars
  - Name unique check (case-insensitive) - exclude current department in edit mode
  - Description optional, max 500 chars
  - Manager optional
- Display validation errors inline below each field
- Form state managed internally
- Submit handler calls onSubmit with validated data
- Reset form on successful submit or cancel
- Similar structure to EmployeeForm but simpler (only 3 fields)

**Departments Page Updates**:

- Add "Create Department" button at top right
- State: showCreateModal (boolean), formErrors
- Click handler opens modal
- onSubmit: validates name uniqueness, calls addDepartment from storage utils, refreshes department list, closes modal
- Reuse existing Modal component as wrapper (from 002)
- Show success feedback (new department appears in table)

**Acceptance Criteria**:

- Button opens modal with form
- Form shows all fields (name required, description/manager optional)
- Validation prevents invalid submissions
- Name uniqueness enforced (case-insensitive)
- Successful creation closes modal and adds department to table
- Department appears on correct page
- Form resets for next use
- Description textarea properly sized and accepts multiline input

### Phase 4: Edit Department Modal (Priority: P2 - User Story 4)

**Goal**: Implement edit department functionality via modal form.

**Files to Modify**:

1. `app/departments/page.tsx` - Add edit modal state and integration

**Implementation Details**:

**Departments Page Updates**:

- Add edit icon buttons in Actions column (same pencil/edit icon as employees)
- State: showEditModal (boolean), selectedDepartment (Department | null)
- Click handler opens modal with selected department data
- Reuse DepartmentForm component with initialData = selectedDepartment
- onSubmit: validates name uniqueness (allow same name for same department), calls updateDepartment from storage utils, refreshes list, closes modal
- Pre-fill form with current department data

**Edit Icon Styling**:

- Blue pencil/edit icon in Actions column (consistent with employees page)
- Hover effect
- Positioned before delete icon

**Acceptance Criteria**:

- Edit icon click opens modal with pre-filled data
- Form allows modification of all fields
- Name uniqueness enforced (except for same department, case-insensitive)
- Successful edit updates table immediately
- Modal closes on save
- Changes persist to localStorage
- Employee count unaffected by edits (read-only)

### Phase 5: Delete Department with Confirmation (Priority: P3 - User Story 5)

**Goal**: Implement delete functionality with confirmation modal and validation to prevent deleting departments with employees.

**Files to Modify**:

1. `app/departments/page.tsx` - Add delete integration with employee validation

**Implementation Details**:

**Departments Page Updates**:

- Add delete icon buttons in Actions column (trash icon, consistent with employees page)
- State: showDeleteModal (boolean), departmentToDelete (Department | null)
- Click handler:
  - Check if department has employees (count > 0)
  - If has employees, show error message in ConfirmDialog or separate alert
  - If no employees, open confirmation modal with department name
- Reuse ConfirmDialog component from 002
- Confirmation message: "Are you sure you want to delete [Department Name]?"
- Error message for departments with employees: "Cannot delete department with X assigned employee(s). Please reassign or remove employees first."
- onConfirm: calls deleteDepartment from storage utils, refreshes list, closes modal
- If deleting last department on a page, navigate to previous page

**Delete Icon Styling**:

- Red trash icon in Actions column (consistent with employees page)
- Hover effect
- Positioned after edit icon
- Maybe disable/gray out if department has employees (visual indicator)

**Employee Check Logic**:

- Before showing delete confirmation, count employees for that department
- if (employeeCount > 0) → show error, don't allow deletion
- else → show confirmation, allow deletion

**Acceptance Criteria**:

- Delete icon opens confirmation modal if department has no employees
- Delete icon shows error message if department has employees
- Modal shows department name
- Confirming removes department from localStorage
- Table updates immediately
- Pagination adjusts if needed (last department on page)
- Cancelling closes modal without deletion
- Error message clearly explains why deletion blocked
- Departments with employees cannot be deleted (100% enforcement)

### Phase 6: Pagination Navigation (Priority: P3 - User Story 6)

**Goal**: Verify pagination works correctly (already implemented via component reuse).

**Files to Verify**:

1. `app/components/Pagination.tsx` - Already exists from 002, should work as-is
2. `app/departments/page.tsx` - Ensure correct integration

**Implementation Details**:

**Verification Tasks**:

- Pagination component already has full navigation (page numbers, prev/next, ellipsis)
- Verify it works with department data
- Ensure currentPage state updates correctly
- Test with departments (0, 1, 5, 6, 50 departments)
- Verify pagination works with search results

**No new code needed** - this phase is verification only since we're reusing the fully-featured Pagination component from 002-employee-crud.

**Acceptance Criteria**:

- Click page numbers navigates to that page
- Previous/next buttons work correctly
- Buttons disabled appropriately
- Page numbers show ellipsis for long lists
- Works with both full department list and search results
- Consistent behavior with employees page

### Phase 7: Polish & Validation

**Goal**: Final touches, edge cases, and validation.

**Tasks**:

1. Verify all functional requirements (FR-001 through FR-034)
2. Test all user stories end-to-end
3. Handle edge cases:
   - Duplicate department name validation (case-insensitive)
   - Empty state messaging (no departments)
   - Long description truncation in table
   - Tooltip or title attribute for full description on hover
   - Pagination edge cases (delete last on page)
   - Search with special characters
   - Trying to delete department with employees
   - Manager field validation (optional but reasonable length)
4. Ensure modal close on outside click works (inherited from Modal component)
5. Test with 0, 1, 5, 6, 50 departments
6. Verify employee count accuracy in all scenarios
7. Empty states polished with good messaging
8. Icons consistent with employees page
9. Description textarea in form has proper sizing and character limit
10. Verify all styling matches employees page patterns

**Acceptance Criteria**:

- All 34 functional requirements met
- All 6 user stories work independently
- No TypeScript errors
- No console errors or warnings
- Department name uniqueness works 100% (case-insensitive)
- Departments with employees cannot be deleted (100%)
- Employee count accurate in 100% of cases
- Pagination accurate in all scenarios
- Search performs well with debounce
- Modals animate smoothly (inherited from reused components)
- Consistent styling with employees page and overall app
- Description truncation works correctly

## Risk Assessment

**Low Risk**:

- Building on proven foundation from 001 and 002
- Standard CRUD patterns (identical to employees)
- Maximum component reuse reduces risk
- localStorage well-tested
- Modal, Pagination, ConfirmDialog components already proven

**Moderate Risk**:

1. **Department name uniqueness validation**: Must check case-insensitive across all departments
   - _Mitigation_: Normalize names to lowercase for comparison, test thoroughly
2. **Employee count calculation**: Must be accurate and performant
   - _Mitigation_: Use useMemo for calculation, verify count logic
3. **Delete prevention logic**: Must always check for employees before allowing delete
   - _Mitigation_: Double-check on delete handler, clear error messaging
4. **Description truncation**: Must handle various lengths gracefully
   - _Mitigation_: Use CSS ellipsis, test with very long descriptions

**Potential Issues**:

1. **No employees exist yet**: Employee count will be 0 for all departments
   - _Mitigation_: This is expected state, ensure 0 displays correctly
2. **Deleted department referenced by employees**: Employees might reference non-existent departments
   - _Mitigation_: Already handled in employee page (shows "Unknown"), document this behavior
3. **Very long manager names or descriptions**: Could break table layout
   - _Mitigation_: Truncate description in table, use appropriate column widths

## Success Metrics

- ✅ Users can view paginated department list with 100% data accuracy
- ✅ Employee count displayed accurately for each department
- ✅ Search returns results < 1 second for queries
- ✅ Create department form completed in < 30 seconds
- ✅ Edit department updates visible immediately
- ✅ Delete confirmation prevents accidental deletions
- ✅ Departments with employees cannot be deleted (100% enforcement)
- ✅ Pagination displays exactly 5 departments per page
- ✅ Form validation prevents 100% of invalid entries
- ✅ Department name uniqueness enforced 100% of the time
- ✅ All CRUD operations persist successfully

## Dependencies & Prerequisites

**External**:

- Next.js 16 ✅
- Tailwind CSS ✅
- TypeScript ✅
- react-modal ✅ (installed in 002)

**Internal**:

- Feature 001-initial-layout complete ✅
  - Sidebar layout
  - Storage utilities
  - Department and Employee types
- Feature 002-employee-crud complete ✅
  - Modal component
  - Pagination component
  - ConfirmDialog component
  - Employee data in localStorage (for employee count)

**Blocked On**: Nothing - ready to implement

## Notes for Implementation

1. **Component Reuse Strategy**:
   - Modal from 002 for all modals (Create, Edit, Delete confirmation) ✅
   - Pagination from 002 for table pagination ✅
   - ConfirmDialog from 002 for delete confirmation ✅
   - DepartmentForm new but follows EmployeeForm pattern
   - Maximum reuse = faster implementation + consistency

2. **State Management**:
   - All state in departments/page.tsx (useState hooks)
   - Load both departments AND employees on mount (need employees for count)
   - No global state needed
   - Refresh department list by calling getDepartments() after mutations

3. **Validation Approach**:
   - Client-side only (no server)
   - Name uniqueness: filter departments array, normalize to lowercase
   - Required fields: check before allowing submit
   - Employee count for delete: filter employees array

4. **Table Styling**:
   - Follow exact same pattern as employees table
   - Description column: CSS ellipsis for truncation
   - Fixed column widths to prevent layout shift
   - Actions column fixed width, right-aligned
   - Employee Count column right-aligned (numeric data)

5. **Icons**:
   - Same icons as employees page (edit/delete)
   - Consistent styling and hover effects
   - Use same approach (Unicode or Tailwind/Heroicons)

6. **Employee Count Calculation**:

   ```typescript
   const employeeCountMap = useMemo(() => {
     const map = new Map<string, number>();
     departments.forEach((dept) => {
       const count = employees.filter(
         (emp) => emp.departmentId === dept.id,
       ).length;
       map.set(dept.id, count);
     });
     return map;
   }, [departments, employees]);
   ```

7. **Delete Validation**:

   ```typescript
   const handleDeleteClick = (dept: Department) => {
     const employeeCount = employeeCountMap.get(dept.id) || 0;
     if (employeeCount > 0) {
       // Show error - cannot delete
       setErrorMessage(
         `Cannot delete department with ${employeeCount} employee(s)`,
       );
     } else {
       // Open confirmation modal
       setDepartmentToDelete(dept);
       setShowDeleteModal(true);
     }
   };
   ```

8. **Description Truncation**:
   - In table: CSS `truncate` or `line-clamp` utility
   - Or substring in render: `description.substring(0, 50) + '...'`
   - Full text on hover: use `title` attribute or Tailwind tooltip

9. **Performance Considerations**:
   - Debounce search input (300ms) - same as employees
   - useMemo for employee count calculation
   - useMemo for filtered/paginated results
   - Pagination prevents rendering large lists

## Timeline Estimate

- Phase 1: 40-50 minutes (Core table with employee count calculation)
- Phase 2: 25-30 minutes (Search functionality - reuse pattern from 002)
- Phase 3: 40-50 minutes (Create modal - simpler than employee form)
- Phase 4: 25-30 minutes (Edit modal - reuses create component)
- Phase 5: 35-45 minutes (Delete with employee validation)
- Phase 6: 10-15 minutes (Verify pagination - already working)
- Phase 7: 30-40 minutes (Polish, testing, edge cases)

**Total**: 3.5-4.5 hours (faster than employees due to component reuse)

## Next Steps

1. ✅ Plan approved
2. → Move to task breakdown (create tasks.md)
3. → Begin Phase 1 implementation (Core table with employee count)
4. → Progress through phases sequentially (P1 → P2 → P3)
5. → Validate against spec after each phase
6. → Full validation before marking complete
7. → Commit and merge to main after all validation passes
