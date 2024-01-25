import type {Metadata} from 'next'
import {ReactNode} from "react";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';

import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface Props {
    children: ReactNode
}

export const metadata: Metadata = {
    title: 'Home',
    description: 'Description',
}

const RootLayout = ({children}: Props) => (
    <html lang="en">
    <body>
    <AppRouterCacheProvider options={{enableCssLayer: true}}>
        {children}
    </AppRouterCacheProvider>
    </body>
    </html>
)

export default RootLayout

