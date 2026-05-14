---
title: "The birth of yesglot.com"
publishedAt: '2026-05-14'
category: 'founder'
isFeatured: true
---

> The villagers counted reasons. <br>
> The Hodja carried yeast.<br>
> By evening, only one of them was right.

![Hodja at the lake](public/images/posts/birth-of-yesglot/hodja-lake.png)

## **On April 21st, 2025**, I was at DjangoCon Europe 2025 in Dublin.

I was listening to talks with my dear friends from my first company, [Hipo](https://hipolabs.com/). Aside from a few good sessions, I felt a bit disconnected. Just outside the venue, Google had released Gemini 2.5 Pro, the first model to exceed a 1M context window. It had become possible to feed an entire book into context without worrying about limits. That felt like a huge shift. Meanwhile, the conference talks had been curated months earlier and were mostly about "the usual stuff". I started thinking: if I wanted to bring something new, something that's only possible with recent LLMs, to the Django ecosystem, what would I build? I couldn't shake the thought.

![Dublin](public/images/posts/birth-of-yesglot/dublin-hipo.jpg)

I came back to Eindhoven and, as before Dublin, found myself unfulfilled at my day job. I was working on a small slice of a large project with limited authority. But one problem was hard to ignore: the product served nine different languages and the translation workflow was a headache. We had documentation, but it was long enough that nobody actually read it. People ended up asking each other for help every single time.

I thought translation could be made so much simpler. The third-party tool we were using was designed in an era when AI-driven translations were poor and human translators were essential. You'd submit your text, wait for a human to translate it and get it back whenever the job was done. Machine translation has obviously gotten much better, but this push-pull architecture never changed. Since these platforms were built for the old paradigm and still need to support it, they can't simplify the flow.

If you know Django, I can be more specific. I imagined a new management command: *python manage.py translatemessages*. It fits perfectly between *manage.py makemessages* and *manage.py compilemessages*. It grabs all untranslated strings, batches them, sends them to an LLM and writes the results back. Simple. No push, no pull. I submitted proposals to Django and Python conferences to pitch the idea.

I shared the idea with my manager. I was excited, he was not. Instead of encouragement, I got a lecture on priorities, buy-over-build decisions and the kind of jargon that tends to kill ideas before they start.

## **On 12th of June 2025**, I received an email.

> We’re thrilled to inform you that your proposal ‘Multilingual Django Applications with a sprinkle of AI’ has been accepted for the PyCon Greece 2025 programme!

After that, there was no turning back.

The prototype came together nicely and I even ran it on the service I was responsible for at work. I mentioned this to my manager, part of me expecting him to say "*That's great, Efe! Let's roll this out across all our Django microservices.*" He didn't. There was already another initiative underway for translation workflows, complete with three epics: requirements gathering, proof of concept, and implementation. **I had something working; they had a roadmap.**

Back at Hipo, I could convince the one person in charge with a conversation at the whiteboard. Now it required a chain of approvals and a lengthy "nobody reads this but it's long enough to get buy-in" document. I couldn't convince myself it was real work.

## On July 7th, 2025, I registered yesglot.com on Namecheap.

The more I thought about it, the more I believed this wasn't just my company's problem. Translation is one of those shared concerns that nobody wants to own and everybody struggles with, especially once you move to microservices.

## On August 18th, 2025, I gave the talk I'd prepared for PyCon Greece at an internal company meetup.

I walked through how it worked and showed that it was already ready to use. Afterward, I was hoping people would come up to me, maybe an engineering manager who wanted to try it in their project. But nobody did. There was just silence after the talk.

## On 30th of August, 2025, I presented the Yesglot open source package on stage in Athens.

![PyCon Greece 2025](public/images/posts/birth-of-yesglot/pycon-greece.png)

Afterward, people came up to ask if it worked with Greek. The feedback was warm, mostly positive, with some reasonable skepticism about AI translation quality. It just came out from my mouth, "Translation is like the weather. There's always someone who can find something to complain about".

After months of feeling invisible at work, standing on that stage and getting a real reaction meant a lot. It convinced me to push yesglot.com beyond Django and make it work for any framework or technology.
The momentum didn't stop there. The package got featured in the Django Newsletter, picked up around 100 stars and the PyPI download stats showed daily usage. People weren't just starring it out of curiosity; they were actually using it.

## On 24th of September, 2025, I’ve started to write specs of yesglot.com.

The open source package solved the Django case well, but yesglot.com had bigger ambitions. It needed to work for any framework or technology, from React to Ruby on Rails. There's no universal [settings.py](https://docs.djangoproject.com/en/6.0/topics/settings/).

I looked at how other platforms handled this. They all leaned on heavy UIs, with documentation full of screenshots and step-by-step click instructions. **Too much UI for too little UX.**

I went back to something that worked. In 2018, I was building a custom ERP and we used Terraform for the first time. The same configs worked across multiple projects because our setups were so similar. That later turned into a Cookiecutter template for new projects. Could I bring that same Infrastructure-as-Code thinking to yesglot.com? Yes, That's how [yesglot.toml](https://github.com/yesglot/yesglot.toml) came to be, a single configuration file at the root of your repository. **No dashboards, no setup wizards, no clicking around** to make changes.

The second problem was harder to see at first. CI/CD pipelines are already a headache in big projects: brittle, poorly written with bash scripts, hard to maintain and nobody's proud of them.

I didn't want to make it even worse. So I took a different approach entirely. **Yesglot doesn't ask you to change your pipeline.** It watches your repository and opens pull requests with translations automatically. Keeping it out of the pipeline also meant that onboarding a new customer required zero pipeline changes. That's where the GitHub App-driven flows came from.

## On 7th of October, 2025, We had the design kickoff of yesglot.com with my friend.

I'm a backend engineer at heart and proud of my pragmatic mindset, which makes me efficient. But UI and design decisions take me forever. I'd make a call, dislike it later, redo it, repeat. It was slowing everything down. Then I remembered something from The Minimalist Entrepreneur book: "Hire someone, fire yourself". I let my friend take the wheel on UI and branding so I could focus on what I'm actually good at.

## On 13th of October, 2025, I pushed the first commit of yesglot.com frontend.

Choosing a frontend stack wasn't straightforward. I genuinely wanted to use [HTMX](https://htmx.org/). Carson Gross gave [the keynote at DjangoCon US 2026 in Chicago](https://www.youtube.com/watch?v=ZLpCIw19lE0&list=PL2NFhrDSOxgUSZVGkmbMhUpaaZ1ORfpCl&index=39) and it was inspiring. But when my frontend developer friend came to visit in rainy and gloomy Eindhoven, we tried prototyping with Next.js and [shadcn](https://ui.shadcn.com/) and the productivity was hard to argue with, especially with AI in the mix. On top of that, Next.js has a much larger talent pool, which matters when you're thinking about the future. I still root for HTMX and what it stands for. As a solo founder though, you choose your battles.

My hope is that HTML one day natively does what HTMX has been pioneering. The frontend ecosystem could really use that kind of simplification.

## Plateau, Life happens.

![Broken finger](public/images/posts/birth-of-yesglot/broken-finger.png)

My right middle finger got broken. I flew to Türkiye to see my best friend’s first child. My stolen motorcycle was recovered but not working, so it had to be repaired. I wanted to move from Eindhoven to Amsterdam and the housing market was brutal, but we finally moved at the end of December. I flew back to Türkiye for New Year's Eve. Short trips to Mainz, Antwerp, Samsun.

I'd been booking pomodoro slots to work on yesglot.com, but I also didn't want to put my life on hold. Those sessions kept getting pushed to the following week. Guilt came with every postponement. A beer at sunset should be relaxing; instead, my head was occupied with subscription model design.

It's not easy to have a full-time job and build something on the side. You know what needs to be done, you think about it constantly, but actually sitting down and doing it is hard. **Sometimes when I finally had time, the task had grown so large in my head that I didn't know where to start.** So I'd wander YouTube or watch videos about entrepreneurship instead of actually building.

Then I remembered something about myself: external commitments work better for me than internal ones, especially deadlines. **Deadlines aren't there to be met. They're there to convince me that this phase will end**, that it won't linger forever. So I decided to make things official.

## On 26th of February, 2026, I registered Yesglot (With Batteries) in the Chamber of Commerce.

![KVK Amsterdam](public/images/posts/birth-of-yesglot/kvk.jpg)

Having a registered company was a necessary step to process payments on Stripe, but it wasn't much more than that. A company without a product is just a name on a piece of paper. We celebrated, but I knew it meant nothing until something was actually out in the world. Then, almost by accident, I came across DevWorld Conference, happening on May 7-8th, 2026, just five minutes from my home. They had a startup booth program too. That felt like a real deadline.

## On April 7th, 2026, I got on a call with Jos Gerards to ask about DevWorld Conference 2026. 

What kind of audience shows up? What's the format? Is it worth it for an early stage product? The answers were encouraging.
Then came the harder question: could I actually be ready?

I created a fresh Todoist account, dumped every task from my head into it and gave each one a t-shirt size estimate. Then I asked my ex-product manager girlfriend to help figure out a realistic end date. She put everything into a Google Sheet with deadlines, talked it through with Claude and came back with an answer.

**May 31st, 2026.**

[I took that personally](https://www.youtube.com/watch?v=2t4RVg_Yq2g) and paid for the booth on the spot. The conference was less than a month away.

## On April 20th, 2026, I ordered the merch hats and sweatshirts.

![Merch](public/images/posts/birth-of-yesglot/yesglot-merch.jpg)

There's something strange about wearing a hoodie with a brand that doesn't exist yet. But with every item I checked off, it became a little more real.

Sending staging links to friends, pushing last minute fixes, willing the product into existence one task at a time. I had been planning a much fuller launch, broad technology support, editable project names, resend login codes. Then I remembered what Reid Hoffman said: "*If you're not embarrassed by the first version of your product, you've launched too late.*" I made peace with an imperfect launch and cut everything that wasn't critical.

## On 7th of May, 2026 05:23am, [yesglot.com](https://yesglot.com) went live.

![The first production release at 05:23am](public/images/posts/birth-of-yesglot/prod-0523am.jpg)

The production was ready to use the first day of the conference and I only had 2-3 hours to sleep before getting ready.

## On May 7th and 8th, 2026, The booth at DevWorld Conference 2026.

![DevWorld Stage](public/images/posts/birth-of-yesglot/devworld-stage.png)

I spent the two days talking with people about how they handle multilingual applications, what was missing in their current workflows, what frustrated them about existing platforms. Once I understood their problem, I could show them exactly how yesglot.com could help. It was a place to **understand first, then to solve**.

![DevWorld Booth](public/images/posts/birth-of-yesglot/devworld-booth.png)

I was exhausted by the time the conference arrived, after a few sleepless nights, but I had met my deadline and that felt great. Committing to a date and actually making it happen was its own reward.

I also built a small Kahoot-style game for the booth. Ten questions: the first five about how yesglot.com works, the last five asking people to identify sentences written in different languages. The winner got a one hour massage. The best part was that instead of me explaining what yesglot does, people were coming up and asking me, all because of the game. It worked better than any pitch I could have prepared.

## What’s next?

### Support majority of technologies
I'm aiming to support 90-95% of frameworks and technologies in the ecosystem within the next month or two. *Node.js* and *Laravel* support is coming this weekend, with *Spring Boot* and *Next.js* to follow.

### Sales
Building is one thing; selling is another. My goal is to send 500 outbound emails and genuinely hear what people think.

### Sponsor to Open Source
I'm going to announce a program for open source maintainers: if you maintain a package that supports multiple languages, Yesglot will handle your translations for free, forever.

I've also started picking open source packages that lack translations, doing the work myself with yesglot and contributing them back as pull requests. The goal is 100 projects.

### Viral marketing
I've been building example repositories to show what Yesglot can do. For React, I made the [Pizza Justifier](https://pizzajustifier.yesglot.com/), available in 120 languages. For each new technology, I want to build something small and shareable that demonstrates what multilingual support can look like.

## What is going to happen to the open source package?

People kept confusing [yesglot.com](https://yesglot.com) with the open source package. So, I decided to rename the package as [dj-translatemessages](https://gitub.com/efe/dj-translatemessages). It will keep doing what it does well, making translations simple and accessible for small teams. I've been building with Django for years, yesglot.com itself runs on Django, and I'm a member of the Django Software Foundation. Maintaining this package is my way of giving something back to the community that helped me get here. If **dj-translatemessages** covers your needs, that's great. But if you're looking for a more autonomous workflow without touching your pipeline, yesglot.com is always there. As an improvement, Support for django-modeltranslations is coming soon.

## In Summary

**It takes time.** People post online about building a product in five days and landing their first customers. That might be true. But it doesn't mean every path looks the same. Don't let someone else's highlight reel set your pace.

**Set deadlines for yourself.** Not to be met, but to convince yourself this phase will end. An external commitment does what willpower alone never could.

**The journey.** I asked myself one question while writing this: was this time well spent? The answer is yes, no and maybe.

- **Yes.** I built something worth building. A week after launch, I still don’t know if yesglot.com becomes a real business. But the idea that followed me around conference halls, train rides, sunsets, airports and unfinished weekends is finally real enough for other people to touch. For now, that’s enough.
- **No.** Not yet. It's only been a week since the release. The reactions were warm but warmth doesn't validate a product. Customers do.
- **Maybe.** Ask me again when I've sent those 500 emails and opened 100 pull requests.

If you'd like to follow along, you can find [yesglot.com](https://yesglot.com) on [LinkedIn](https://www.linkedin.com/company/yesglot/).