---
title: "Peaceful Django Migrations in DjangoConUS 2025"
publishedAt: '2025-09-07'
category: 'conference-talks'
---

> Django’s migration framework is a powerful tool for evolving your database schema, but with great power comes great responsibility. In production systems, the wrong migration at the wrong time can introduce serious performance issues or even temporary outages.
> This talk demystifies what actually happens during makemigrations, migrate, and sqlmigrate, explains how Django interacts with the database engine, and highlights the locking behavior that can impact availability. Through real-world examples, we’ll explore schema changes that are especially risky—such as adding columns with defaults or modifying indexes—and how to spot them in advance using Django’s tools and external linters like Squawk.
> Attendees will leave with a practical toolkit of strategies for minimizing risk, including safe migration patterns, multi-step deployment techniques, and tips for planning changes during low-traffic windows. Whether you're running a high-traffic SaaS product or a growing internal tool, you'll walk away ready to make database changes with confidence.

I'll present this topic as “Peaceful Django Migrations” at [DjangoConUS 2025](https://2025.djangocon.us/talks/peaceful-django-migrations/), held in Chicago on September 8, 2025. 

The PDF slides are available [here](https://efe.me/pdfs/peaceful-django-migrations-djangocon-us-2025.pdf).
