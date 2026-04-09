# Implementation Plan: Employee CRUD Management

**Branch**: `002-employee-crud` | **Date**: 2026-04-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-employee-crud/spec.md`

## Summary

Implement a complete CRUD interface for employee management with search, pagination, and modal-based forms. The page features a search input (top left) and create button (top right), a paginated table displaying 5 employees per page with columns for ID, Name, Email, Contact, Department, and Actions (edit/delete icons). Create and Edit operations use modal forms with validation for Name, Department select, Email, and Phone. Delete operations require confirmation via modal. All data persists to localStorage with real-time search filtering and pagination controls.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16  
**Primary Dependencies**:

- next@16.x (App Router)
- react@19.x
- tailwindcss@4.x
- Reusing existing components from 001-initial-layout (Modal, DataTable if applicable)

**Storage**: Browser localStorage (JSON format) - building on existing storage utilities  
**Testing**: None (per constitution - testing explicitly excluded)  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - last 2 versions)  
**Project Type**: Web application (Single Page Application)  
**Performance Goals**:

- Search filtering < 1 second response time
- Modal open/close < 100ms
- Table render with pagination < 500ms
- Real-time search as user types (debounced 300ms)

**Constraints**:

- Table limited to 5 rows per page (strict pagination)
- Component reuse maximized (per constitution)
- All styling via Tailwind utility classes only
- No external form libraries
- Email must be unique across all employees
- Modal-based workflow (no inline editing)

**Scale/Scope**:

- 1 main page component (app/employees/page.tsx - modify existing)
- 3 modal components (EmployeeFormModal, DeleteConfirmModal - may reuse generic Modal)
- 1 pagination component (reusable)
- Support for hundreds of employees with efficient filtering
- 6 user stories (2 P1, 2 P2, 2 P3)

## Constitution Check

_GATE: Must pass before implementation._

✅ **Component Reusability**: Modal component from 001 can be reused; EmployeeForm extracted for reuse between create/edit; Pagination component designed for reuse  
✅ **Local Storage First**: All employee data persisted in localStorage using existing utilities from app/utils/storage.ts  
✅ **Next.js 16 & TypeScript**: All code uses Next.js 16 App Router with TypeScript strict mode  
✅ **Tailwind CSS Styling**: All styling via Tailwind utility classes, consistent with app theme  
✅ **Simplicity & Speed**: Minimal new components (3-4 total), leveraging existing infrastructure, no testing, no external form libraries

**No violations** - This implementation fully aligns with constitution principles and builds on foundation from 001-initial-layout.

## Project Structure

### Documentation (this feature)

```text
specs/002-employee-crud/
├── plan.md              # This file - implementation plan
├── spec.md              # Feature specification
└── clarifications.md    # Clarifications (if needed)
```

### Source Code (repository root)

```text
app/
├── employees/
│   └── page.tsx         # Complete employee CRUD page (MODIFY - currently placeholder)
├── components/
│   ├── Sidebar.tsx      # Existing sidebar (NO CHANGE)
│   ├── Modal.tsx        # Existing modal component (REUSE - may need minor enhancements)
│   ├── DataTable.tsx    # Generic table component (NEW or MODIFY existing if created)
│   ├── Pagination.tsx   # Pagination controls component (NEW)
│   ├── EmployeeForm.tsx # Employee form fields (NEW - reused in create/edit modals)
│   └── ConfirmDialog.tsx # Generic confirmation dialog (NEW - reusable)
├── utils/
│   └── storage.ts       # Existing localStorage utilities (MODIFY - may need employee helpers)
└── types.ts             # Existing type definitions (VERIFY Employee interface)

public/                  # Static assets (EXISTING - no changes)
```

**Structure Decision**: Using Next.js 16 App Router. We're building on top of the existing layout from 001-initial-layout. The employees/page.tsx will transform from placeholder to full CRUD page. We'll extract maximum reusability: Modal component (existing), EmployeeForm (shared between create/edit), Pagination (new, reusable), ConfirmDialog (new, reusable). Keeping with constitution's minimal component principle while ensuring code reuse.

## Complexity Tracking

> **No violations - this section intentionally empty**

The implementation follows all constitution principles. Component count is minimized through reuse, and all functionality is essential for the CRUD requirements.

## Implementation Phases

### Phase 0: Preparation ✅ (Already Completed)

- [x] Specification written
- [x] Git branch created (002-employee-crud)
- [x] Existing infrastructure from 001 (layout, sidebar, storage utilities)
- [x] Employee type interface exists in app/types.ts

### Phase 1: Core Table & Data Display (Priority: P1 - User Story 1)

**Goal**: Transform employees page from placeholder to functional paginated table showing employee data.

**Files to Create/Modify**:

1. `app/employees/page.tsx` - Complete rewrite with table and state management
2. `app/components/Pagination.tsx` - Create reusable pagination component
3. `app/utils/storage.ts` - Verify employee CRUD functions exist (should already have from 001)

**Implementation Details**:

**Pagination Component** (`app/components/Pagination.tsx`):

- Props: currentPage, totalPages, onPageChange
- Display current page / total pages
- Previous button (disabled on page 1)
- Next button (disabled on last page)
- Page numbers (show up to 5 visible page numbers with ellipsis if > 5 total pages)
- Tailwind styling consistent with app theme
- Responsive design

**Employees Page** (`app/employees/page.tsx`):

- Client component ('use client')
- State: employees array, currentPage, itemsPerPage (constant 5), searchQuery
- useEffect to load employees from localStorage on mount
- Calculate paginated data: slice array based on currentPage
- Display employee table with columns: ID, Name, Email, Contact (Phone), Department, Actions
- Use existing department data to resolve departmentId to department name
- Empty state when no employees: centered message with icon
- Pagination component at bottom (only show if > 5 employees)
- Actions column with placeholder icons (edit/delete) - icons visible but not functional yet

**Acceptance Criteria**:

- Table displays with correct columns
- Maximum 5 employees per page
- Pagination controls appear when > 5 employees
- Empty state shows when 0 employees
- Department names resolve correctly from departmentId
- Styling consistent with dashboard

### Phase 2: Search Functionality (Priority: P1 - User Story 2)

**Goal**: Add real-time search filtering for employees by name, email, or department.

**Files to Modify**:

1. `app/employees/page.tsx` - Add search input and filtering logic

**Implementation Details**:

**Search Implementation**:

- Add search input at top left of page
- State: searchQuery (string)
- Filter logic: case-insensitive match on name, email, department name
- Filtered results = employees.filter(matches searchQuery)
- Pagination calculated from filtered results, not all employees
- Search resets currentPage to 1 when query changes
- Debounce search input (300ms) for performance (use setTimeout/clearTimeout)
- Show count of filtered results

**UI Layout**:

- Top bar with search input (left) and create button placeholder (right)
- Search input with search icon and clear button (X) when text entered
- Show "X of Y employees" below search (filtered vs total)

**Acceptance Criteria**:

- Search filters in real-time as user types
- Matches against name, email, department (case-insensitive)
- Empty state when no results
- Pagination updates to reflect filtered count
- Clearing search restores full list
- Search resets to page 1

### Phase 3: Create Employee Modal (Priority: P2 - User Story 3)

**Goal**: Implement create employee functionality via modal form.

**Files to Create/Modify**:

1. `app/components/EmployeeForm.tsx` - Reusable form component
2. `app/employees/page.tsx` - Add create modal state and integration

**Implementation Details**:

**EmployeeForm Component** (`app/components/EmployeeForm.tsx`):

- Props: initialData (optional - for edit mode), departments array, onSubmit, onCancel
- Fields: Name (text, required), Department (select, required), Email (email, required), Phone (tel, optional)
- Client-side validation:
  - Name required, min 2 chars
  - Email required, valid format, unique check
  - Department required
  - Phone optional but validate format if provided
- Display validation errors inline below each field
- Form state managed internally
- Submit handler calls onSubmit with validated data
- Reset form on successful submit or cancel

**Employees Page Updates**:

- Add "Create Employee" button at top right
- State: showCreateModal (boolean), formErrors
- Click handler opens modal
- onSubmit: validates email uniqueness, calls addEmployee from storage utils, refreshes employee list, closes modal
- Reuse existing Modal component as wrapper
- Show success feedback (could be simple - new employee appears in table)

**Acceptance Criteria**:

- Button opens modal with form
- Form shows all required fields
- Validation prevents invalid submissions
- Email uniqueness enforced
- Successful creation closes modal and adds employee to table
- Employee appears on correct page (might be last page if many employees)
- Form resets for next use

### Phase 4: Edit Employee Modal (Priority: P2 - User Story 4)

**Goal**: Implement edit employee functionality via modal form.

**Files to Modify**:

1. `app/employees/page.tsx` - Add edit modal state and integration

**Implementation Details**:

**Employees Page Updates**:

- Add edit icon buttons in Actions column (pencil/edit icon)
- State: showEditModal (boolean), selectedEmployee (Employee | null)
- Click handler opens modal with selected employee data
- Reuse EmployeeForm component with initialData = selectedEmployee
- onSubmit: validates email uniqueness (allow same email for same employee), calls updateEmployee from storage utils, refreshes list, closes modal
- Pre-fill form with current employee data

**Edit Icon Styling**:

- Blue pencil/edit icon in Actions column
- Hover effect
- Positioned before delete icon

**Acceptance Criteria**:

- Edit icon click opens modal with pre-filled data
- Form allows modification of all fields
- Email uniqueness enforced (except for same employee)
- Successful edit updates table immediately
- Modal closes on save
- Changes persist to localStorage

### Phase 5: Delete Employee with Confirmation (Priority: P3 - User Story 5)

**Goal**: Implement delete functionality with confirmation modal.

**Files to Create/Modify**:

1. `app/components/ConfirmDialog.tsx` - Reusable confirmation dialog
2. `app/employees/page.tsx` - Add delete integration

**Implementation Details**:

**ConfirmDialog Component** (`app/components/ConfirmDialog.tsx`):

- Props: isOpen, title, message, onConfirm, onCancel, confirmText, cancelText, confirmStyle (danger/primary)
- Reuse existing Modal component
- Display title, message, two buttons
- Red/danger styling for destructive actions
- Tailwind classes for styling

**Employees Page Updates**:

- Add delete icon buttons in Actions column (trash icon)
- State: showDeleteModal (boolean), employeeToDelete (Employee | null)
- Click handler opens confirmation modal with employee name
- Confirmation message: "Are you sure you want to delete [Employee Name]?"
- onConfirm: calls deleteEmployee from storage utils, refreshes list, closes modal
- If deleting last employee on a page, navigate to previous page

**Delete Icon Styling**:

- Red trash icon in Actions column
- Hover effect
- Positioned after edit icon

**Acceptance Criteria**:

- Delete icon opens confirmation modal
- Modal shows employee name
- Confirming removes employee from localStorage
- Table updates immediately
- Pagination adjusts if needed (last employee on page)
- Cancelling closes modal without deletion

### Phase 6: Pagination Navigation (Priority: P3 - User Story 6)

**Goal**: Implement full pagination controls with previous/next and page numbers.

**Files to Modify**:

1. `app/components/Pagination.tsx` - Enhance with page number buttons

**Implementation Details**:

**Enhanced Pagination**:

- Show page numbers (e.g., 1 2 3 ... 10 for many pages)
- Logic for ellipsis when > 5-7 pages
- Clickable page numbers
- Current page highlighted
- Previous button disabled on page 1
- Next button disabled on last page
- Total pages and current page display: "Page X of Y"

**Acceptance Criteria**:

- Click page numbers navigates to that page
- Previous/next buttons work correctly
- Buttons disabled appropriately
- Page numbers show ellipsis for long lists
- Works with both full employee list and search results

### Phase 7: Polish & Validation

**Goal**: Final touches, edge cases, and validation.

**Tasks**:

1. Verify all functional requirements (FR-001 through FR-030)
2. Test all user stories end-to-end
3. Handle edge cases:
   - Duplicate email validation
   - Empty department dropdown handling
   - Long text truncation in table
   - Pagination edge cases (delete last on page)
   - Search with special characters
4. Add loading states if needed (localStorage is fast, might not need)
5. Ensure modal close on outside click works
6. Verify phone number format validation (basic)
7. Test with 0, 1, 5, 6, 50 employees
8. Verify department resolution (show name, not ID)
9. Empty states polished with good messaging
10. Icons consistent and clear (using Unicode or Tailwind icon classes)

**Acceptance Criteria**:

- All 30 functional requirements met
- All 6 user stories work independently
- No TypeScript errors
- No console errors or warnings
- Email uniqueness works 100%
- Pagination accurate in all scenarios
- Search performs well with lag
- Modals animate smoothly
- Consistent styling with rest of app

## Risk Assessment

**Low Risk**:

- Building on proven foundation from 001-initial-layout
- Standard CRUD patterns
- localStorage well-tested
- Modal component already exists

**Moderate Risk**:

1. **Email uniqueness validation**: Must check across all employees, including in edit mode
   - _Mitigation_: Implement helper function to check uniqueness, test thoroughly
2. **Pagination edge cases**: Deleting last item on page, searching while on high page number
   - _Mitigation_: Explicit logic to navigate to previous page when needed
3. **Form validation complexity**: Multiple fields, different validation rules
   - _Mitigation_: Use clear validation functions, display errors inline

4. **Search performance**: Filtering large arrays in real-time
   - _Mitigation_: Debounce input, limit search to 300ms delay, optimize filter logic

**Potential Issues**:

1. **Department dropdown empty**: If no departments exist yet
   - _Mitigation_: Add check on page load, show message to create departments first
2. **localStorage quota**: Many employees could fill storage
   - _Mitigation_: Check localStorage availability, show friendly error if full

## Success Metrics

- ✅ Users can view paginated employee list with 100% data accuracy
- ✅ Search returns results < 1 second for queries
- ✅ Create employee form completed in < 30 seconds
- ✅ Edit employee updates visible immediately
- ✅ Delete confirmation prevents accidental deletions
- ✅ Pagination displays exactly 5 employees per page
- ✅ Form validation prevents 100% of invalid entries
- ✅ All CRUD operations persist successfully

## Dependencies & Prerequisites

**External**:

- Next.js 16 ✅
- Tailwind CSS ✅
- TypeScript ✅

**Internal**:

- Feature 001-initial-layout must be complete ✅
  - Sidebar layout
  - Modal component
  - Storage utilities
  - Employee and Department types

**Blocked On**: Nothing - ready to implement

## Notes for Implementation

1. **Component Reuse Strategy**:
   - Reuse Modal from 001 for all modals (Create, Edit, Delete confirmation)
   - EmployeeForm extracted and reused for Create and Edit (different modes)
   - Pagination component designed to be reused for Departments page later
   - ConfirmDialog reusable for any confirmation needs

2. **State Management**:
   - All state in employees/page.tsx (useState hooks)
   - No global state needed
   - Refresh employee list by calling getEmployees() after mutations

3. **Validation Approach**:
   - Client-side only (no server)
   - Email uniqueness: filter employees array to check
   - Email format: use regex validation
   - Required fields: check before allowing submit

4. **Table Styling**:
   - Reuse DataTable component if created in 001, otherwise build simple table
   - Alternating row colors for readability
   - Fixed column widths to prevent layout shift
   - Actions column fixed width, right-aligned

5. **Icons**:
   - Can use Unicode characters (✏️ for edit, 🗑️ for delete, 🔍 for search)
   - Or use Tailwind/Heroicons CSS classes
   - Keep it simple per constitution - no icon library needed

6. **Department Resolution**:
   - Load departments from localStorage on page mount
   - Create lookup map: departmentId → department name
   - Display "Unknown" if department not found
   - In dropdown, filter out deleted departments

7. **Performance Considerations**:
   - Debounce search input (300ms)
   - Pagination prevents rendering large lists
   - Use useMemo for filtered/paginated results if needed

## Timeline Estimate

- Phase 1: 45-60 minutes (Core table with pagination)
- Phase 2: 30-40 minutes (Search functionality)
- Phase 3: 50-60 minutes (Create modal with validation)
- Phase 4: 30-40 minutes (Edit modal - reuses create components)
- Phase 5: 30-40 minutes (Delete with confirmation)
- Phase 6: 20-30 minutes (Enhanced pagination)
- Phase 7: 40-50 minutes (Polish, testing, edge cases)

**Total**: 4-5 hours

## Next Steps

1. ✅ Plan approved
2. → Move to task breakdown (create tasks.md)
3. → Begin Phase 1 implementation (Core table)
4. → Progress through phases sequentially (P1 → P2 → P3)
5. → Validate against spec after each phase
6. → Full validation before marking complete
