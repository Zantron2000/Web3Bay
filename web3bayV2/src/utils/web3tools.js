import axios from "axios";
import { ENS } from "@ensdomains/ensjs";

// TODO - Test what happens if store.domain already exists
// const response = await ENSInstance.getName("0x426A347B9a153dd0D27Cc63640F5B14092b2563A");
// const response = await ENSInstance.getOwner("xanderpalmer.eth");
// const response = await ENSInstance.setRecord("xanderpalmer.eth", {
//   type: "text",
//   record: { key: "github", value: "hello" },
//   signer: ssx
//     .getProvider()
//     .getSigner("0x426A347B9a153dd0D27Cc63640F5B14092b2563A"),
// });

/**
 * Processes the ENS data to filter out subdomains
 *
 * @param {{ id: String, name: String, labelName: String, labelhash: String }[]} ensData The ENS domains to process
 * @returns {{ id: String, name: String, labelName: String, labelhash: String }[]} The processed ENS domains
 */
const processENSData = (ensData) => {
  return ensData?.filter((domain) => {
    const domains = domain.name.split(".");
    return domains.length === 2;
  });
};

/**
 * Gets all ENS names owned by an address and filters out subdomains
 *
 * @param {String} address The address to get the ENS names for
 * @returns {{ id: String, name: String, labelName: String, labelhash: String }[]} The parent ENS names with their names, labels, and hashes
 */
const getENSNames = async (address) => {
  const url = "https://api.thegraph.com/subgraphs/name/ensdomains/ens";
  const query = `
  {
    domains(where:{
      owner:"${address.toLowerCase()}"
    }) {
      id
      name
      labelName
      labelhash
    }
  }
  `;

  const response = await axios.post(url, { query });
  return processENSData(response.data.data.domains);
};

/**
 * Checks if a given ENS name already exists
 *
 * @param {String} ens The ENS name to check if exists
 * @returns {Boolean} If the ENS name exists
 */
const ensExists = async (ens) => {
  const url = "https://api.thegraph.com/subgraphs/name/ensdomains/ens";
  const query = `
  {
    domains(where:{
      name:"store.${ens.toLowerCase()}"
    }) {
      name
      owner {
        id
      }
    }
  }
  `;

  const response = await axios.post(url, { query });
  return (
    response.data.data.domains.length > 0 &&
    response.data.data.domains[0].owner.id !==
      "0x0000000000000000000000000000000000000000"
  );
};

/**
 * Creates a subdomain for the ENS using the store domain
 *
 * @param {String} ens The ens name to attach the store subdomain to
 * @param {import('@spruceid/ssx').SSX} ssx The ssx object to obtain information from
 * @returns {Object} The returned response from the ENS createSubname function
 */
const createStoreSubdomain = async (ens, ssx) => {
  try {
    const ENSInstance = new ENS();
    await ENSInstance.setProvider(ssx.getProvider());

    const storeSubdomain = `store.${ens}`;
    const owner = ssx?.address();

    const response = await ENSInstance.createSubname(storeSubdomain, {
      owner,
      signer: ssx.getProvider().getSigner(owner),
      contract: "registry",
    });
    await response.wait();

    return response;
  } catch (error) {
    console.log(error);

    return undefined;
  }
};

/**
 * Initializes the store content and ETH address for the ENS store
 *
 * @param {String} ens The ens name to initialize records for
 * @param {import('@spruceid/ssx').SSX} ssx The SSX provider with the session information
 * @param {String} hash The ipfs hash to set the ens name to
 * @returns {Object} The returned response from the ENS setRecords function
 */
const initializeStoreRecords = async (ens, ssx, hash) => {
  try {
    const ENSInstance = new ENS();
    await ENSInstance.setProvider(ssx.getProvider());

    const owner = ssx.address();
    const signer = ssx.getProvider().getSigner(owner);
    const contentHash = `ipfs://${hash}`;

    const response = await ENSInstance.setRecords(ens, {
      signer,
      records: { contentHash, coinTypes: [{ key: "ETH", value: owner }] },
    });

    return response;
  } catch (error) {
    console.log(error);

    return undefined;
  }
};

module.exports = {
  getENSNames,
  ensExists,
  createStoreSubdomain,
  initializeStoreRecords,
};
