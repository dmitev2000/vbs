import ParsingClient from "sparql-http-client/ParsingClient.js";

const endpointUrl = "https://query.wikidata.org/sparql";
const client = new ParsingClient({ endpointUrl });

export const GetAuthorByID = async (req, res, next) => {
  try {
    const query1 = `
    SELECT DISTINCT ?nameLabel ?image ?birthDate ?birthPlaceLabel ?movementLabel ?citizenshipLabel ?lastWords ?deathPlaceLabel ?deathDate
      WHERE {
        wd:${req.body.id} rdfs:label ?nameLabel.
        FILTER(LANG(?nameLabel) = 'en')
        OPTIONAL { wd:${req.body.id} wdt:P18 ?image. }
        OPTIONAL { wd:${req.body.id} wdt:P569 ?birthDate. }
        OPTIONAL { wd:${req.body.id} wdt:P19 ?birthPlace. }
        OPTIONAL { wd:${req.body.id} wdt:P135 ?movement. }
        OPTIONAL { wd:${req.body.id} wdt:P27 ?citizenship. }
        OPTIONAL { wd:${req.body.id} wdt:P570 ?deathDate. }
        OPTIONAL { wd:${req.body.id} wdt:P20 ?deathPlace. }
        OPTIONAL { wd:${req.body.id} wdt:P3909 ?lastWords. }
        
        SERVICE wikibase:label {
          bd:serviceParam wikibase:language "en".
          ?birthPlace rdfs:label ?birthPlaceLabel.
          ?movement rdfs:label ?movementLabel.
          ?citizenship rdfs:label ?citizenshipLabel.
          ?deathPlace rdfs:label ?deathPlaceLabel.
        }
      } LIMIT 1
      `;
    const query2 = `
    SELECT DISTINCT ?notableWork ?notableWorkLabel 
      WHERE {
        wd:${req.body.id} wdt:P800 ?notableWork.
        SERVICE wikibase:label {
          bd:serviceParam wikibase:language "en".
        }
      }
    `;
    const query3 = `
    SELECT DISTINCT ?occupationLabel
      WHERE {
        wd:${req.body.id} p:P106 ?statement.
        ?statement ps:P106 ?occupation.
        ?occupation rdfs:label ?occupationLabel.
        FILTER(LANG(?occupationLabel) = 'en')
      }
    `;
    const query4 = `
    SELECT DISTINCT ?educatedAtLabel
      WHERE {
        OPTIONAL { wd:${req.body.id} wdt:P69 ?educatedAt. 
          ?educatedAt rdfs:label ?educatedAtLabel.
          FILTER(LANG(?educatedAtLabel) = 'en')
        }
      }
    `;

    const author = await client.query.select(query1);
    const notableWork = await client.query.select(query2);
    const occupations = await client.query.select(query3);
    const education = await client.query.select(query4);

    res
      .status(200)
      .json({
        author: author,
        notableWork: notableWork,
        occupations: occupations,
        education: education,
      });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
