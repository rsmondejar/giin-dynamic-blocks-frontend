import type {Metadata} from "next";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard description page VIU GIIN Dynamic Blocks"
};

export default function LoginPage() {
    return (
        <>
            <Dashboard/>
            <section>
                <h2>TODO: Listado de formularios activos</h2>
                <p>TODO: Agregar botón para crear uno nuevo</p>
            </section>
            <section>
                <h2>TODO: Listado de todos los formularios</h2>
            </section>
        </>
    )
}

