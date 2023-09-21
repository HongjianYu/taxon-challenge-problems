---
title: "Taxon Challenge Problems"
author: "Jay Yu"
---

# Taxon Challenge Problems

This project contains solutions to the two problems described [here](https://www.jasperoleary.com/taxon-undergraduate-recruitment.html).

Important files are displayed in the directory tree below:

```
.
├── README.md
├── __tests__
│   ├── __utils__                  <-- Testing data
│   ├── filter.test.ts             <-- Problem 1 tests
│   └── mock_fetch_rules.test.tsx  <-- Problem 2 tests
├── lib
│   └── filter.ts  <-- Problem 1 solution
└── pages
    ├── App.tsx    <-- Problem 2 solution
    └── index.tsx  <-- Problem 2 startup handler
```

> Testing data in `__utils__` are downloaded from [here](https://github.com/machineagency/taxon/tree/main/program_database). Some have been modified for testing purposes.

## Commands

```bash
npm install
```

```bash
# Run jest test suites for both problems
npm test
```

```bash
# Start server for Problem 2.
# Note that the http endpoint is invalid, so no rule names or messages will be displayed.
npm run dev
```
