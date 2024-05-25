import React from "react";

import type {Metadata} from "next";
import FormsCreate from "@/components/FormsCreate";

export const metadata: Metadata = {
    title: "Crear nuevo formulario",
    description: "Create new form description page VIU GIIN Dynamic Blocks"
};

export default function FormsCreatePage() {
    return (
        <FormsCreate />
    );
}
