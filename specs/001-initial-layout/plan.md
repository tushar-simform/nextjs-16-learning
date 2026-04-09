# Implementation Plan: Initial Layout & Navigation

**Branch**: `001-initial-layout` | **Date**: 2026-04-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-initial-layout/spec.md`

## Summary

Create the foundational layout and navigation structure for the Team Management application. This includes a persistent dark-themed sidebar with three navigation menu items (Dashboard, Employees, Departments), a main dashboard page displaying employee and department statistics, placeholder pages for Employees and Departments sections, and a custom 404 error page. The implementation uses Next.js 16 App Router with Tailwind CSS for styling and follows a component reusability approach per the project constitution.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16  
**Primary Dependencies**:

- next@16.x (App Router)
- react@19.x
- tailwindcss@3.x
- TypeScript for type safety

**Storage**: Browser localStorage (JSON format) - not used in this phase, prepared for future features  
**Testing**: None (per constitution - testing explicitly excluded)  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - last 2 versions)  
**Project Type**: Web application (Single Page Application with client-side routing)  
**Performance Goals**:

- Initial page load < 2 seconds on standard broadband
- Client-side navigation < 100ms
- Zero layout shift during page transitions

**Constraints**:

- Fixed sidebar width (256px)
- Desktop-first design (mobile out of scope for v1)
- Minimal component count (maximize reuse)
- No external state management libraries
- All styling via Tailwind utility classes only

**Scale/Scope**:

- 3 routes (/, /employees, /departments)
- 1 shared layout component
- 1 sidebar navigation component
- 3 page components (dashboard + 2 placeholders)
- 1 custom 404 page

## Constitution Check

_GATE: Must pass before implementation._

✅ **Component Reusability**: Sidebar component reused across all pages via shared layout  
✅ **Local Storage First**: Storage utilities prepared but not actively used in this phase  
✅ **Next.js 16 & TypeScript**: All code will use Next.js 16 App Router conventions with TypeScript  
✅ **Tailwind CSS Styling**: All styling via Tailwind utility classes, no custom CSS except globals.css  
✅ **Simplicity & Speed**: Minimal components (4 total), no testing, no external dependencies beyond required stack

**No violations** - This implementation fully aligns with constitution principles.

## Project Structure

### Documentation (this feature)

```text
specs/001-initial-layout/
├── plan.md              # This file - implementation plan
├── spec.md              # Feature specification
└── clarifications.md    # Resolved clarifications
```

### Source Code (repository root)

```text
app/
├── layout.tsx           # Root layout with Sidebar (MODIFY)
├── page.tsx             # Dashboard page with metrics (MODIFY)
├── globals.css          # Tailwind imports (EXISTING)
├── employees/
│   └── page.tsx         # Employees placeholder page (NEW)
├── departments/
│   └── page.tsx         # Departments placeholder page (NEW)
├── not-found.tsx        # Custom 404 page (NEW)
├── components/
│   └── Sidebar.tsx      # Sidebar navigation component (NEW)
└── utils/
    └── storage.ts       # localStorage utilities (NEW - prepared for future)

public/                  # Static assets (EXISTING - no changes)
```

**Structure Decision**: Using Next.js 16 App Router file-based routing convention. The `app/` directory contains all routes and components. We're creating a minimal number of components per constitution guidelines - only extracting Sidebar as a separate component since it's reused across all pages via the layout. Dashboard metrics will be inline in page.tsx to keep component count low.

## Complexity Tracking

> **No violations - this section intentionally empty**

The implementation follows all constitution principles without requiring any exceptions or additional complexity.

## Implementation Phases

### Phase 0: Preparation ✅ (Already Completed)

- [x] Constitution established
- [x] Specification written and clarified
- [x] Git branch created (001-initial-layout)
- [x] Project scaffolded with Next.js 16

### Phase 1: Core Layout & Sidebar (Priority: P1)

**Goal**: Establish the foundational layout structure with persistent sidebar navigation.

**Files to Create/Modify**:

1. `app/components/Sidebar.tsx` - Create sidebar navigation component
2. `app/layout.tsx` - Modify to include Sidebar in root layout
3. `app/globals.css` - Ensure Tailwind is properly configured (verify only)

**Implementation Details**:

**Sidebar Component** (`app/components/Sidebar.tsx`):

- Client component ('use client')
- Dark theme: bg-gray-900, text-white
- Fixed width: w-64 (256px)
- Header with app title "Team Management" and subtitle
- Three navigation links using Next.js Link component
- Use usePathname() hook to detect active route
- Active state: bg-blue-600 background
- Emoji icons: 📊 Dashboard, 👥 Employees, 🏢 Departments
- Hover states for better UX

**Root Layout** (`app/layout.tsx`):

- Import and include Sidebar component
- Flexbox layout: sidebar + main content area
- Sidebar fixed on left, main content takes remaining space
- Ensure layout persists across all routes

**Acceptance Criteria**:

- Sidebar visible on all pages
- Three menu items displayed correctly
- App title "Team Management" visible
- Dark theme applied (gray-900 background)
- Navigation links clickable

### Phase 2: Dashboard Page (Priority: P1)

**Goal**: Create the landing page with employee and department statistics.

**Files to Modify**:

1. `app/page.tsx` - Transform into dashboard with metrics
2. `app/utils/storage.ts` - Create storage utilities for future use

**Implementation Details**:

**Dashboard Page** (`app/page.tsx`):

- Client component to use localStorage
- Use useEffect to load data counts from localStorage
- Display two metric cards side by side
- Card 1: Total Employees (with count)
- Card 2: Total Departments (with count)
- Tailwind styling: cards with border, shadow, padding
- Handle zero state gracefully (show 0 if no data)

**Storage Utilities** (`app/utils/storage.ts`):

- Functions to get/set employees and departments from localStorage
- Type-safe interfaces for Employee and Department
- Helper functions: getEmployees(), getDepartments()
- Returns empty array if no data exists
- Prepared for future CRUD operations

**Acceptance Criteria**:

- Dashboard displays two metric cards
- Employee count shown (0 if empty)
- Department count shown (0 if empty)
- Cards styled consistently
- Dashboard menu item highlighted as active

### Phase 3: Placeholder Pages (Priority: P2)

**Goal**: Create placeholder pages for Employees and Departments routes.

**Files to Create**:

1. `app/employees/page.tsx` - Employees placeholder
2. `app/departments/page.tsx` - Departments placeholder

**Implementation Details**:

**Employees Page** (`app/employees/page.tsx`):

- Simple page component
- Page title "Employees" as h1
- Message: "Employee management functionality will be available soon."
- Styled with Tailwind (text-2xl for title, text-gray-600 for message)
- Centered content for better appearance

**Departments Page** (`app/departments/page.tsx`):

- Similar structure to Employees page
- Page title "Departments" as h1
- Message: "Department management functionality will be available soon."
- Consistent styling with Employees page

**Acceptance Criteria**:

- /employees route accessible and displays placeholder
- /departments route accessible and displays placeholder
- Sidebar navigation correctly highlights active menu item
- Navigation between pages works smoothly
- No console errors or warnings

### Phase 4: Custom 404 Page (Priority: P3)

**Goal**: Handle invalid routes with custom error page that maintains consistent layout.

**Files to Create**:

1. `app/not-found.tsx` - Custom 404 page

**Implementation Details**:

**Not Found Page** (`app/not-found.tsx`):

- Uses app/ directory convention for 404 handling
- Sidebar still visible (inherits from layout)
- Display "404 - Page Not Found" heading
- Helpful message: "The page you're looking for doesn't exist."
- Link back to dashboard using Next.js Link
- Styled consistently with rest of application

**Acceptance Criteria**:

- Invalid URLs show custom 404 page
- Sidebar remains visible on 404 page
- Link to dashboard works
- 404 page styling consistent with app theme

### Phase 5: Polish & Validation (Priority: P3)

**Goal**: Ensure all requirements are met and polish the user experience.

**Tasks**:

1. Verify all functional requirements (FR-001 through FR-017)
2. Test navigation flow (Dashboard → Employees → Departments → back)
3. Test browser back/forward buttons
4. Verify active menu highlighting on all pages
5. Check responsive behavior (though mobile not required, ensure no critical breaks)
6. Verify no console errors or warnings
7. Test performance (page load < 2 seconds)

**Acceptance Criteria**:

- All functional requirements from spec satisfied
- Navigation works 100% of the time
- Active states correct on all pages
- No TypeScript errors
- No console errors or warnings
- Performance goals met

## Risk Assessment

**Low Risk**:

- Standard Next.js patterns well-documented
- Simple component structure
- No complex state management
- No API integrations

**Potential Issues**:

1. **localStorage SSR compatibility**: Next.js runs on server, localStorage only in browser
   - _Mitigation_: Use client components and check `typeof window !== 'undefined'`
2. **Hydration errors**: Mismatch between server and client render
   - _Mitigation_: Ensure consistent initial state, use useEffect for client-only code

3. **Active menu highlighting**: usePathname() must work correctly
   - _Mitigation_: Test pathname matching logic thoroughly

## Success Metrics

- ✅ User can load application and see complete layout within 2 seconds
- ✅ User can navigate between all three sections with zero failures
- ✅ Active menu item correctly highlighted 100% of the time
- ✅ URL reflects current page 100% of the time
- ✅ Layout visually consistent across all pages

## Dependencies & Prerequisites

**External**:

- Next.js 16 installed ✅
- Tailwind CSS configured ✅
- TypeScript configured ✅

**Internal**:

- None (this is the first feature)

**Blocked On**: Nothing - ready to implement

## Notes for Implementation

1. **Component Extraction**: Only extract Sidebar as separate component. Dashboard metrics stay inline to minimize components.

2. **Type Safety**: Define Employee and Department interfaces in storage.ts even though not actively used yet.

3. **Styling Consistency**: Establish color palette and spacing patterns in dashboard that will be reused in future features.

4. **Future Preparation**: Storage utilities should be complete enough to support future CRUD operations without major refactoring.

5. **Accessibility Consideration**: While not explicitly required, use semantic HTML (nav, main, h1) for better structure.

## Timeline Estimate

- Phase 1: 30-45 minutes (Sidebar + Layout)
- Phase 2: 20-30 minutes (Dashboard)
- Phase 3: 15-20 minutes (Placeholder pages)
- Phase 4: 10-15 minutes (404 page)
- Phase 5: 15-20 minutes (Testing & polish)

**Total**: 90-130 minutes (~1.5-2 hours)

## Next Steps

1. ✅ Plan approved
2. → Begin Phase 1 implementation (Sidebar + Layout)
3. → Progress through phases sequentially
4. → Validate against spec after each phase
5. → Final validation before marking feature complete
