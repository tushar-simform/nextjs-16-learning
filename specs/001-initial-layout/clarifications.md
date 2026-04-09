# Clarifications Needed for: Initial Layout & Navigation

**Feature**: 001-initial-layout  
**Date**: 2026-04-09  
**Status**: ✅ Resolved

---

## Overview

This document identifies ambiguities and unclear requirements in the specification that need clarification before implementation begins.

---

## Clarification Questions

### 1. Dashboard Summary Statistics - Specific Metrics

**Current Spec Says**: "Dashboard route ("/") MUST display summary statistics about employees and departments"

**Unclear**: What specific statistics should be displayed?

**Options to Consider**:

- a) Total employee count + Total department count only
- b) Total counts + Recent additions (e.g., "5 employees added this week")
- c) Total counts + Additional metrics (avg salary, largest department, etc.)
- d) Simple cards with counts and basic info

**Proposed Default**: Display total employee count and total department count as simple metric cards. Keep it minimal for MVP.

**Decision Needed**: Please confirm or specify alternative.

---

### 2. Sidebar Styling & Visual Design

**Current Spec Says**: "Sidebar navigation component visible on all pages" with "Tailwind CSS utility classes"

**Unclear**: Specific styling details for the sidebar

**Options to Consider**:

- a) Dark sidebar (dark gray/blue background, white text)
- b) Light sidebar (white/light gray background, dark text)
- c) Specific width (e.g., 256px, 280px, or responsive)
- d) Include icons with menu text or text-only?

**Proposed Default**:

- Dark sidebar (gray-900 background, white text)
- Fixed width: 256px (w-64 in Tailwind)
- Include emoji icons for visual appeal (📊 Dashboard, 👥 Employees, 🏢 Departments)
- Blue accent color for active menu item

**Decision Needed**: Please confirm or specify preferences.

---

### 3. Empty State for Employees/Departments Pages

**Current Spec Says**: "Employees and Departments pages will initially show placeholder content"

**Unclear**: What should the placeholder content be?

**Options to Consider**:

- a) Just page title (e.g., "Employees" heading only)
- b) Page title + "Coming soon" message
- c) Page title + empty table structure with column headers
- d) Page title + brief description of what will be added

**Proposed Default**: Display page title with a simple message: "Employee management functionality will be available soon." - keeps it professional and informative.

**Decision Needed**: Please confirm or provide specific text.

---

### 4. Navigation - Invalid Route Handling

**Current Spec Says**: "What happens when user manually types an invalid URL? → Should show 404 or redirect to dashboard"

**Unclear**: Which approach is preferred?

**Options**:

- a) Show Next.js default 404 page
- b) Custom 404 page with link back to dashboard
- c) Automatically redirect to dashboard
- d) Custom 404 with sidebar still visible for easy navigation

**Proposed Default**: Custom 404 page with sidebar still visible - maintains consistent layout and allows easy navigation without confusing users.

**Decision Needed**: Please confirm or specify preference.

---

### 5. Browser Back/Forward Button Behavior

**Current Spec Says**: "Navigation should work correctly and active menu item should update"

**Clarification Needed**: This should work by default with Next.js App Router - just confirming no special handling required?

**Proposed Default**: Rely on Next.js App Router's built-in browser history support with no custom handling.

**Decision Needed**: Confirm this is acceptable.

---

### 6. Application Title/Branding

**Unclear**: What should the application name/title be in the sidebar header?

**Options to Consider**:

- a) "HR Manager" or "HR Management System"
- b) "Employee & Department Manager"
- c) Company name or project-specific title
- d) Simple icon/logo with no text

**Proposed Default**: "HR Manager" with subtitle "Employee & Dept System" - concise and descriptive.

**Decision Needed**: Please confirm or provide specific branding.

---

## DECISIONS CONFIRMED ✅

1. ✅ Dashboard shows: Total employees count + Total departments count (simple cards)
2. ✅ Sidebar: Dark theme (gray-900), 256px width, emoji icons, blue active state
3. ✅ Placeholder pages: Title + "Coming soon" message
4. ✅ 404 handling: Custom page with sidebar visible
5. ✅ Browser navigation: Default Next.js behavior
6. ✅ App title: **"Team Management"** with subtitle "Employee & Dept System" (User specified)

---

## Next Steps

1. ✅ **User Review**: COMPLETED - User confirmed defaults with app title "Team Management"
2. ✅ **Update Spec**: COMPLETED - Spec updated with all clarified details
3. ➡️ **Proceed to Planning**: Ready to move to implementation planning phase

---

**Note**: All clarifications resolved. Specification is now complete and ready for planning and implementation.
