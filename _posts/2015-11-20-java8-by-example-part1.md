---
layout: post
title:  "Java 8 by example - Part 1"
date:   2015-11-20 00:05:00
categories: java
title_short: Java 8 part 1
comments: true
author: Prashant Padmanabhan
---
* content
{:toc}

This should be helpful for those who already know java and would like to quickly go over what's Java 8 all about in **short** with some examples!

For Lambdas you can checkout [part 2]({% post_url 2016-01-18-java8-by-example-part2 %})
# Introducing class **java.util.StringJoiner**

From the Java Doc for the class:

>StringJoiner is used to construct a sequence of characters separated by a delimiter and optionally starting with a supplied prefix and ending with a supplied suffix.

API example:
{% highlight java %}
String lang = String.join(" and ", "Java","C","Ruby");
System.out.println(lang);

//output below
Java and C and Ruby
{% endhighlight %}

{% highlight java %}
//Lets set a default message to show when no value is set
String lang2 = String.join(" and ", "Java","C","Ruby");
lang2.setEmptyValue("No data yet");
System.out.println(lang2);

//output
No data yet
{% endhighlight %}

{% highlight java %}
//Working with existing Collection
Set<String> set = new TreeSet<>();
set.add("Apple");
set.add("Orange");
set.add("Grape");

StringJoiner sj = new StringJoiner(" and ");
set.forEach( s -> sj.add(s));
System.out.println(sj);

//output
Apple and Grape and Orange
{% endhighlight %}

---

# Next up, we have the **Instant** class from **java.time** package.
From the Java Doc for this class:

>An instantaneous point on the time-line.
This class models a single instantaneous point on the time-line. This might be used to record event time-stamps in the application.

{% highlight java %}
Instant start = Instant.now();
System.out.println(start);

try {
 TimeUnit.SECONDS.sleep(2);
} catch (InterruptedException e) {
}
Instant end = Instant.now();
System.out.println(end);

Duration elapsed = Duration.between(start, end);
System.out.println(elapsed.toMillis());
{% endhighlight %}

---
# Working with Date and time

We have **LocalDateTime** which is "A date-time without a time-zone". So it can be used to represent
birthdays, an event on a timeline without worrying about the time-zone.

Also there is the new **DateTimeFormatter** this is a formatter for printing and parsing date-time objects.
{% highlight java %}
DateTimeFormatter dtf = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT);
LocalDateTime dt = LocalDateTime.now();
System.out.println(dtf.format(dt));

//output - yours may differ
//20/11/15 1:52 PM
{% endhighlight %}

If you find yourself dealing with date-time of various time-zone then your friend is the new **ZonedDateTime**.
This is a date-time with a time-zone.
{% highlight java %}
ZonedDateTime gmt = ZonedDateTime.now(ZoneId.of("GMT+0"));
System.out.println(gmt);
System.out.println(dtf.format(gmt));

//output
//2015-11-20T08:22:27.369Z[GMT]
//20/11/15 8:22 AM
{% endhighlight %}

If we are to find the difference between the two date time given above then use the below:
{% highlight java %}
Duration diff = Duration.between(dt, gmt);
System.out.println(diff);

//output
//PT-5H-30M0.039S
{% endhighlight %}

Another example of ZonedDateTime with the help of ZoneId for getting a time-zone based date and time.
{% highlight java %}
ZonedDateTime riyadh = ZonedDateTime.now(ZoneId.of("Asia/Riyadh"));
System.out.println(riyadh);

//output
//2015-11-20T12:00:26.666+03:00[Asia/Riyadh]
{% endhighlight %}

Now how about printing all Zones (ZoneIds) for Asia using the ZoneId and Lambda approach.
{% highlight java %}
Set<String> availableZoneIds = ZoneId.getAvailableZoneIds();
availableZoneIds.stream().filter(p -> p.contains("Asia")).forEach( i -> System.out.println(i));
{% endhighlight %}

We have covered briefly on StringJoiner, Using Lambdas, and Working with Date and Time the Java 8 way.

In the next post I will go over few more Java 8 essentials such as Streams, Default methods and more.

*Happy learning!*
