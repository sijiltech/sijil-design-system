import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Separator,
  Skeleton,
  Suspense,
  SuspenseFallback,
} from "@sijil/ui";

const avatar = new URL("./assets/sample-avatar.png", import.meta.url).href;

const meta = { title: "Components/Feedback and Display" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const UserAvatars: Story = {
  name: "Avatar",
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={avatar} alt="" />
          <AvatarFallback>MA</AvatarFallback>
        </Avatar>
        <span className="text-sm">Maya Ali</span>
      </div>
      <Separator orientation="vertical" className="h-8" />
      <div className="flex items-center gap-2">
        <Avatar><AvatarFallback>LS</AvatarFallback></Avatar>
        <span className="text-sm">Leila Saleh</span>
      </div>
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  name: "Skeleton",
  render: () => (
    <div className="flex max-w-sm items-center gap-3" aria-busy="true" aria-label="Loading profile">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ),
};

function LoadedRequest({ result }: { result: Promise<string> }) {
  return <p className="rounded-2xl bg-card p-4 text-sm" role="status">{React.use(result)}</p>;
}

export const LoadingBoundary: Story = {
  name: "Suspense",
  render: function LoadingBoundary() {
    const [result, setResult] = React.useState(() => Promise.resolve("Request details loaded."));

    return (
      <div className="max-w-sm space-y-3">
        <Button
          variant="outline"
          onClick={() => setResult(new Promise<string>((resolve) => {
            window.setTimeout(() => resolve("Request details reloaded."), 900);
          }))}
        >
          Reload request
        </Button>
        <Suspense variant="card" text="Loading request details…">
          <LoadedRequest result={result} />
        </Suspense>
      </div>
    );
  },
};

export const LoadingVariants: Story = {
  name: "Suspense Fallback",
  render: () => (
    <div className="max-w-sm space-y-3">
      <SuspenseFallback variant="inline" text="Saving changes…" />
      <SuspenseFallback variant="card" text="Loading request details…" minHeight={120} />
    </div>
  ),
};
