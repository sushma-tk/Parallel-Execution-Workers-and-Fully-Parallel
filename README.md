# Playwright Parallel Execution: fullyParallel false vs true

## What this experiment checks
Playwright runs tests on multiple workers (separate browser processes) at the
same time. This experiment compares two settings to see what actually runs
in parallel:

- `fullyParallel: false` (the default)
- `fullyParallel: true`

Both runs used the same 14 tests across 9 files, with `workers: 4` and
`retries: 0`. Three files have more than one test, so they show the
difference: AutomationPractice.spec.js (2 tests), UIBasictest.spec.js
(4 tests), and WebAPIpart2.spec.js (2 tests).

Each test prints a START and END line with its worker number and time, so
the console output shows exactly which worker ran each test and when.

> **Note:** The test files used here are practice tests from my earlier
> Playwright learning. They were picked only to have a mix of files, some
> with one test and some with several. The focus of this experiment is how
> the tests run in parallel, not what they test.

## Files in this folder
| File | What it is |
|---|---|
| run1-config.js | Config for Run 1 (fullyParallel: false) |
| run1-console.txt | Console output from Run 1 |
| run1-report.png | HTML report screenshot from Run 1 |
| run2-config.js | Config for Run 2 (fullyParallel: true) |
| run2-console.txt | Console output from Run 2 |
| run2-report.png | HTML report screenshot from Run 2 |

## Run 1: fullyParallel false
Total time: **42.1s**

| File | Test | Worker | Start-End |
|---|---|---|---|
| AutomationPractice | Screenshot & visual comparison | 0 | 11:28:39-11:28:47 |
| AutomationPractice | Visual comparison | 0 | 11:28:47-11:28:52 |
| UIBasictest | Browser context test | 1 | 11:28:48-11:28:54 |
| UIBasictest | page test | 1 | 11:28:54-11:28:55 |
| UIBasictest | UI controls | 1 | 11:28:55-11:28:59 |
| UIBasictest | Child window test | 1 | 11:28:59-11:29:03 |
| WebAPIpart2 | test | 3 | 11:29:02-11:29:16 |
| WebAPIpart2 | test2 | 3 | 11:29:16-11:29:20 |

**What happened:** Different files ran at the same time on different workers.
Tests inside the same file stayed on one worker and ran one after another.

## Run 2: fullyParallel true
Total time: **37.3s**

| File | Test | Worker | Start-End |
|---|---|---|---|
| AutomationPractice | Screenshot & visual comparison | 0 | 11:33:05-11:33:17 |
| AutomationPractice | Visual comparison | 1 | 11:33:05-11:33:12 |
| UIBasictest | Browser context test | 3 | 11:33:14-11:33:19 |
| UIBasictest | page test | 2 | 11:33:16-11:33:17 |
| UIBasictest | UI controls | 0 | 11:33:17-11:33:20 |
| UIBasictest | Child window test | 2 | 11:33:17-11:33:22 |
| WebAPIpart2 | test | 1 | 11:33:28-11:33:41 |
| WebAPIpart2 | test2 | 2 | 11:33:31-11:33:36 |

**What happened:** Tests inside the same file were split across different
workers and ran at the same time.

## What changed
- **Speed:** 42.1s to 37.3s, about 11% faster. UIBasictest.spec.js went from
  15s to 8s, and WebAPIpart2.spec.js went from 18s to 13s.
- **Run order:** Tests from the same file now overlap instead of waiting for
  each other.
- **Worker usage:** One file's tests now use several workers (UIBasictest
  used workers 3, 2, 0, 2) instead of only one.
- **Stability:** All 14 tests passed in both runs, so none of the tests
  depend on each other.
- **Why the gain is small:** 6 of the 9 files have only one test, and those
  were already running in parallel in Run 1.

## Conclusion
- **Default (`fullyParallel: false`):** files run in parallel; tests inside
  a file run one at a time on one worker.
- **`fullyParallel: true`:** tests inside a file are also spread across
  workers and run in parallel, which makes the suite faster when files
  contain several tests.