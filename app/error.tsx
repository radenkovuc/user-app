'use client'

import {Metadata} from "next";

import Header from "@/src/components/header";
import Body from "@/src/components/body";

export const metadata: Metadata = {
    title: "Error",
    description: "Something went wrong"
}

const ErrorPage = () => (
    <>
        <Header title="Error"/>
        <Body>
            <div>Something went wrong</div>
        </Body>
    </>)

export default ErrorPage