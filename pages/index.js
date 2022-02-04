import { createClient } from "contentful";

import React, { useState } from "react";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "revision" });

  return {
    props: {
      revision: res.items,
    },
  };
}

export default function Recipes({ revision }) {
  const [subject, setSubject] = useState("computing");
  const [tier, setTier] = useState("Higher");
  console.log(revision);
  const filtered = revision
    .filter((r) => r.fields.subject === subject)
    .filter((t) => t.fields.tier === tier);

  console.log(filtered);

  return <div className="recipe-list">Recipe List</div>;
}
