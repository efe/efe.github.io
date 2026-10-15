---
title: "Djangoday Copenhagen 2026 and Secrets"
publishedAt: '2026-10-15'
category: 'django'
isFeatured: true
---
On October 2nd, I gave a talk at [Django Day Copenhagen 2026](https://2026.djangoday.dk/) about **Keeping secrets secret in Django**. It was my second time attending Django Day Copenhagen, but this time I was also on stage!

The idea for the talk came while I was working on [django-root-secret](https://github.com/efe/django-root-secret), a small package I built to simplify managing secrets in Django projects. The idea behind the package actually goes back to my days at Hipo.

I started researching how Django uses `SECRET_KEY` internally while developing the package. I've been using Django for years, and I had a rough idea that it was used for cryptographic signing, but I didn't know exactly how it worked or where Django relied on it.

It turned into a nice journey through cryptographic signing, key management and some security concepts I thought I already understood.

One of the main messages I wanted to deliver was that **cryptographic signing is another way of validating information**. Instead of asking a database or an external service whether something is valid, we can sometimes verify it ourselves using a single secret key.

What I find particularly interesting is that we don't necessarily need to store every value in our backend. We can let the client hold the signed data and verify its authenticity when it comes back. It's a nice trade-off between storing state and verifying it cryptographically, although it also makes things like revoking individual values more complicated.

I find this idea quite fascinating, but explaining it without getting lost in cryptographic terminology was another challenge.

Instead of the boring [Alice and Bob](https://en.wikipedia.org/wiki/Alice_and_Bob) examples we usually see in cryptography tutorials, I used boarding-pass fraud and a pair of special sunglasses that reveal whether a ticket has been tampered with.

The sunglasses were inspired by [They Live](https://en.wikipedia.org/wiki/They_Live), John Carpenter's 1988 movie. I recently watched it at LAB111 in Amsterdam and loved it. It has the ridiculous charm of an 80s action movie, mixed with a political sci-fi twist. Somehow, those sunglasses ended up being the perfect way to explain cryptographic signing.

I won't repeat the technical details here. You can [watch the presentation](https://www.youtube.com/watch?v=CNlFyiRL1J4) or check out [the slides](/pdfs/keeping-secrets-secret-in-django-djangoday-copenhagen-2026.pdf).

## Conversations about secrets

One of the nice things about giving a conference talk is that you get to discuss your topic with people who have solved the same problems in different ways.

I was curious about how others manage their application secrets.

Most people I talked to relied on their CI/CD or deployment infrastructure to provide secrets to the running application. Tools like Ansible Vault and Kubernetes came up frequently. Eventually, the application receives its secrets through environment variables or configuration files.

My approach with `django-root-secret` is a bit different. I wanted to reduce the number of secrets that need to be distributed to each environment by encrypting them with a single root key.

I'm not convinced there is one correct approach for every project. In fact, those conversations made me think more about the trade-offs. Secret management is not only about where you store credentials, but also who can access them and how easily you can replace them.

One interesting question that came up was **how often we should rotate cryptographic keys**.

I didn't have a good answer. And I still don't.

We know that compromised keys need to be replaced, but should we routinely rotate keys even when there is no indication of a leak? How frequently? Does the operational complexity justify the additional security?

I have more reading to do about this.

I've also become more curious about cryptographic algorithms, particularly elliptic-curve cryptography and asymmetric signing. As a backend developer, I've mostly been consuming cryptographic libraries rather than understanding their internals.

Maybe this could be a topic for another talk!

## Talks that inspired me

Apart from my own talk, there were several presentations that stayed with me.

**Paris's talk about fully asynchronous Python** was impressive. They have been working on Fakos, an observability project that could serve as a lightweight alternative to Sentry.

What impressed me most was their work on an asyncio-native SQLite driver and making it work with Django's ORM, without relying on sync_to_async and thread pools. It's fascinating to see how far you can push Django and SQLite with a single asyncio event loop.

I really enjoy this kind of engineering, where people challenge the limitations of familiar tools instead of immediately reaching for more infrastructure.

**Marijke's talk about Django Admin** reminded me of my [BlogTO](https://blogto.com) days.

Django Admin is one of the strongest parts of Django, yet I think many developers still don't know how to fly with it. People are often quick to reach for a custom frontend, even when Django Admin could handle most of their requirements.

Actually, it gave me an idea. What if we organized a workshop similar to Django Girls, but entirely dedicated to Django Admin? Participants could build a useful back-office application in a day and discover how much can be achieved with very little code.

**Denny's talk about timezones** brought back memories of a production bug I introduced at [Avocare](https://x.com/avocarehealth).

We were building a scheduling system for doctors. Each doctor had recurring weekly working hours, and we created `TimeSlot` instances using range fields, similar to Google Calendar's recurring events.

To generate the following week's schedule, I was shifting the existing time slots in UTC by adding 24 hours for each day.

Everything worked fine until March.

We received a bug report that doctors' schedules had shifted by one hour after the daylight saving time change!

It turned out that I was performing the date arithmetic in UTC, while I should have been doing it in the doctor's local timezone. A doctor who works at 09:00 should still work at 09:00 after daylight saving time, even though the corresponding UTC time changes.

It was a nice reminder that **a calendar day and 24 hours are not always the same thing**.

Denny explained it very well. I wish I had attended his talk a few years earlier!

**Mohammad's talk about pre-commit** was another useful one. I've been using pre-commit for years, but some of my configurations are probably outdated by now. There are newer tools and better ways of running quality checks for Django projects. Benjamin also mentioned running pre-commit inside Docker during lightning talks, which I thought was a great touch for keeping host isolated.

**Tom Carrick's talk about rate limiting** was also interesting. It's one of those topics that sounds simple at first, but gets considerably more complicated once you start thinking about production systems.

The lightning talks brought some unexpected discoveries too. Hacker camps made their way onto my list of things I want to experience. **Dennis's talk about `human.json`** introduced me to a protocol I hadn't heard of before.

That's one of my favourite things about conferences. You don't necessarily have to learn something groundbreaking. Sometimes you just hear about a small project, a tool or an idea that sends you down a rabbit hole when you get home.

## Django Day Amsterdam?

This was my second time at Django Day Copenhagen, and I really like the format.

It is a small, single-track conference where everybody attends the same talks. The atmosphere is friendly and it is easy to start conversations with other developers during the breaks. I think this format works particularly well for a community like Django.

I'd love to see something similar in Amsterdam.

We've been working on building a local Django community with [DjangoNL](https://djangonl.com/). Once we establish a good cadence with regular meetups, organizing a **Django Day Amsterdam** could be a great next step.

There are plenty of experienced Django developers in the Netherlands, and I'm sure many have interesting stories to share.

Thanks to the organizers, volunteers, speakers and everyone I had a chance to talk with at Django Day Copenhagen.

🇩🇰