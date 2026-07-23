---
layout: layouts/post.njk
title: Fail (and recover) Gracefully
date: 2026-03-02
author: Nick Ryberg
draft: false
excerpt: If the data is flowing the the bar charts are thumping, well, you must be doing something right.  Heck it must be all right? Right? 
---

The world of data and analytics gives you a false sense of security.  If the data is flowing the the bar charts are thumping, well, you must be doing something right.  Heck it must be all right? Right?

Nope - there's plenty of subtle ways that you can mix up your data on the trip to the grand conclusion. 

- Source data flaws - it was never right to start with
- Silent null filters - inner joins filter out exceptions - maybe you should see them anyway?
- Twisted complexity issues - there's so much going on, it's easy to slightly mess up one piece.

Those are some of the more common but by no means the only ways to screw up your analysis.  

I just did it yesterday with a poorly thought out join between two tables that sometimes (but not always) doubled up the rows. I did it last week with a grain issue where I thought the data was at a level it was not, and fortunately had a patient business partner that gently caught the issue for me.

Our capacity, aided by well intentioned AI, to screw up is boggling.  But don't feel bad, humanity has been screwing up things for a long time.  This is nothing new. 

You can however, limit the damage, and understand the system more clearly so that the most obvious issues are fixable.  And, if you're really doing well, simply do it right the first time. 

But when the spaghetti hits the wall, it's nice to have a couple of things on your side:

- Confidence in your ability to repair - no matter how complex the issue
- Patience - to solve the problem without freaking out
- Common knowledge - you and your business partners agree on what needs to be done and how

The [Data Flow Map framework](https://dataflowmap.com/) gives you all of this and more. The best part - you don't even have to have it all figured out the first time you trial run a solution. 

That's the key word here - trial.  Test the assumptions.  Use a small sample of data with known properties to walk the system and tell you if it's solid.  Guardrails along the way to uncover the more subtle issues that convulute your analytics path. 

Be comfortable with the fact that you got the facts wrong.  There is _always_ error in the process. Data collection might be off, key data points might be inaccurate, human error pops up all along the way to conclusion.  The tools we use to source, focus and build from have their own opinions and limitations.  You may not have time to confidently finish your work - deadlines have a creepy way of creeping up on you. 

Our data storage and tooling have gotten to the point that we can do truly amazing analyses almost effortlessly.  But as we're flying along at speed, remember that occasionally, you're going to hit the wall.

So hit it!  Be confident that it's going to be okay.  You're going to get out of the analytics racecar, shake it off, do a root cause analysis and fix it.  Back onto the data race track you go - and you won't make _that_ mistake again.  (Others will crop up - but you'll be ready for it).

Find out how the [Data Flow Map](https://dataflowmap.com/) can help you limit the blast radius of errors, create clearer solutions that make it easier to spot bugs and gaps, and rock the free world - confidently.
