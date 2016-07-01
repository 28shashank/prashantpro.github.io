---
layout: post
title:  "What problem does Strategy Pattern solve"
date:   2015-05-06 05:40:00
categories: java
excerpt: Design pattern
comments: true
---

One of the major benefits of object oriented programming is code reuse.

Inheritance is widely used to achieve this reuse, as it allows for defining the common behaviour and properties in a super class which all subclasses then inherit.
The problem with inheritance is with its overuse.

Check the below example which shows how certain requirement changes can lead to complications in an inheritance based design.

---

![image-title-here](/assets/images/why-strategy.png){:class="img-responsive"}


> **Issues with inheritance:**

> - Can't change the behavior at runtime.
> - Super class behavior when changed will impact across all subclasses.
> - Not all subclasses may want the behavior of super class thus end up with duplicated code such as empty overrides or their own custom implementations which can't be reused by other subclasses.
> - With above point, its hard to gain an understanding of all subclass by looking at a super class alone.

#### Could interfaces have helped?
It could solve some part of the problem, but would not allow for any reuse of code.
As each implementing subclass would provide their own implementation.


---
A more elegant solution can be achieved using a strategy pattern which promotes few design principles as well.

> **Definition:** 
Strategy pattern defines a family of algorithms, encapsulates each one and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

![image-title-here](/assets/images/why-strategy-final.png){:class="img-responsive"}

The above solution is a lot more flexible and still allows for code reuse!


*Cheers!*