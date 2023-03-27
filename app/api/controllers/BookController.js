import ParsingClient from "sparql-http-client/ParsingClient.js";

const endpointUrl = "https://query.wikidata.org/sparql";
const client = new ParsingClient({ endpointUrl });

export const FetchBooks = async (req, res, next) => {
  try {
    const query = `
      SELECT DISTINCT ?book ?bookLabel ?author ?authorLabel ?genre ?genreLabel ?image
        WHERE {
          ?book wdt:P31 wd:Q7725634;
                wdt:P50 ?author.
          OPTIONAL { ?book wdt:P136 ?genre. }
          OPTIONAL { ?book wdt:P18 ?image. }
          SERVICE wikibase:label {
            bd:serviceParam wikibase:language "en".
            ?author rdfs:label ?authorLabel.
            ?book rdfs:label ?bookLabel.
            ?genre rdfs:label ?genreLabel.
          }
        }
      LIMIT 1000
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
      }`;
    const book = await client.query.select(query);
    res.status(200).json(book);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

export const FetchFavoriteBooks = async (req, res, next) => {
  try {
    const response = [];
    for (var i = 0; i < req.body.bookIDs.length; i++) {
      const query = `
      SELECT DISTINCT ?book ?bookLabel ?author ?authorLabel ?genre ?genreLabel ?image
        WHERE {
          BIND(wd:${req.body.bookIDs[i]} AS ?book)
          ?book wdt:P50 ?author.
          OPTIONAL { ?book wdt:P136 ?genre. }
          OPTIONAL { ?book wdt:P18 ?image. }
          SERVICE wikibase:label {
            bd:serviceParam wikibase:language "en".
            ?author rdfs:label ?authorLabel.
            ?book rdfs:label ?bookLabel.
            ?genre rdfs:label ?genreLabel.
          }
        } LIMIT 1
      `;
      const book = await client.query.select(query);
      response.push(book[0]);
    }
    res.status(200).json(response);
  } catch (error) {}
};
