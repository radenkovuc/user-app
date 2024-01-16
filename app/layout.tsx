import type {Metadata} from 'next'
import {ReactNode} from "react";

import './globals.css'

interface Props {
    children: ReactNode
}

export const metadata: Metadata = {
    title: 'Home',
    description: 'Description',
}

const RootLayout = ({children}: Props) => (
    <html lang="en">
    <body>{children}</body>
    </html>
)

export default RootLayout

