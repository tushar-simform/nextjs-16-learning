# Employee & Department Management System Constitution

## Core Principles

### I. Component Reusability

Components must be minimal and reusable across the application; Shared UI components (forms, tables, modals) used for both Employee and Department features; Avoid duplication by creating generic, configurable components

### II. Local Storage First

All data persisted in browser localStorage as JSON; No external database or API dependencies; Data structure must support CRUD operations for Employees and Departments

### III. Next.js 16 & TypeScript

Built on Next.js 16 with App Router; TypeScript for type safety across all components; Follow Next.js 16 conventions and best practices

### IV. Tailwind CSS Styling

All styling done via Tailwind CSS utility classes; Consistent design system with reusable style patterns; No custom CSS files except globals.css

### V. Simplicity & Speed

No testing infrastructure required; Minimal dependencies; Fast development with focus on functionality over optimization

## Technical Stack

**Framework**: Next.js 16 (App Router)
**Language**: TypeScript
**Styling**: Tailwind CSS
**Data Storage**: Browser localStorage (JSON)
**Testing**: None (explicitly excluded)

## Application Structure

**Pages**:

- Dashboard (landing page) - shows summary statistics
- Employees - CRUD operations for employee records
- Departments - CRUD operations for department records

**Layout**:

- Sidebar navigation with Dashboard, Employees, Departments menu items
- Shared layout across all pages

**Data Models**:

- Employee: id, name, email, departmentId, position, salary, etc.
- Department: id, name, description, manager, etc.

## Development Guidelines

**Component Strategy**: Create as few components as possible; Maximize reuse across Employee and Department pages; Generic Table, Form, and Modal components preferred

**State Management**: Use React hooks (useState, useEffect) for local state; localStorage for persistence; No external state management libraries

**Code Organization**: Keep related logic together; Prefer colocated utility functions; Minimize file count

## Governance

This constitution defines the project requirements and constraints; All implementation must follow these principles; Focus on working functionality over perfect architecture

**Version**: 1.0.0 | **Ratified**: 2026-04-09 | **Last Amended**: 2026-04-09
