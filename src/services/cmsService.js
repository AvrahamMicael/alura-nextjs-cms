export default async function cmsService({ query, variables = {} }) {
  const data = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + process.env.CMS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })
  .then(async res => {
    const body = await res.json();
    if(!res.ok || body.errors) throw new Error(JSON.stringify(body));
    return body.data;
  });
  return { data };
}
