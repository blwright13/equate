/**
 * Equation validation using math.js.
 * Checks that a run forms a well-formed equation (LHS = RHS) and that it evaluates correctly.
 */

import { evaluate } from 'mathjs'

/** Tokenize a run of faces into left and right sides of '='. */
function splitSides(tokens: string[]): { left: string[]; right: string[] } | null {
  const idx = tokens.indexOf('=')
  if (idx === -1 || tokens.indexOf('=', idx + 1) !== -1) return null
  return {
    left: tokens.slice(0, idx),
    right: tokens.slice(idx + 1),
  }
}

/** Build expression string from tokens (digits/ops only; no '='). */
function toExpr(tokens: string[]): string {
  return tokens
    .map((t) => (t === '×' ? '*' : t === '÷' ? '/' : t === '−' ? '-' : t))
    .join('')
}

export interface ValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validate that the given run of tile faces forms a true equation.
 * Run must contain exactly one '=' and valid math on both sides.
 */
export function validateEquation(faces: string[]): ValidationResult {
  if (faces.length < 3) {
    return { valid: false, error: 'Too few tokens' }
  }
  const sides = splitSides(faces)
  if (!sides) {
    return { valid: false, error: 'Exactly one = required' }
  }
  const { left, right } = sides
  if (left.length === 0 || right.length === 0) {
    return { valid: false, error: 'Both sides must be non-empty' }
  }
  try {
    const leftExpr = toExpr(left)
    const rightExpr = toExpr(right)
    const l = evaluate(leftExpr) as number
    const r = evaluate(rightExpr) as number
    if (typeof l !== 'number' || typeof r !== 'number' || Number.isNaN(l) || Number.isNaN(r)) {
      return { valid: false, error: 'Invalid expression' }
    }
    if (Math.abs(l - r) > 1e-9) {
      return { valid: false, error: 'Equation not true' }
    }
    return { valid: true }
  } catch {
    return { valid: false, error: 'Invalid expression' }
  }
}
