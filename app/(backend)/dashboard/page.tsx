import type {Metadata} from "next";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard description page VIU GIIN Dynamic Blocks"
};

export default function LoginPage() {
    return (
        <Dashboard/>
    )
}

