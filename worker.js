addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method !== "POST") {
    return new Response("Only POST requests allowed", { status: 405 });
  }

  const { productId, options } = await request.json();
  
  const shopifyResponse = await fetch(
    `https://${c23bii-x0}.myshopify.com/admin/api/2023-04/products/${productId}/metafields.json`,
    {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": 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,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        metafield: {
          namespace: "custom_options",
          key: "product_options",
          value: JSON.stringify(options),
          type: "json_string"
        }
      })
    }
  );

  return new Response(await shopifyResponse.text(), {
    headers: { "Content-Type": "application/json" },
  });
}
