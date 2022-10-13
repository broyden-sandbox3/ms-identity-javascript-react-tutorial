import { Client, PageIterator } from '@microsoft/microsoft-graph-client';
import { protectedResources } from './authConfig';

/**
 * Creating a Graph client instance via options method. For more information, visit:
 * https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs/CreatingClientInstance.md#2-create-with-options
 * @param {String} accessToken
 * @returns
 */
const getGraphClient = (accessToken) => {
    // Initialize Graph client
    const graphClient = Client.init({
        // Use the provided access token to authenticate requests
        authProvider: (done) => {
            done(null, accessToken);
        },
    });

    return graphClient;
};

/**
 * Calls the Microsoft Graph API and returns the results
 * @param {String} accessToken 
 * @param {Array} filterGroups 
 * @returns 
 */
export const getFilteredGroups = async (accessToken, filterGroups = []) => {
    const groups = [];

    try {
        // Get a graph client instance for the given access token
        const graphClient = getGraphClient(accessToken);

        const selectQuery = "id,displayName,onPremisesNetBiosName,onPremisesDomainName,onPremisesSamAccountNameonPremisesSecurityIdentifier";
            
        // Makes request to fetch groups list, which is expected to have multiple pages of data.
        let response = await graphClient.api(protectedResources.apiGraph.endpoint).select(selectQuery).get();

        // A callback function to be called for every item in the collection. This call back should return boolean indicating whether not to continue the iteration process.
        let callback = (data) => {
            if (data.id && filterGroups.includes(data.id)) groups.push(data.id); // Add the group id to the groups array
            if (filterGroups.filter(x => !groups.includes(x)).length === 0) return false; // Stop iterating if all the required groups are found
            return true;
        };

        // Creating a new page iterator instance with client a graph client instance, page collection response from request and callback
        let pageIterator = new PageIterator(graphClient, response, callback);

        // This iterates the collection until the nextLink is drained out.
        await pageIterator.iterate();

        return groups;
    } catch (error) {
        console.log(error);
    }
}