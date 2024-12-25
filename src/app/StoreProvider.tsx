'use client'

import {ReactNode, useRef} from 'react'
import {Provider} from 'react-redux'

import {AppStore, makeStore} from "@/store";

interface Props {
    children: ReactNode
}

export const StoreProvider = ({children}: Props) => {
    const storeRef = useRef<AppStore>(null)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
