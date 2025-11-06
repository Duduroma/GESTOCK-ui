// Tipos globais para React (carregado via CDN)
declare const React: {
    createElement: any;
    Fragment: any;
    ReactNode: any;
    [key: string]: any;
};

declare namespace React {
    type ReactNode = any;
}

declare const ReactDOM: {
    createRoot: (container: HTMLElement) => {
        render: (element: any) => void;
    };
    [key: string]: any;
};

declare namespace JSX {
    type Element = any;
    
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
