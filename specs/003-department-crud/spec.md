# Feature Specification: Department CRUD Management

**Feature Branch**: `003-department-crud`  
**Created**: 2026-04-09  
**Status**: Draft  
**Input**: User description: "Department management page similar to employee page. At top we have search input for department search on left side and top right we have button to create department. On click button modal should open for create department (department name input, description textarea, manager input) and Create Department button. Once department creation is complete modal should get closed and we have paginated table to display department data - department ID, name, description, manager, employee count and actions column which has delete icon button and edit icon button. On delete it should open confirmation modal to delete and for edit click should open edit department details modal. Table has 5 rows only and then paginated"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - View Department List (Priority: P1)

Users should see a paginated table displaying all departments with their details, allowing them to quickly scan and find department information.

**Why this priority**: This is the foundation of department management - users must be able to view existing departments before performing any other operations. Without this, the page is unusable.

**Independent Test**: Can be fully tested by navigating to /departments page and verifying a table with department data is displayed, showing columns for ID, Name, Description, Manager, Employee Count, and Actions, with pagination controls showing 5 rows per page.

**Acceptance Scenarios**:

1. **Given** user navigates to /departments page, **When** the page loads, **Then** they see a table with column headers: Department ID, Name, Description, Manager, Employee Count, Actions
2. **Given** there are departments in the system, **When** the table renders, **Then** department data is displayed with maximum 5 rows visible per page
3. **Given** there are more than 5 departments, **When** the table renders, **Then** pagination controls are displayed at the bottom
4. **Given** there are 0 departments, **When** the page loads, **Then** an empty state message is displayed
5. **Given** departments exist in the system, **When** the table renders, **Then** the Employee Count column shows the number of employees assigned to each department

---

### User Story 2 - Search for Departments (Priority: P1)

Users should be able to search for departments by name, description, or manager using a search input field, enabling quick filtering of the department list.

**Why this priority**: Search is critical for usability when dealing with multiple departments. This directly impacts user efficiency in finding specific departments.

**Independent Test**: Can be tested by entering text in the search input and verifying the table filters to show only matching departments, with pagination resetting to page 1.

**Acceptance Scenarios**:

1. **Given** user is on the departments page, **When** they type in the search input, **Then** the table filters in real-time to show only matching departments
2. **Given** user has searched for departments, **When** no results match, **Then** an empty state message is displayed
3. **Given** user has searched and results span multiple pages, **When** they view results, **Then** pagination reflects the filtered count
4. **Given** user clears the search input, **When** the input is empty, **Then** all departments are displayed again

---

### User Story 3 - Create New Department (Priority: P2)

Users should be able to add new departments to the system by clicking a Create button that opens a modal form with fields for department details.

**Why this priority**: Creating departments is a core CRUD operation, but users must first be able to view the list (P1) before this becomes useful.

**Independent Test**: Can be tested by clicking the "Create Department" button, filling in the modal form (name, description, manager), clicking Create, and verifying the modal closes and the new department appears in the table.

**Acceptance Scenarios**:

1. **Given** user clicks the "Create Department" button (top right), **When** button is clicked, **Then** a modal opens with a form
2. **Given** the create modal is open, **When** user views the form, **Then** fields for Name, Description (textarea), and Manager are visible
3. **Given** user fills all required fields, **When** they click the "Create Department" button, **Then** the department is saved to localStorage
4. **Given** department is successfully created, **When** save completes, **Then** the modal closes and the new department appears in the table
5. **Given** user submits form with invalid data, **When** validation fails, **Then** error messages are displayed and modal remains open

---

### User Story 4 - Edit Department Details (Priority: P2)

Users should be able to update existing department information by clicking an edit icon in the Actions column, which opens a pre-filled modal form.

**Why this priority**: Editing is essential for maintaining accurate department data, but depends on the list view (P1) and uses similar modal pattern to create (P2).

**Independent Test**: Can be tested by clicking the edit icon for a department, verifying the modal opens with pre-filled data, making changes, clicking save, and confirming the table updates with new values.

**Acceptance Scenarios**:

1. **Given** user clicks the edit icon in the Actions column, **When** icon is clicked, **Then** a modal opens with the department's current data pre-filled
2. **Given** the edit modal is open, **When** user modifies fields, **Then** they can change Name, Description, and Manager
3. **Given** user clicks "Save" button, **When** changes are submitted, **Then** the department record is updated in localStorage
4. **Given** department is successfully updated, **When** save completes, **Then** the modal closes and the table reflects the updated data
5. **Given** user clicks outside the modal or a cancel button, **When** modal is dismissed, **Then** no changes are saved

---

### User Story 5 - Delete Department (Priority: P3)

Users should be able to remove departments from the system by clicking a delete icon in the Actions column, which triggers a confirmation modal before deletion.

**Why this priority**: Deletion is important but lower priority as it's a destructive action that should only be used occasionally. The confirmation step adds safety. Additional validation needed to prevent deleting departments with employees.

**Independent Test**: Can be tested by clicking the delete icon for a department with no employees, confirming in the confirmation modal, and verifying the department is removed from the table. Also test that departments with employees cannot be deleted.

**Acceptance Scenarios**:

1. **Given** user clicks the delete icon in the Actions column, **When** icon is clicked, **Then** a confirmation modal appears
2. **Given** the confirmation modal is displayed, **When** user views it, **Then** it shows the department's name and asks for confirmation
3. **Given** user clicks "Confirm Delete" for a department with no employees, **When** confirmed, **Then** the department is removed from localStorage
4. **Given** department is successfully deleted, **When** deletion completes, **Then** the modal closes and the department is removed from the table
5. **Given** user clicks "Cancel" in confirmation modal, **When** cancelled, **Then** the modal closes and no deletion occurs
6. **Given** user tries to delete a department with assigned employees, **When** delete is attempted, **Then** an error message is displayed and deletion is prevented
7. **Given** deleting a department leaves the current page empty, **When** deletion completes, **Then** pagination adjusts to show the previous page if available

---

### User Story 6 - Navigate Paginated Results (Priority: P3)

Users should be able to navigate through multiple pages of department records using pagination controls (previous, next, page numbers).

**Why this priority**: Pagination is important for usability with large datasets but is enhancement to the basic list view (P1). Most valuable when there are many departments.

**Independent Test**: Can be tested by verifying pagination controls appear when > 5 departments exist, clicking next/previous buttons, and confirming the table shows the appropriate 5 departments for each page.

**Acceptance Scenarios**:

1. **Given** there are more than 5 departments, **When** the table renders, **Then** pagination controls show current page and total pages
2. **Given** user is on page 1, **When** they click "Next" button, **Then** page 2 is displayed with the next 5 departments
3. **Given** user is on page 2 or later, **When** they click "Previous" button, **Then** the previous page is displayed
4. **Given** user is on the last page, **When** viewing pagination, **Then** the "Next" button is disabled
5. **Given** user is on the first page, **When** viewing pagination, **Then** the "Previous" button is disabled
6. **Given** pagination controls are visible, **When** user clicks a specific page number, **Then** that page is displayed

---

### Edge Cases

- What happens when user submits create form with duplicate department name? → Show validation error, department name must be unique
- What happens when user tries to create department with missing required fields? → Show validation errors, prevent submission
- What happens when localStorage is full? → Show error message, handle gracefully
- What happens when user searches while on page 3 and results only have 1 page? → Reset to page 1 of search results
- What happens when user deletes the last department on a page? → Navigate to previous page if available
- What happens when very long names or descriptions are entered? → Truncate with ellipsis in table, show full in modal
- What happens when user tries to delete a department that has employees assigned? → Show error message "Cannot delete department with assigned employees. Please reassign or remove employees first."
- What happens when manager field is left empty? → Manager is optional, can be empty
- What happens when a department has 0 employees? → Show "0" in Employee Count column
- What happens when viewing employee count and employees are added/removed? → Count updates when page is refreshed or data is reloaded

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Page MUST display a search input field at the top left for filtering departments
- **FR-002**: Page MUST display a "Create Department" button at the top right
- **FR-003**: Clicking "Create Department" button MUST open a modal with a form
- **FR-004**: Create modal MUST include input fields for: Name (text), Description (textarea), Manager (text)
- **FR-005**: Create modal MUST include a "Create Department" submit button
- **FR-006**: Form validation MUST ensure Name is a required field
- **FR-007**: Department name MUST be unique across all departments
- **FR-008**: Description and Manager fields are OPTIONAL
- **FR-009**: Successfully creating a department MUST close the modal and refresh the table
- **FR-010**: Page MUST display a table with columns: Department ID, Name, Description, Manager, Employee Count, Actions
- **FR-011**: Table MUST display maximum 5 rows per page
- **FR-012**: Table MUST show pagination controls when total departments exceed 5
- **FR-013**: Actions column MUST contain edit icon button and delete icon button for each department
- **FR-014**: Clicking edit icon MUST open a modal pre-filled with department's current data
- **FR-015**: Edit modal MUST allow modification of Name, Description, and Manager
- **FR-016**: Saving edited department MUST update localStorage and close modal
- **FR-017**: Clicking delete icon MUST open a confirmation modal
- **FR-018**: Confirmation modal MUST display department name and ask for deletion confirmation
- **FR-019**: System MUST prevent deletion of departments that have assigned employees
- **FR-020**: Confirming deletion of department with no employees MUST remove department from localStorage and table
- **FR-021**: Cancelling deletion MUST close modal without removing department
- **FR-022**: Search input MUST filter table results in real-time as user types
- **FR-023**: Search MUST match against Name, Description, and Manager fields
- **FR-024**: Search results MUST be paginated (5 rows max) if results exceed 5
- **FR-025**: Clearing search MUST restore full department list
- **FR-026**: Pagination MUST show current page number and total pages
- **FR-027**: Pagination MUST include Previous, Next, and page number controls
- **FR-028**: Department ID MUST be auto-generated and displayed in table
- **FR-029**: Employee Count column MUST display the number of employees assigned to each department
- **FR-030**: All data MUST persist in browser localStorage
- **FR-031**: Modals MUST close when clicking outside the modal content
- **FR-032**: Empty state MUST be displayed when no departments exist or search has no results
- **FR-033**: Description field in table MUST truncate long text with ellipsis (max ~50 characters visible)
- **FR-034**: Hovering over truncated description SHOULD show full text via tooltip or title attribute

### Key Entities

- **Department Entity**:
  - id (string, auto-generated)
  - name (string, required, unique)
  - description (string, optional)
  - manager (string, optional)
  - createdAt (timestamp)

- **Create Department Modal**: Form modal with Name input, Description textarea, Manager input, Create button, Cancel button

- **Edit Department Modal**: Form modal pre-filled with department data, same fields as create, Save button, Cancel button

- **Delete Confirmation Modal**: Displays department name, shows warning if department has employees, Confirm Delete button (disabled if has employees), Cancel button

- **Department Table**: Paginated table component showing 5 departments per page with search filtering and employee count

- **Pagination Component**: Reusable component from employee feature - shows page numbers, previous/next buttons, current/total page indicators

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can view all departments in a table format with 100% data accuracy
- **SC-002**: Users can search for departments and get filtered results within 1 second
- **SC-003**: Users can create a new department in under 30 seconds (form fill + submit)
- **SC-004**: Users can edit a department and see updated data in the table immediately
- **SC-005**: Users can delete a department with no employees and see confirmation in under 10 seconds
- **SC-006**: System prevents deletion of departments with employees 100% of the time
- **SC-007**: Pagination correctly displays 5 departments per page 100% of the time
- **SC-008**: Form validation prevents invalid data entry 100% of the time
- **SC-009**: All CRUD operations persist to localStorage with 100% success rate
- **SC-010**: Employee count accurately reflects number of employees per department 100% of the time
- **SC-011**: Modal open/close animations are smooth with no visual glitches
- **SC-012**: Search returns accurate results for 100% of queries

## Assumptions

- Employee management system already exists (feature 002-employee-crud completed)
- Reuse Modal, Pagination, and ConfirmDialog components from employee feature for consistency
- Department ID will use timestamp-based generation for uniqueness
- Search will be case-insensitive for better UX
- No authentication/authorization required (per constitution - open access)
- Pagination will show up to 10 page numbers with "..." for large datasets
- Delete operation is permanent (removes from localStorage, not recoverable)
- Edit and Create modals will use the same component/styling for consistency
- Table will be responsive but optimized for desktop (mobile out of scope per constitution)
- No import/export functionality required in v1
- No bulk operations (multi-select delete) required in v1
- Employee count is calculated dynamically from employees in localStorage (not stored)
- When a department is deleted, employees with that departmentId will show "Unknown Department" in employee list
- Description textarea will have a reasonable character limit (e.g., 500 characters)
- Manager field accepts free text (not a dropdown of existing employees for v1 simplicity)
- Department name uniqueness check is case-insensitive
- No department hierarchy or parent-child relationships in v1
