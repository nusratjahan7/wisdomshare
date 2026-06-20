import { requireRole } from "@/lib/core/session";

export default async function userLayout({ children }) {
    await requireRole('user');

    return <>{children}</>;
}