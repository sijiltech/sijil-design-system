import type { DesignFamilyDefinition } from "./design-family.js";
import { sijilFamily } from "./sijil.js";

/**
 * Attribute that selects the active design family. It must be set on the
 * `<html>` element so that portal-rendered content (dialogs, popovers,
 * dropdowns) inherits the family tokens as well.
 */
export const DESIGN_FAMILY_ATTRIBUTE = "data-ds-family";

/** Every design family known to the package. Add new families here. */
export const designFamilies = [sijilFamily] as const satisfies readonly DesignFamilyDefinition[];

/** Id of any registered design family. */
export type DesignFamilyId = (typeof designFamilies)[number]["id"];

/** Family used when the consumer does not choose one. */
export const DEFAULT_DESIGN_FAMILY: DesignFamilyId = sijilFamily.id;

