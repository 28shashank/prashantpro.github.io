---
layout: post
title:  "Java 8 by example - Part 2"
date:   2016-01-18 00:14:00
categories: java
title_short: Java 8 part 2
comments: true
author: Prashant Padmanabhan
---
* content
{:toc}

This is a follow up on the previous article [part 1]({% post_url 2015-11-20-java8-by-example-part1 %}) for Java 8 by example.

This should be helpful for those who already know java and would like to quickly go over what's Java 8 all about in **short** with some examples!

# Lambdas in general
Lambda expressions can only be used where they will be assigned to a variable whose type is a functional interface.
The Arrow Token "->" is called the lambda operator.

A functional interface is simply an interface with a single abstract method.
Example:
{% highlight java %}
@FunctionalInterface
interface SingleAbstractMethod {
  void process(String arg);
}
{% endhighlight %}

Now lambda allows us to define the method above "process" without the need to state the obvious, such as the class declaration and argument type.

The code would look like below where **msg** is the variable of type String which is inferred:

`SingleAbstractMethod sam = (msg) -> System.out.println(msg);`

And we would invoke the method like this:

`sam.process("testing new message on a SAM");``


The *pre* java 8 way to create a instance from a anonymous inner class here Runnable would be like below:
{% highlight java %}
Runnable r = new Runnable() {
	@Override
	public void run() {
	   System.out.println("hello anonymous inner class method");
	}
};
new Thread(r).start();
{% endhighlight %}

The java 8 *lambda* way would look like below where empty parenthesis is used for no-args method:
{% highlight java %}
Runnable r8 = () -> System.out.println("hello lambda");
new Thread(r).start();
{% endhighlight %}

---

# Next up, using lambdas
Here's a traditional way to sort a collection.

{% highlight java %}
List<String> list = new ArrayList<String>();
list.add("apple");
list.add("orange");
list.add("Grape");
System.out.println("Case sensitive sort");
Collections.sort(list);
// Not using lambda
for(String s : list) {
 System.out.println(s);
}
{% endhighlight %}

Now if you had to sort the collection in a case insensitive way then this can be done as below:

{% highlight java %}
//Continued code from above
System.out.println("\nCase in-sensitive sort");
// Not using lambda
Collections.sort(list, new Comparator<String>() {
  @Override
  public int compare(String o1, String o2) {
    return o1.compareToIgnoreCase(o2);
  }
});
//Print the sorted list using Java 5 introduced for each loop
for(String s : list) {
	System.out.println(s);
}
{% endhighlight %}

Now to do it the **java 8** way which would be a lot more effecient.
{% highlight java %}
List<String> list = new ArrayList<String>();
list.add("apple");
list.add("orange");
list.add("Grape");

System.out.println("\nCase in-sensitive lambda sort");
Comparator<String> comparator = (arg1, arg2) -> arg1.compareToIgnoreCase(arg2);

//Sort using the above comparator
Collections.sort(list, comparator);

//For each using Lambda
list.forEach((s) -> System.out.println(s));
{% endhighlight %}

*Happy learning!*
