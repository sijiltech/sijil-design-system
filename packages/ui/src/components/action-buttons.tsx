import * as React from "react";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "../lib/cn.js";
import { groupCardClassName, type GroupVariant } from "../lib/group-variant.js";
import { Button, type ButtonProps } from "./button.js";

/**
 * Helper class providing standardized action button classnames and styling.
 */
export class ActionButtonsHelper {
  /** Standard CSS class string for an approval action button. */
  public static readonly approveButtonClass: string =
    "h-8 text-success hover:bg-success-light dark:text-success-text transition-colors";

  /** Standard CSS class string for a refusal action button. */
  public static readonly refuseButtonClass: string =
    "h-8 text-danger hover:bg-danger-light dark:text-danger-text transition-colors";
}

export const approveButtonClass = ActionButtonsHelper.approveButtonClass;
export const refuseButtonClass = ActionButtonsHelper.refuseButtonClass;

/**
 * Properties for the {@link ApproveButton} component.
 */
export interface ApproveButtonProps extends Omit<ButtonProps, "type"> {
  /** Whether an approval mutation is loading. Defaults to false. */
  isLoading?: boolean;
  /** Custom label text. Defaults to "Approve". */
  label?: string;
}

/**
 * Standard semantic button for approving requests.
 *
 * @param props - Component configuration properties.
 * @returns React button element.
 */
export function ApproveButton({
  isLoading = false,
  label = "Approve",
  className,
  disabled,
  children,
  ...props
}: ApproveButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={disabled || isLoading}
      className={cn(approveButtonClass, "font-semibold", className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-3.5 me-1.5 animate-spin" aria-hidden="true" />
      ) : (
        <Check className="size-3.5 me-1.5" aria-hidden="true" />
      )}
      {children ?? label}
    </Button>
  );
}

/**
 * Properties for the {@link RefuseButton} component.
 */
export interface RefuseButtonProps extends Omit<ButtonProps, "type"> {
  /** Whether a refusal mutation is loading. Defaults to false. */
  isLoading?: boolean;
  /** Custom label text. Defaults to "Refuse". */
  label?: string;
}

/**
 * Standard semantic button for refusing/denying requests.
 *
 * @param props - Component configuration properties.
 * @returns React button element.
 */
export function RefuseButton({
  isLoading = false,
  label = "Refuse",
  className,
  disabled,
  children,
  ...props
}: RefuseButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={disabled || isLoading}
      className={cn(refuseButtonClass, "font-semibold", className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-3.5 me-1.5 animate-spin" aria-hidden="true" />
      ) : (
        <X className="size-3.5 me-1.5" aria-hidden="true" />
      )}
      {children ?? label}
    </Button>
  );
}

/**
 * Properties for the {@link ActionButtons} component.
 */
export interface ActionButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GroupVariant;
  /** Action handler invoked on approve click. */
  onApprove?: () => void;
  /** Action handler invoked on refuse click. */
  onRefuse?: () => void;
  /** Whether an approval mutation is loading. */
  isApproving?: boolean;
  /** Whether a refusal mutation is loading. */
  isRefusing?: boolean;
  /** Custom label for approve button. Defaults to "Approve". */
  approveLabel?: string;
  /** Custom label for refuse button. Defaults to "Refuse". */
  refuseLabel?: string;
  /** Whether both buttons are disabled. Defaults to false. */
  disabled?: boolean;
}

/**
 * Container component grouping approve and refuse action buttons.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the action buttons.
 */
export function ActionButtons({
  onApprove,
  onRefuse,
  isApproving = false,
  isRefusing = false,
  approveLabel,
  refuseLabel,
  disabled = false,
  className,
  variant = "plain",
  ...props
}: ActionButtonsProps) {
  return (
    <div
      data-slot="action-buttons"
      data-variant={variant}
      className={cn("inline-flex items-center gap-2", variant === "card" && groupCardClassName, className)}
      {...props}
    >
      {onApprove && (
        <ApproveButton
          onClick={onApprove}
          isLoading={isApproving}
          label={approveLabel}
          disabled={disabled || isRefusing}
        />
      )}
      {onRefuse && (
        <RefuseButton
          onClick={onRefuse}
          isLoading={isRefusing}
          label={refuseLabel}
          disabled={disabled || isApproving}
        />
      )}
    </div>
  );
}

