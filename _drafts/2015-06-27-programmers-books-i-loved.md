<!--
---
layout: post
title:  "Programmers books that really help!"
date:   2015-06-27 00:06:00
categories: craftsmanship
excerpt: Books to read
comments: true
---

* content
{:toc}

# Theory in practice

Software development done right is not only a wish every programmer should have, but a goal they must aim for!

Software Craftsmanship IS about being professional at your craft.

In order to succeed as a professional,


*Cheers!*
-->
This is more of a personal note of collated material for my own reference. Hopefully this will benefit you too.

Definition: Strategy pattern defines a family of algorithms, encapsulates each one and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

A design pattern called Strategy is widely defined and used, but its best understood by answering the below questions:

What problem is this pattern trying to solve?
What are the alternatives considered before choosing this pattern?

One of the major benefits of object oriented programming is code reuse.

Inheritance is widely used to achieve this reuse, as it allows for defining the common behaviour and properties in a super class which all subclasses then inherit.
The problem with inheritance is with its overuse.

Issues with inheritance:
1. Can't change the behavior at runtime.
2. Super class behavior when changed will impact across all subclasses.
3. Not all subclasses may want the behavior of super class thus end up with duplicated code such as empty overrides or their own custom implementations which can't be reused by other subclasses.
4. With point 3, its hard to gain an understanding of all subclass by looking at a super class alone.

What about Interfaces?
It could solve some part of the problem, but would not allow for any reuse of code.
Each implementing subclass provide their own implementation.

Design Principle #1
Encapsulate what varies.
- Example if some behavior of code keeps changing then separate that from the rest that doesn't change.

Design Principle #2
Program to an interface, not an implementation.

So we are not locked into any specific implementation.
Class need not be aware of implementation detail.

Combine inheritance and composition.
Use composition for behavior that varies i.e requires more flexibility and use inheritance for behavior that doesn't change.

Design Principle #3
Favor composition over inheritance.

A991B2608531