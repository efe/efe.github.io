---
title: "Turkish Language, Browsers and Punycode"
publishedAt: '2024-04-20'
isFeatured: true
hackernews_item_id: 40117820
---

[The Turkish alphabet](https://wikipedia.org/wiki/Turkish_alphabet) has been a version of the Latin alphabet for almost a hundred years thanks to the [Turkish alphabet reform](https://en.wikipedia.org/wiki/Turkish_alphabet_reform). There are two main differences between the Turkish and English alphabets.

- Q, W and X letters do not exist in Turkish alphabet.
- Turkish alphabet has seven letters that are not in the English alphabet. They are Ç (ç), Ğ (ğ), I (i), İ (ı), Ö (ö), Ş (ş), and Ü (ü).

Each of these additional letters have an alternative in the English alphabet. Therefore, it is possible to 'downgrade' Turkish-specific characters to English alphabet letters. For instance, my last name is *Öge*, which can be written as *Oge*, and *Türkiye* can be written as *Turkiye*.

In the early phase of the Internet, 'downgraded' letters were used for any words with Turkish-specific letters in the domain names. For instance, İş Bankası, the first Turkish bank website, was created as isbank.com.tr on [June 17, 1997](https://web.archive.org/web/19980119102706/http://www.isbank.com.tr/). Domain naming like this would happen because it wasn't possible to register domain names with non-ASCII characters.

In 2008, [Internationalized domain names](https://en.wikipedia.org/wiki/Internationalized_domain_name) were introduced with [Internationalizing Domain Names in Applications (RFC 3490)](https://datatracker.ietf.org/doc/html/rfc3490.html) standard. Then, it became possible to register domains with Non-ASCII characters (Turkish-specific, Cyrillic and Chinese etc).

Technically, DNS is built on top of the ASCII character set. It wasn't possible to extend it with all other [diacritics](https://en.wikipedia.org/wiki/Diacritic) or [ligatures](https://en.wikipedia.org/wiki/Ligature_(writing)). In the framework given, The pragmatic solution is an encoding on top of ASCII which is [Punycode](https://en.wikipedia.org/wiki/Punycode). Out of the box, non-ASCII characters in the address bar are going to be converted to Punycode whenever you hit enter in the browser. At the programming level, all the logic will remain in ASCII.

```python
>>> 'efeöge.com'.encode('idna').decode()
'xn--efege-lua.com'
```

In the browser, `efeöge.com` -> `xn--efege-lua.com`.

Does this work? Yes, it works perfectly at the technical level.

However, It wasn't a pleasant experience to see these muddy dashes and ``xn`` prefixes in every URL as for end user. The good thing is that this problem is about the browser, not the protocol. I believe this is one of the good examples of the [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns).

As a quick but risky solution, browsers could display [Unicode](https://en.wikipedia.org/wiki/List_of_Unicode_characters) instead of Punycode. However, this poses a significant threat. In Cyrillic, for example, 'е' and 'а' are distinct from the Latin/English 'e' and 'a' even though they may look similar.
 
- amazon.com
- аmazon.com (first a letter is Cyrillic a)
- amаzon.com (second a letter is Cyrillic a)
- аmаzon.com (first and second a letters are Cyrillic a)

These are all different domain names, which could lead to a problem known as an [IDN Homograph Attack](https://en.wikipedia.org/wiki/IDN_homograph_attack).

As a smart and well-thought solution, Firefox and other modern browsers implemented [an algorithm for Internationalized domain name display](https://wiki.mozilla.org/IDN_Display_Algorithm#Algorithm) which finds a sweet spot between security and user experience. Therefore, there is no need to be afraid of it.

Additionally, It is possible to show all non-ASCII characters as Punycode in Firefox. Just set `IDN_show_punycode` as `true` in `about:config`.

I admire the dedication and effort put behind the modern Internet, which makes everything appear smooth and effortless.
