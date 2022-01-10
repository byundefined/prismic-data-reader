import DATA_CONFIG from "../../prismic-data.config.js";
import * as prismic from "@prismicio/client";

const endpoint = prismic.getEndpoint(DATA_CONFIG.repoName);
const client = prismic.createClient(endpoint);

export const getPrismicData = async (results, filter, page = 1) => {
  const data = await client.query(filter, { pageSize: 100, page });

  results = [].concat(results, data.results);

  if (data.total_pages > page) {
    let newPage = page + 1;
    results = await getPrismicData(results, filter, newPage);
  }

  return results;
};
