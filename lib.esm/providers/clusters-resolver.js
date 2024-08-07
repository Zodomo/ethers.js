/**
 *  Clusters is a service which allows easy-to-remember names to map to
 *  multiple network addresses of varying types.
 */
import { getAddress } from "../address/index.js";
import { defineProperties } from "../utils/index.js";
/**
 *  A Clusters domain name resolver.
 */
export class ClustersResolver {
    /**
     *  The connected provider.
     */
    provider;
    /**
     *  The address of the resolver. (UNUSED)
     *  Overridden to return true and calm compiler complaints.
     */
    address;
    /**
     *  The name this resolver was resolved against.
     */
    name;
    constructor(provider, name) {
        defineProperties(this, { provider, name });
    }
    /**
     *  Resolves to the address for the initialized name.
     */
    async getAddress() {
        try {
            const response = await fetch(`https://api.clusters.xyz/v0.1/address/${this.name}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data == null)
                return null;
            return getAddress(data.address);
        }
        catch (error) {
            console.error("There was a problem fetching the address:", error);
            throw error;
        }
    }
    /**
     *  Resolves to the name for %%address%%.
     */
    async getName(address) {
        try {
            address = getAddress(address);
            const response = await fetch(`https://api.clusters.xyz/v0.1/name/${address}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("There was a problem fetching the name:", error);
            throw error;
        }
    }
    /**
     *  Resolves the entire Cluster for the initialized name.
     */
    async getCluster() {
        try {
            const delimiterIndex = this.name.indexOf("/");
            const cluster = delimiterIndex === -1
                ? this.name
                : this.name.substring(0, delimiterIndex);
            const response = await fetch(`https://api.clusters.xyz/v0.1/cluster/${cluster}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data == null)
                return null;
            // Extract addresses from the wallets array
            const addresses = data.wallets.map((wallet) => getAddress(wallet.address));
            // Sort addresses in alphanumeric ascending order
            return addresses.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        }
        catch (error) {
            console.error("There was a problem fetching the address:", error);
            throw error;
        }
    }
    /**
     *  Resolves to the avatar url or ``null``.
     */
    async getAvatar() {
        try {
            const delimiterIndex = this.name.indexOf("/");
            const cluster = delimiterIndex === -1
                ? this.name
                : this.name.substring(0, delimiterIndex);
            const response = await fetch(`https://api.clusters.xyz/v0.1/cluster/${cluster}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data == null)
                return null;
            return data.imageUrl;
        }
        catch (error) {
            console.error("There was a problem fetching the Cluster avatar:", error);
            throw error;
        }
    }
    /**
     *  Resolve to the Clusters resolver for %%name%% using %%provider%% or
     *  ``null`` if unconfigured.
     */
    static async getResolver(provider, name) {
        return new ClustersResolver(provider, name);
    }
    /**
     *  Overridden to return true and calm compiler complaints.
     */
    async supportsWildcard() {
        return true;
    }
}
//# sourceMappingURL=clusters-resolver.js.map