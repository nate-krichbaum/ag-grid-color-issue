import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <>
            <p>Welcome</p>
        </>
    );
}
