---
tags:
  - post
  - design
  - accessibility
title: Introduction to cognitive accessibility
lead: A very brief list of the most important issues I tend to spot while browsing the web.
date: 
stylesheet: introduction-to-cognitive-accessibility
---

## What is cognitive disability
Cognitive disabilities, in short words, are invisible disabilities that make a person process data, content, external or internal stimuli in a way that is more taxiing or demanding than for the non-disabled people. They are commonly present in a neurodivergent people (opposed to neurotypical), who suffer from for example Autism, ADHD, Long Covid, Dyslexia, Dyscalculia, Epilepsy, among many other.

What is really crucial to understand about these types of disabilities, to be able to really benefit from this article, that they are not constant - intensity of a singular issue may be fluctuating for one user even through a day, and that there is no 'one solution to fit them all' - an accessibility feature for one person may create a barrier for another.

## Cognitive A11y 101

I won't be covering standards here, as there is pretty robust and well written [WCAG2 Guidance](https://www.w3.org/WAI/WCAG2/supplemental/#cognitiveaccessibilityguidance) around cognitive accessibility. What I will do instead, is - I will describe common web design problems from cognitive area, and how would I tackle them to make web more inclusive.

### Please, let me focus on the content! (Or I may not get back to your page)

One big bucket of neurodivergency struggles in the web are **distractions**. They come in many forms and flavors, but they all have a thing or two in common - they usually have little or no connection to the actual content of the page, and are making it virtually impossible to focus on the task at hand. 

#### no distractions

This is a huge one. Do you know the pages that show all the ads, have tons of irrelevant links in sidebar, usually with pictures, auto-playing videos with sound, jumping auto-animated icons, to name just a few. These are productivity killers. All content besides the one that is important, like article text, or form to fill, are focus hijackers. If there is an add that takes 1/3 of page area - you can be sure ADHD'er will not be able to focus on the task they came for. Same goes for flashy banners, and other things like that.

As an example let me present two landing pages of well-known European airlines. One 

<div class="compare-container">
  <div class="image">
    <img src="/images/introduction-to-cognitive-accessibility/airline-a.jpg" alt="Ryanair landing page, showing a lot of contrasting colors, connection search is hidden under a " width="450" />
    <span>Ryanair landing page</span>
  </div>
  <div class="image">
  <img src="/images/introduction-to-cognitive-accessibility/airline-b.jpg" alt="Lufthansa landing page" width="450" />
      <span>Lufthansa landing page</span>
  </div>
</div>

#### please, no auto play

This is by far one of the worst ones. Whenever I come to the page to read something, and see 

#### give me narrow color palette

The other really distracting thing is wide color palette. I understand that idea may seem great and pretty pretty, but if you aim to design for inclusiveness, this a thing to avoid. More colors means more contrast, more distractions. This also may be an epilepsy or migraine trigger - if the contrast is too high, and variety of colors too broad, for those disabled in these areas content like this will look flashy, painful, and unbearable. usually 3-colored palette works wonders. They may leave page in order to avoid stimulus overload, and there is a good chance they will never come back.

#### more design consistency

This is an extension to previous one; but will affect more aesthetic - for example Autistic people, who have problems processing change, or people with OCD. Basically - try to keep amount of differently looking components to minimum. If you design a button, make variants of one look. Don't change borders, proportions, colors (as per previous, try to have one regular and one alluring, or primary colored version), fonts. I have seen pages with 4 totally different buttons. It completely hijacked my focus and made getting task done almost impossible to complete.

#### respect my system settings (dark mode, reduced motion)

For a lot of people, for example because of ___ dark mode is really the only sensible option. Settings in modern operation systems are there fore a reason - let's use `prefers-color-scheme` query to detect preferences and make our product more accessible to those, who can't really use white backgrounds. And there is even more important part - `prefers-reduced-motion`. All flashy elements, but also any moving components (sliding elements, animations, etc) may not only distract user, but also invoke an epilepsy attack. Do not attack your potential customer with your ideas of what pretty animations you have, if they choose to opt out. Just remember to make states distinct enough for user to noticed something has changed!

#### allocating space for images/banners (jumping page)

This is simple one. If you have any images that are being loaded, please pre-allocate space for them. It can be really off-putting when you start reading text, and it jumps because large image just got loaded. Multiple times. Yikes!