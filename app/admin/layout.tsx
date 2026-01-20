'use client'

import { usePathname } from "next/navigation";
import { useRouteGurd } from "./_hooks/useRouteGuard";
import React from "react";
import AdminSidebar  from "../_components/sidebar/sidebar";
import StyleSheet from "./layout.module.css";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
    }){
        useRouteGurd()



        return(
            <div className={StyleSheet.container}>
                <AdminSidebar />
                <main className={StyleSheet.main}>{children}</main>
            </div>
        )
    }