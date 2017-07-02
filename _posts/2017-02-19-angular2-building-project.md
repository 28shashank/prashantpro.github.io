---
layout: post
title:  "Angular 2 with Java EE"
date:   2017-02-19 12:06:00
categories: Angular
title_short: Angular 2 and Java
comments: true
author: Prashant Padmanabhan
---
* content
{:toc}

## Getting started the right way
Most of us follow a *hello world* sample for even our professional projects that we need to get on with.
The same non production grade code soon becomes a technical debt needing a revisit.
This is my attempt to help those who wish to learn to do things a bit more elegantly when getting started.

## Angular and Java beyond hello world
Picking the right tool for the job is not an easy task, with the advent of so many frameworks and libraries for delivering web applications.
Here let us assume you have picked Angular and Java as your choice for the next big thing you are working upon.

I will be showing you in next few posts the entire process of building a frontend in Angular 2 with TypeScript and the backend in Java EE.

Angular JS (Angular 2) is a popular framework, you can checkout [Google trends](https://www.google.com/trends/explore?q=Angular%202) for reference.
As a developer this can be a great tool in your arsenal!

Here I go over few of the things which should help you get started the right way (*Opinionated*) rather than a quick and dirty example which leaves you wondering whether your starter project is production grade code.

### What you will be learning in the next few posts to follow this.
1. Setting up an Angular 2 Project
2. [Structuring frontend and backend using maven]({% post_url 2017-03-24-angular2-javaee-project %})
3. Local development
4. Publishing to Apache
5. Third party library integration
6. Using docker for deployment
7. Building the Java EE backend

Wow that's quite a handful, but that's what a real life project brings. So don't get overwhelmed if you are new to this, but stick around to see this project unfold.

## Prerequisite installation
You need to have Node and NPM installed.

If its already installed you can try below on your command line to check the versions (note your version may differ, just stick to having the latest).
{% highlight bash %}
$ npm -v
4.1.2
$ node -v
v7.5.0
{% endhighlight %}

## Getting Started

There are two widely used methods to start off building your **Angular 2** project.

**Method 1**: Checkout a quickstart sample project and build upon it.
Below few lines show the steps to clone quickstart repository using Git and then run "npm install" followed by "npm start" to load the app.
{% highlight bash %}
git clone https://github.com/angular/quickstart.git ng-helloworld
cd ng-helloworld
npm install
npm start
{% endhighlight %}

>The cloning would download some less than 2MB of files.
But the **npm install** cmd above would bump up the project size over 100 megs due to the node_modules folder.

With above the site should be running locally at this URL: http://localhost:3000/

**Method 2**: **Preferred** Use [Angular CLI](https://cli.angular.io/)
Below few lines show the steps to setup angular CLI and use it to build and run a new project.
{% highlight bash %}
npm install -g @angular/cli
ng new ng-helloworld
cd ng-helloworld
ng serve 
{% endhighlight %}

With above the site should be running locally at this URL: http://localhost:4200/

We will be using **Method 2** to here (you can follow along with Method 1 as well if you wish).

## What are we building?
The goal is to build a reporting angular app, which should show nice graphical charts.
The data for the charts can come from an external web service running on a Java EE server.
I will cover the Java EE part later, but lets start with the UI in Angular 2 first.

Below is a screenshot of our finished Angular 2 App.
![Report App screenshot will be updated here soon](/assets/images/ng_reportapp_project.png){:class="img-responsive"}

Few UI considerations:
- It would be good to have the UI responsive, so we need *Bootstrap* here.
- Using CSS for styling our components is okay but *Sass* is better.
- We need components and [PrimeNg](http://www.primefaces.org/primeng/) would be a great choice as it offers many.
- A reporting app certainly requires some charts, with PrimeNg we get the chart components too.

>If you don't need PrimeNg but still wish to use some Charts then we could also use [ng2-charts](http://valor-software.com/ng2-charts/).
PrimeNg charts are based on Charts.js.


Let's get started! 

Let's install angular-cli first. (Ignore if you already have it by following *Method 2* above).
{% highlight bash %}
npm install -g @angular/cli
{% endhighlight %}

Now create the project by creating a folder called "report-viewer" and initialize Git in that same directory.
{% highlight bash %}
mkdir report-viewer
cd report-viewer
git init .
{% endhighlight %}

Next lets create the ng-reportapp within the same directory.
We will call it **ng-reportapp** and use SCSS (Sass enabled) along with routing.

{% highlight bash %}
ng new ng-reportapp --style=scss --routing
{% endhighlight %}

The output of ng command would look similar to below:
![Angular 2 Project](/assets/images/ng_new_reportapp.png){:class="img-responsive"}

Now with the project created lets give it a run.
{% highlight bash %}
cd ng-reportapp
ng serve 
{% endhighlight %}

With that you should be able to open the URL: http://localhost:4200/ in your browser to view our [Report App](http://localhost:4200)

![Running on localhost](/assets/images/ng_cli_project_running.png){:class="img-responsive"}

If you reached this far then congrats, we are now through the setup step and can start building upon this.

## Coding in an editor

Use an editor of your choice such as Sublime Text 3 or Visual Studio Code. I recommend using Visual Studio Code, for Angular development as it helps with productivity.

Installation of VS Code on linux is covered [here](https://code.visualstudio.com/docs/setup/linux)

Open the project folder in VS Code.

*In [part 2]({% post_url 2017-03-24-angular2-javaee-project %}), we will start building the UI components and structure the project*