# Project: Daily Routine Flow System

This project describes a day-long flow, from waking up to going to sleep. Developed using Angular, the application provides users with a detailed, interactive experience of their daily routines.

## Branching Strategy

To maintain a clean and effective development cycle, we follow a structured branching strategy with the following branches: `feature`, `dev`, `release`, and `prod`. Each branch serves a specific purpose, ensuring a stable and organized workflow.

### Branches

- **feature**: 
  - Purpose: Holds individual features in progress. Each new feature or bug fix is developed on a separate `feature` branch (e.g., `feature/feature-name`).
  - Workflow: Developers work on specific tasks here, ensuring isolated testing and development. Once ready, a Pull Request (PR) is created to merge changes into the `dev` branch.
  - Important: All `feature` branches must follow the naming convention `feature/feature-name`.

- **dev**:
  - Purpose: Integrates all new features under development. This branch acts as the primary working environment where all `feature` branches merge after review.
  - Workflow: Developers push features here only after PR review and approval. The `dev` branch is the testing environment, where features are validated collectively before a release.
  - Important: Before merging into `release`, this branch undergoes comprehensive testing.

- **release**:
  - Purpose: Prepares features for production. The `release` branch serves as the staging environment, holding features ready for deployment to production.
  - Workflow: Once features are finalized and tested in the `dev` branch, they merge here. Additional testing and quality checks occur, ensuring a stable and fully-functional build before moving to `prod`.
  - Important: Only tested features go into `release`, ensuring a stable staging area.

- **prod**:
  - Purpose: Holds the production-ready code deployed to the live environment. This is the final, user-facing branch, only containing stable, thoroughly tested code.
  - Workflow: After all tests and approvals in `release`, code is merged into `prod` for deployment.
  - Important: Only thoroughly tested and approved code reaches this branch, representing the final version available to users.

### Fixes and Hotfixes

Occasionally, critical issues arise in production that require immediate attention. For these cases, we use `fix` branches:
- **fix**: Temporary branches for critical bug fixes in `prod`. These branches, such as `fix/critical-bug`, are created from `prod` and merged back into both `prod` and `dev` to maintain consistency across environments.

## Workflow with Approvals and Pull Requests

To ensure quality and consistency, we use a pull request (PR) workflow with mandatory approvals:
1. **Feature Development**: Each developer creates a branch from `dev` named `feature/feature-name`.
2. **Pull Request**: Upon completing a feature, the developer submits a PR to merge the `feature` branch into `dev`.
3. **Approval Process**:
   - **Review**: At least one other team member reviews the PR for code quality, functionality, and adherence to guidelines.
   - **Comments**: If changes are required, reviewers comment on the PR, and the developer addresses these before resubmission.
4. **Testing in Dev**: After approval, the feature is merged into `dev` for integration testing.
5. **Release Preparation**: Once features in `dev` are stable and complete, a PR is made from `dev` to `release`. Further tests occur in `release` to prepare for production.
6. **Deployment**: After final approval, a PR merges `release` into `prod`, deploying the code to the live environment.

## Contribution Guidelines

- **Naming Conventions**: Follow branch naming conventions (`feature/feature-name`, `fix/bug-name`).
- **Commit Messages**: Use clear, concise commit messages summarizing changes.
- **PR Reviews**: All PRs require at least one review and approval.
- **Testing**: Ensure local testing before PR submission.

---

This README gives clear direction for contributors and ensures that the development flow remains organized and traceable. Let me know if you'd like any adjustments or further details added.
