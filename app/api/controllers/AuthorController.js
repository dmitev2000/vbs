import ParsingClient from "sparql-http-client/ParsingClient.js";

const endpointUrl = "https://query.wikidata.org/sparql";
const client = new ParsingClient({ endpointUrl });

export const GetAuthorByID = async (req, res, next) => {
  try {
    const query1 = `
    SELECT DISTINCT ?image ?nameLabel
    WHERE {
        wd:${req.body.id} rdfs:label ?nameLabel.
        FILTER(LANG(?nameLabel) = 'en')
        OPTIONAL { wd:${req.body.id} wdt:P18 ?image. }
      } LIMIT 1
      `;
    const query2 = `
    SELECT DISTINCT ?notableWork ?notableWorkLabel WHERE {
        wd:${req.body.id} wdt:P800 ?notableWork.
        SERVICE wikibase:label {
          bd:serviceParam wikibase:language "en".
        }
      }
    `;
    const author = await client.query.select(query1);
    const notableWork = await client.query.select(query2);
    res.status(200).json({ author: author, notableWork: notableWork });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
