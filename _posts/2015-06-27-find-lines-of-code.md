---
layout: post
title:  "Finding large code files with one command"
date:   2015-06-27 00:04:00
categories: linux
title_short: Finding large code files
comments: true
author: Prashant Padmanabhan
---

Here's a quick way to find unusually large files with many lines of code in your codebase.

While there are many ways to refactor such code it all starts with finding the lengthy files first.
You could use your favorite code analysis tools to do it. But if you are not sure about those then his simple linux command can come handy.

Here's the command which will list the top 30 files sorted by number of lines in descending order.

{% highlight bash %}
find src/ -name "*.java" | xargs wc -l | sort -gr | head -30
{% endhighlight %}

In case you are not sure what the above command does, then here's how it works:

We are basically going to combine couple of commands to get to our desired output.

As an example below command will get the count of lines in one single file.
{% highlight bash %}
wc -l src/main/java/com/fancyproject/mode/StackViewManager.java
{% endhighlight %}


While this command will find all java files.
{% highlight bash %}
find src/ -name "*.java"
{% endhighlight %}

So the entire command works like below:

The first part of the command finds all files with extension ".java" under the "src" folder.

**find src/ -name "*.java"**

Then we pipe that output (file list) using xargs wc -l which finds the number of lines in each file.

**xargs wc -l**

Then we sort the list by the number of lines using the line count in descending order.

**sort -gr**

The last command is to limit the output to top 30

**head -30**

*That's it, happy refactoring.*
