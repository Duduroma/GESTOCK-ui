

// JSX namespace é necessário para JSX.Element funcionar
declare namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
