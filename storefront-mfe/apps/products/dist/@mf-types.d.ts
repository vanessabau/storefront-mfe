
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/ProductList';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/ProductList' ? typeof import('REMOTE_ALIAS_IDENTIFIER/ProductList') :any;