import type { Metadata } from "next";
import { NotFoundForm } from "@/components/forms/not-found-form";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "404 Not Found | Sortopedia",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <Empty className="min-h-screen">
      <EmptyHeader>
        <BookOpen className="size-6 text-primary" />
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <NotFoundForm />
      </EmptyContent>
    </Empty>
  );
}
