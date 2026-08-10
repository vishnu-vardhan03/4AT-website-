# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Employees across the organization who need to log complaints, request help, and track their own tickets.
- Technicians who triage, work, and resolve tickets. Technician access will later be restricted to specific authenticated user IDs.

## Product Purpose

ESSL is an internal ticketing workspace for reporting any organization-related complaint or request. Success means employees can raise and follow tickets without friction, while technicians can see workload, priority, status, and service health in one operational view.

## Positioning

One internal front door for organization-wide complaints and service requests, with a role-aware workspace that changes from employee self-service to technician operations.

## Operating Context

Employees create tickets, add a category, priority, description, and optional attachment, then follow progress. Technicians review queues, assignments, in-progress work, waiting items, resolutions, and SLA risk.

## Capabilities and Constraints

- Tickets, attachment metadata, and in-app notifications are persisted in PostgreSQL through the NestJS API; uploaded files use backend-local storage. ESSL currently uses temporary signed email sessions restricted to `@consult-4at.com` and `@4at.ai`; Microsoft identity verification will replace this entry step.
- The interface provides separate employee and technician dashboards. Employees cannot switch into technician access; the temporary IT support account is the only technician identity until Microsoft authentication is added.
- The existing 4AT website will expose ESSL from its top-right navigation.

## Brand Commitments

- Product/navigation name: ESSL. The long-form expansion is currently undecided.
- The supplied IT Service Hub technician dashboard wireframe is the structural and interaction reference for the technician view.
- The portal should remain recognizably connected to the 4AT website.

## Evidence on Hand

- Supplied wireframe package: `wireframe_extract/`, containing the reference screenshot, HTML, and design notes.
- No real employee names, ticket data, SLA policy, category taxonomy, or organization-specific proof has been supplied; interface data is demonstrative only.

## Product Principles

- Make raising a ticket fast and unambiguous.
- Show ownership and status at every step.
- Reserve operational density for technicians; keep employee views calm and focused.
- Make urgent work visible without turning the whole interface into an alarm.
