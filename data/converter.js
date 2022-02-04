const fs = require("fs");
const Parser = require("csv-parse");
// const contentful = require("contentful-management");

// const client = contentful.createClient({
//   accessToken: "<token>",
// });

async function main() {
  //   const space = await client.getSpace("sz46leejek73");
  //   const environment = await space.getEnvironment("<envId>");
  const parser = new Parser({ delimiter: ",", columns: true });
  const readStream = fs.createReadStream("./movies.csv").pipe(parser);

  for await (const chunk of readStream) {
    const entry = await rowToEntry(environment, chunk);
    console.log(entry);
    entry.publish();
  }
}

async function rowToEntry(env, row) {
  const date = new Date(row.Finished.replace("-", "/"));
  return await env.createEntry("movie", {
    fields: {
      title: {
        "en-US": row.Title,
      },
      dateCompleted: {
        "en-US": date.toISOString(),
      },
      expectedRating: {
        "en-US": parseInt(row.Expected),
      },
      rating: {
        "en-US": parseInt(row["Rating (of 5)"]),
      },
    },
  });
}

main().catch(console.error);
