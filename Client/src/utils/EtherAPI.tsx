import axios from "axios";

const RPC_PROVIDER_URL = process.env.RPC_PROVIDER_URL;

if (!RPC_PROVIDER_URL) {
    throw new Error("RPC_PROVIDER_URL is not defined in the environment variables.");
}

/**
 * Fetches data from the specified RPC provider URL.
 *
 * @returns {Promise<any>} A promise that resolves to the data fetched from the RPC provider.
 * @throws Will throw an error if the request fails.
 *
 * @example
 * ```typescript
 * fetchData().then(data => {
 *     console.log(data);
 * }).catch(error => {
 *     console.error("Error fetching data:", error);
 * });
 * ```
 *
 * @remark This is just an example of how to use the fetchData function.
 */

export const fetchData = async () => {
    try {
        const response = await axios.get(RPC_PROVIDER_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
