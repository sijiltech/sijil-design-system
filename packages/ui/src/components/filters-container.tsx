import { ReactNode } from "react"

/**
 * Wrapping row for screen filters; stacks full-width inside the mobile shell.
 *
 * @param props - Filter controls.
 * @returns Filters wrapper element.
 */
export function FiltersContainer({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex justify-between flex-row flex-wrap gap-3 mb-5 shell:flex-col shell:flex-nowrap shell:gap-2.5 shell:mb-1">
            {children}
        </div>
    )
}
