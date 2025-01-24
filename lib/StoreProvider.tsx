'use client'; // Esto es necesario porque React Redux no funciona en el servidor

import { Provider } from 'react-redux';
import { store } from './store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}