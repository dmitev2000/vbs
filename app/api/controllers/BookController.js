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
            LIMIT 10
    `;
    const bindings = await client.query.select(query);
    res.status(200).json(bindings);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

export const GetBookByID = async (req, res, next) => {
  try {
    const query = `
      SELECT ?book ?bookLabel ?bookDescription ?image ?title ?author ?authorLabel ?instanceOfLabel ?date
        WHERE {
          BIND(wd:${req.body.id} AS ?book)
          ?book rdfs:label ?bookLabel .
          FILTER(LANG(?bookLabel) = "en")
          OPTIONAL { ?book schema:description ?bookDescription .
                    FILTER(LANG(?bookDescription) = "en") }
          OPTIONAL { ?book wdt:P18 ?image . }
          OPTIONAL { ?book wdt:P1476 ?title . }
          OPTIONAL {
            ?book p:P50 ?statement .
            ?statement ps:P50 ?author .
            ?author rdfs:label ?authorLabel .
            FILTER(LANG(?authorLabel) = "en")
          }
          ?book wdt:P31 ?instanceOf.
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
          OPTIONAL { ?book wdt:P577 ?date. }
      }`
    const book = await client.query.select(query);    
    res.status(200).json(book);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
