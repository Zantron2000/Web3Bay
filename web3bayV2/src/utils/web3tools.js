import axios from "axios";

const processENSData = (ensData) => {
  return ensData?.filter((domain) => {
    const domains = domain.name.split(".");
    return domains.length === 2;
  });
};

const getENSNames = async (address) => {
  const url = "https://api.thegraph.com/subgraphs/name/ensdomains/ens";
  const query = `
  {
    domains(first: 5, where:{
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
  return processENSData(response?.data?.domains);
};

const ensExists = async (ens) => {
  const url = "https://api.thegraph.com/subgraphs/name/ensdomains/ens";
  const query = `
  {
    domains(where:{
      name:"${ens.toLowerCase()}"
    }) {
      name
    }
  }
  `;

  const response = await axios.post(url, { query });
  return response?.data?.domains?.length > 0;
};

module.exports = {
  getENSNames,
  ensExists,
};
