"use client";

import * as React from "react";

export interface PatternDef {
  id: string;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
  opacity?: number;
}

export interface ChartDefsProps {
  /** Optional custom pattern list. Defaults to standard attendance & metric hatches. */
  patterns?: PatternDef[];
}

/**
 * Standard SVG <defs> containing diagonal hatched patterns for data charts.
 * Used for displaying partial states, leaves, overtime, absent or textured bars.
 */
export function ChartDefs({ patterns }: ChartDefsProps) {
  const defaultPatterns: PatternDef[] = [
    {
      id: "diagonalHatch",
      stroke: "var(--color-success, #16a34a)",
      strokeWidth: 1.5,
      width: 6,
      height: 6,
      opacity: 0.7,
    },
    {
      id: "diagonalHatchOvertime",
      stroke: "var(--primary, #213d67)",
      strokeWidth: 1.5,
      width: 6,
      height: 6,
      opacity: 0.7,
    },
    {
      id: "diagonalHatchLate",
      stroke: "var(--color-danger, #dc2626)",
      strokeWidth: 1.5,
      width: 6,
      height: 6,
      opacity: 0.7,
    },
    {
      id: "diagonalHatchAbsent",
      stroke: "var(--color-warning, #ca8a04)",
      strokeWidth: 1.5,
      width: 6,
      height: 6,
      opacity: 0.8,
    },
  ];

  const items = patterns ?? defaultPatterns;

  return (
    <defs>
      {items.map((p) => {
        const w = p.width ?? 6;
        const h = p.height ?? 6;
        return (
          <pattern
            key={p.id}
            id={p.id}
            patternUnits="userSpaceOnUse"
            width={w}
            height={h}
          >
            <path
              d={`M-1,1 l2,-2 M0,${h} l${w},-${h} M${w - 1},${h + 1} l2,-2`}
              stroke={p.stroke ?? "currentColor"}
              strokeWidth={p.strokeWidth ?? 1.5}
              opacity={p.opacity ?? 0.7}
            />
          </pattern>
        );
      })}
    </defs>
  );
}

