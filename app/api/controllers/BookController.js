import ParsingClient from "sparql-http-client/ParsingClient.js";

const endpointUrl = "https://query.wikidata.org/sparql";
const client = new ParsingClient({ endpointUrl });

export const FetchBooks = async (req, res, next) => {
  try {
    const query = `
        SELECT DISTINCT ?book ?bookLabel ?author ?authorLabel ?countryLabel ?image
            WHERE {
                ?book wdt:P31 wd:Q7725634;
                        wdt:P50 ?author.
                OPTIONAL { ?author wdt:P27 ?country. }
                OPTIONAL { ?book wdt:P18 ?image. }
                SERVICE wikibase:label {
                    bd:serviceParam wikibase:language "en".
                }
            }
            LIMIT 100
    `;
    const bindings = await client.query.select(query);
    res.status(200).json(bindings);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};
