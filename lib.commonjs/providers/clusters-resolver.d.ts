/**
 *  Clusters is a service which allows easy-to-remember names to map to
 *  multiple network addresses of varying types.
 */
import type { AbstractProvider } from "./abstract-provider.js";
/**
 *  A Clusters domain name resolver.
 */
export declare class ClustersResolver {
    /**
     *  The connected provider.
     */
    provider: AbstractProvider;
    /**
     *  The address of the resolver. (UNUSED)
     *  Overridden to return true and calm compiler complaints.
     */
    address: string;
    /**
     *  The name this resolver was resolved against.
     */
    name: string;
    constructor(provider: AbstractProvider, name: string);
    /**
     *  Resolves to the address for the initialized name.
     */
    getAddress(): Promise<null | string>;
    /**
     *  Resolves to the name for %%address%%.
     */
    getName(address: string): Promise<null | string>;
    /**
     *  Resolves the entire Cluster for the initialized name.
     */
    getCluster(): Promise<null | string[]>;
    /**
     *  Resolves to the avatar url or ``null``.
     */
    getAvatar(): Promise<null | string>;
    /**
     *  Resolve to the Clusters resolver for %%name%% using %%provider%% or
     *  ``null`` if unconfigured.
     */
    static getResolver(provider: AbstractProvider, name: string): Promise<ClustersResolver>;
    /**
     *  Overridden to return true and calm compiler complaints.
     */
    supportsWildcard(): Promise<boolean>;
}
//# sourceMappingURL=clusters-resolver.d.ts.map