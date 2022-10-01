---
tags:
  - post
  - css
  - react
  - opinion
title: Why I chose CSS Modules
subtitle: (and why it may not be the best option for you)
lead: Short, opinionated summary on why, for my personal React projects (as well as for small, greenfield work apps), I picked CSS modules. It also contains a list of reasons why it may not be a good idea for you, and what other option you may want to consider.
date: 2022-09-29
---

This is a short, opinionated summary on why, for my personal React projects (as well as for small, greenfield work apps), I picked CSS modules. It also contains a list of reasons why it may not be a good idea for you, and what other option you may want to consider.

**Assumption: anywhere I use wording 'CSS', it implies possibility of using pre-processors, like LESS or SCSS.**

## TL;DR:

| Approach                                | Vanilla CSS                | CSS Modules                          | Styled Components                          | CSS-IN-JS                                    |
| --------------------------------------- | -------------------------- | ------------------------------------ | ------------------------------------------ | -------------------------------------------- |
| Who is it for                           | Small, one person projects | Teams with good understanding of CSS | Projects with a lot of reusable components | Big teams with wide variety of CSS expertise |
| CSS-like Syntax                         | ✅                         | ✅                                   | ✅                                         | ❌                                           |
| Styling based on specificity            | ✅                         | ✅                                   | ❌                                         | ❌                                           |
| Encapsulation (solves naming conflicts) | ❌                         | ✅                                   | ✅                                         | ✅                                           |
| Atomic CSS (solves specificity issues)  | ❌                         | ❌                                   | ❌                                         | ✅                                           |
| Dynamic styling                         | ❌                         | ❌                                   | ✅                                         | ✅                                           |

### Vanilla CSS

CSS is not dead. Vanilla CSS is a bread and butter of UI development. It is a place you want to know if you're serious about working with making web pretty and accessible. Styling starts here, and ends here. The problem is - it does not scale well for the bigger apps. It comes with a plethora of issues, name collision and specificity to name the biggest ones. That is why I would, personally, reject it in environment of web app creation. But I strongly believe Vanilla styling has it's place:

- Static pages, portfolios
- Small apps with just a couple of components without complex UI
- Personal projects or tiny teams consisting of people who know CSS like their own pocket (or have a styling wizard at their disposal).

### CSS Modules

A logical evolution of Vanilla CSS is [CSS Modules](https://github.com/css-modules/css-modules). As documentation states, `A CSS Module is a CSS file in which all class names and animation names are scoped locally by default. ` Diving into technical aspects, to achieve component encapsulation, CSS Module adds a module name to a class, as well as randomly generated id. That way we can be sure, that no 2 components will have a class collision. It also allows to implement various code standards, like having `.wrapper` as an outmost HTML node in the component. Of course, it supports pre-processors, so you can use your fancy SASS or LESS features.

However, as long as by encapsulating styles it solves name conflicts, you still have to manage your specificity levels. There are of course tools to help you with that, like StyleLint's max nesting and specificity level and selector order rules, but that may not be enough to prevent errors that are often pretty tricky to find. Skilled hands, however, may use specificity to their advantage and conditional-style based on that. Therefore, I think that CSS Modules should be considered by:

- Small teams of frontend developers, who are skilled in CSS
- Teams, that have dedicated UI developers (people, who work on HTML, CSS, animations and visual user interactions)
- Projects of any size, that may have problems with class collisions

A caveat - CSS Module generates Javascript object for you, with classes as properties. Because of that, to elevate easiness of use in React components, the suggested naming convention for classes is `camelCase`. If you must have `kebab-case` as class named, be prepared to use `className={styles['kebab-case']}` syntax, or write your own helper/translator.

### Styled Components

Both previous options were based on pure CSS code, just handled a bit differently. [Styled components](https://styled-components.com) is, in fact, a true CSS-in-JS variant, just structured in a way to resemble CSS syntax we all are used to. It's biggest strength is dynamic styling based on JavaScript variables (props), used straight in SCSS syntax. All that come, unfortunately, with lower performance. Because JS needs to generate styles runtime, it takes more computing power than pure CSS paint, that needs to happen eventually. I know that [Linaria](https://linaria.dev) solves this problem by generating styles compile time. Unfortunately, I'm not familiar right now with the library. I might extend this text later.

What is, however, the biggest downside for me, is an overhead of created components. For every item you need to style, you have to create separate styled component. That works well, if you have a bunch of similar items that you reuse over the application. In that case you can modify style based on props, and you're good to go. If, however, you have a lot of differently styled items that may serve similar purposes, then you will get a lot of overhead in form of styled components:

```javascript
const StyledCustomComponent = styled.div`
  display: flex;
  margin: 0;
  padding: 1rem;
`

export const CustomComponent = () => {
  return() <StyledCustomComponent />);
}
```

It would be cleaner to just add a class to a div, wouldn't it?

Styled components, I believe, have their place, if you are a team, that wants to use SCSS syntax, but are more familiar with javascript than CSS. It gives you an experience of native JS variables, not forfeiting the canonical stylesheet look. If you have a lot of items to render, however, you may want to look for other options.

### CSS-in-JS

As an example of pure CSS-in-JS library I will use [Griffel](https://github.com/microsoft/griffel). Because in Teams we use [Fluent UI](https://github.com/microsoft/fluentui) as our component base, I wanted to give a try a library that is native to my team's work projects. It is based on an idea of an atomic CSS - it minimizes bundle size, as well as deals with specificity and stylesheet order issues. That makes it a very safe choice if you have a lot of developers, especially with full range of styling experience, working on one huge project. You apply styles to just one specific component, and you may be sure that nothing outside of it will override it.

Sounds amazing, doesn't it? Well, yes, but not without downsides. First one is - in-browser style debugging. You cannot just easily toggle style in the element explorer. If your node has `display: flex` applied, it will have exactly the same class as every flex element in the app, so if you disable it - you'll disable it for every flex item on the page. That requires you to use additional tools to debug styles in a familiar way.

Also, styles are applied by using JS objects, so no more CSS familiar syntax. It might be a bonus, if you are not friends of CSS. For me, it is a really big downside. This is how it looks like:

```javascript
  box: {
    display: flex,
    ...shorthands.padding("0.25rem"),
    ...shorthands.borderRadius("5px"),
  }
```

The positive outcome of this is - this may simplify unit testing, if you need it. Because style rules are, essentially, a JavaScript object, you can just assert them. Is it my favorite approach? Definitely not. Would I recommend it? Depends on the project and team. I feel it does have it's strong place, if:

- You are a frontend developer coming from a backend world, you haven't done a **deep dive** into CSS and just want to place items in your app and make it not look ugly
- You have a big team that includes developers with diverse backgrounds and wide variety of frontend styling experience
- You want to avoid specificity and order issues
- You want to unit test styling rules without using additional tools

### Mix and match

Of course, if you need, you can mix these approaches. Use Griffel to style your Fluent components, build a layout with CSS Modules and create your custom set of components with Styled Components. Just be mindful of possibly bigger bundle size and all the problems you might encounter (for example Atomic CSS not being applied because of specificity coming from CSS Modules, or Vanilla CSS being overridden by Griffel because it was loaded later than you `style.css` file).

## Bottom Line

As with all other frameworks, libraries and approaches, I believe all presented above have their place in the software development world. I did not show you the **only right path**. What I did, is I have presented a short overview of what are positives, negatives and caveats of these 4 approaches. Choosing one over other does boil down to a personal preference, team agreement or project requirements, not necessarily in that order.

I chose vanilla SCSS always when I need to create a static page, a virtual resume and other slim-UI apps, because I don't need advanced features and I value a simplicity of a non-configuration approach. For more robust interfaces, I pick (S)CSS Modules to get an safety edge of encapsulation, without forfeiting the
familiarity of CSS code.

I have also skipped another popular approach of [Tailwind CSS](https://tailwindcss.com) - purely because I am not familiar with it, and it was never a considered option within my team when it came to a styling framework selection.
