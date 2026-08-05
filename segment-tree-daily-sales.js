// ─────────────────────────────────────────────────────────────────────────
// Segment Tree — Range Sum Query + Point Update
//
// Scenario: a small coffee shop tracks revenue ($) for each of the first
// 10 days of the month. The owner wants to ask things like "how much did
// we make from day 3 to day 7?" over and over, AND occasionally correct
// a single day's number (a refund was processed late, a sale was missed
// at closing, etc). Recomputing the sum from scratch every time is O(n);
// a segment tree answers both operations in O(log n).
//
// Run it: node segment-tree-daily-sales.js
// ─────────────────────────────────────────────────────────────────────────

const revenue = [420, 380, 510, 460, 395, 605, 580, 340, 275, 500]; // day 0..9, in $
const N = revenue.length; // 10 — deliberately NOT a power of 2

// seg[v] holds ONE number: the sum of the range [l, r] that node v is
// responsible for. [l, r] itself is never stored — it's recomputed on
// every call by halving the parent's range. Node v's children are always
// 2*v (left half) and 2*v+1 (right half); size 4*N is a safe upper bound
// for any N, power-of-2 or not.
const seg = new Array(4 * N).fill(0);

function build(v, l, r) {
  if (l === r) { seg[v] = revenue[l]; return; }          // leaf: 1 day
  const m = (l + r) >> 1;
  build(2 * v, l, m);
  build(2 * v + 1, m + 1, r);
  seg[v] = seg[2 * v] + seg[2 * v + 1];                   // merge up
}

function rangeSum(v, l, r, ql, qr) {
  if (qr < l || r < ql) return 0;                         // OUTSIDE — no overlap
  if (ql <= l && r <= qr) return seg[v];                  // FULLY COVERED — use cached sum
  const m = (l + r) >> 1;                                 // PARTIAL — split and recurse both halves
  return rangeSum(2 * v, l, m, ql, qr) + rangeSum(2 * v + 1, m + 1, r, ql, qr);
}

function update(v, l, r, idx, newVal) {
  if (l === r) { seg[v] = newVal; return; }               // reached the target day
  const m = (l + r) >> 1;
  if (idx <= m) update(2 * v, l, m, idx, newVal);
  else update(2 * v + 1, m + 1, r, idx, newVal);
  seg[v] = seg[2 * v] + seg[2 * v + 1];                   // fix the sums on the way back up
}

// convenience wrappers so callers don't have to pass (1, 0, N-1) every time
const sum = (l, r) => rangeSum(1, 0, N - 1, l, r);
const set = (idx, val) => update(1, 0, N - 1, idx, val);

// brute-force reference, just to prove the tree is actually correct
const bruteSum = (l, r) => revenue.slice(l, r + 1).reduce((a, b) => a + b, 0);

build(1, 0, N - 1);

console.log('Daily revenue:', revenue);
console.log();

function check(label, l, r) {
  const got = sum(l, r);
  const want = bruteSum(l, r);
  const ok = got === want ? '✓' : '✗ MISMATCH';
  console.log(`${label} (day ${l}..${r}): $${got}  ${ok}`);
}

check('Whole month so far', 0, N - 1);
check('Day 0–2', 0, 2);
check('Day 3–7', 3, 7);
check('Single day (day 5)', 5, 5);

console.log('\nCorrection: day 4 revenue was actually $455, not $395 (late refund reversed).');
set(4, 455);
revenue[4] = 455; // keep the brute-force reference array in sync for the checks below

check('Day 3–7 (after fix)', 3, 7);
check('Whole month so far (after fix)', 0, N - 1);

console.log('\nEvery query/update above only touches O(log n) ≈ 4 nodes deep — no rescanning all 10 days.');
