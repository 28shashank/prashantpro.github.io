---
layout: post
title:  "Angular 2 Building a sample project"
date:   2016-06-27 12:06:00
categories: Angular
title_short: Angular 2 Sample project
comments: true
author: Prashant Padmanabhan
---
* content
{:toc}

## Overview
Angular JS (Angular 2) is a popular framework, you can checkout [Google trends](https://www.google.com/trends/explore?q=Angular%202) for reference.
As a developer this can be a great tool in your arsenal!

Here I go over few of the things which should help you get started the right way (*Opinionated*) rather than a quick and dirty example which leaves you mid-way.

### What you will learn:
1. Setting up an Angular 2 Project
2. Local development
3. Publishing to Apache
4. Google Charts Integration
5. Using docker for Apache

## Prerequisite installation
You need to have Node and NPM installed.

Example below (note your version may differ, just stick to having the latest):
{% highlight bash %}
$ npm --version
3.10.9
$ node --version
v7.2.0
{% endhighlight %}

## Getting Started

There are two widely used methods to start off building your **Angular 2** project.
- **Method 1**: Checkout a quickstart sample project and build upon it.
    Below few lines show the steps to clone quickstart repository using Git and then run "npm install" followed by "npm start" to load the app.
    {% highlight bash %}
    git clone https://github.com/angular/quickstart.git ng-helloworld
    cd ng-helloworld
    npm install
    npm start
    {% endhighlight%}

    With above the site should be running locally at this URL: http://localhost:3000/

- **Method 2**: **Preferred** Use [Angular CLI](https://cli.angular.io/)
    Below few lines show the steps to setup angular CLI and use it to build and run a new project.
    {% highlight bash %}
    npm install -g angular-cli
    ng new ng-helloworld
    cd ng-helloworld
    ng serve 
    {% endhighlight %}
    With above the site should be running locally at this URL: http://localhost:4200/

We will be using **Method 2** to begin with (you can follow along with Method 1 as well if you wish).

The goal is to build a reporting angular app, which should show nice graphical charts. 
The data for the charts can be an external web service, such as a REST API.

Let's get started! 

Let's install angular-cli first. (Ignore if you already have it).
{% highlight bash %}
npm install -g angular-cli
{% endhighlight %}

Now create the project. We will call it ng-dashboard.

![Angular 2 Project](/assets/images/ng_new_project.png){:class="img-responsive"}

At this point you have created the bare bone project structure, lets run it.
{% highlight bash %}
cd ng-dashboard
ng serve 
{% endhighlight %}

Once done, you should be able to open the URL: http://localhost:4200/ in your browser [Dashboard App](http://localhost:4200)

![Running on localhost](/assets/images/ng_cli_project_running.png){:class="img-responsive"}

If you reached this far then congrats, we are now through the setup step and can start off coding the project.

## Building the Dashboard project

Use an editor of your choice such as Sublime Text 3 or Visual Studio Code. I prefer Visual Studio, for Angular development as it helps with productivity.

Open the project in VS Code.

*That's it folks, Cheers!*