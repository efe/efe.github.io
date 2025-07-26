---
title: "The beautiful baby of GraphQL and RESTful"
publishedAt: '2026-07-08'
category: 'api'
isFeatured: true
---

The debate between proponents of GraphQL and RESTful APIs seems never-ending.

GraphQL stands out by allowing clients to specify exactly what data they want to retrieve in a single request, reducing both [over-fetching and under-fetching](https://stackoverflow.com/a/44568365). However, It can run into [challenges with deeply nested queries](https://hygraph.com/blog/graphql-pain-points) and there are known performance concerns that require careful handling or specific optimizations.

REST APIs emphasize resource-oriented design with clear separation of concerns (different endpoints for different resources) and predictable URL structures (detail and resource endpoints). It makes them well-suited for straightforward CRUD operations. Their alignment with HTTP semantics also supports mature caching and status handling, giving backend developers more explicit control over resource management and optimization. As your application grows and scales, There will be more data in the response. However, you’ll see that [not all API consumers need all the data in the respone](https://softwareengineering.stackexchange.com/questions/454478/how-to-maintain-consistency-when-retrieving-partial-vs-full-data-in-an-api-reso?utm_source=chatgpt.com).

Can we make peace and learn from each other? **Yes, RestfulQL!**

## Design Details

### Creates, Updates and Deletes (Mutations)

For creating, updating and deleting data, I prefer to retain the conventional REST approach. In my view, it’s simply more practical. Handling the creation of multiple objects in a single request, as GraphQL allows, can quickly become problematic. If part of the request fails, it forces tough decisions: should everything fail or only the problematic items? Partial failures can frustrate users and often require implementing rollback endpoints to let users undo operations if they change their minds. What about side effects of the action to rollback? Keeping mutations in REST keeps this logic clear, predictable and easier to manage from the backend perspective.

### Retrieves (Queries)

This is the place when GraphQL shines. API Consumer can just set

### Adaptation

According to [Postman’s 2023 State of the API report](https://blog.postman.com/graphql-vs-rest/), 86% of developers use REST, while 29% use GraphQL. This is the the latest large-scope survey I could found about usage of these two camps.

There are already some API Specifications which 