---
layout: post
title:  "What problem does Strategy Pattern solve"
date:   2015-05-06 05:40:00
categories: Java
title_short: Understanding strategy pattern
comments: true
author: Prashant Padmanabhan
---

There are plenty of articles covering this pattern, here I will try to cover the same from a perspective which I believe has helped me really understand what this pattern has to offer. I will try not to throw the pattern at you with all its rules but instead show you how one would end up using it, while correcting few erroneous design choices on the way.

One of the major benefits of object oriented programming is code reuse.

Inheritance is widely used to achieve this reuse, as it allows for defining the common behaviour and properties in a super class which all subclasses then inherit.
BUT the problem with inheritance is with its ***overuse***.

Check the below example which shows how certain requirement changes can lead to complications in an inheritance based design.

---

![image-title-here](/assets/images/why-strategy.png){:class="img-responsive"}


> **Now let's look at few of the issues with inheritance as depicted with the above design choices:**

> - You can't change the behavior at runtime.
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

Let's see how a revised design using the pattern would make our code much more flexible.

![image-title-here](/assets/images/why-strategy-final.png){:class="img-responsive"}

The above solution is a lot more flexible and still allows for code reuse!

Here's few code snippets of how the pattern appears in Java where subclass can set a different behavior:

{% highlight java %}
//The Abstract Base class
public class UserAccount {
	//Default behavior
	private AccountVerification verifier = new EmailVerification();
	private ActiveCheck checker = new MemberActive();

	public void setAccountVerification(AccountVerification verifier) {
		this.verifier = verifier;
	}
	public void setActiveCheck(ActiveCheck checker) {
		this.checker = checker;
	}
	//Delegates the verification behavior to the set algorithm
	public void performVerification() {
		this.verifier.validate();
	}
	//Delegates the check behavior to the set algorithm
	public boolean performActiveCheck() {
		this.checker.isAccountActive();
	}
}

public class FreeMember extends UserAccount {
	public FreeMember() {
		//The behavior is set by default but just to show that we could change it here.
		setAccountVerification(new EmailVerification());
		setActiveCheck(new MemberActive());
	}
}

public class Guest extends UserAccount {
	public Guest() {
		//We need a different Algorithm/Strategy for Verification and ActiveCheck
		setAccountVerification(new NoVerification());
		setActiveCheck(new GuestActive());
	}
}

{% endhighlight %}

*Cheers!*