---
layout: post
title:  "Structuring Angular and Java projects"
date:   2017-03-24 12:10:00
categories: Angular
title_short: Structure Angular and Java
comments: true
author: Prashant Padmanabhan
---
* content
{:toc}

## Frontend and Backend setup
In the first part, I shared how you would begin setting up an Angular 2 project [(Part 1)]({% post_url 2017-02-19-angular2-building-project %}).
Before diving further into Angular, let's structure the codebase so we can work with both frontend and backend.

Let's visualize how the communication between Angular and Java would work.
Here there are two popular approaches (1) and (2) each having some pros and cons.

![Angula and Java Deployed](/assets/images/ng_javaee_deployment.png){:class="img-responsive"}

We need a way to structure the project such that the decision of picking a deployment strategy can be delayed if not changed as needed later.

The choice of deployment can be influenced by many factors:
- Is the same team going to work on frontend and backend
- Do we need independent releases of frontent vs backend
- and so on...

>The goal is to use a structure that's flexible and in turn allows us to pick either of the deployment choice.

So let's see how to use maven to create a multi module project where the frontend and backend are modules.
These can later be worked upon and deployed independent of each other or combined as one release.

### Create Multi module project for Angular and JEE

The recommended way to build an Angular 2 application is to make use of Angular CLI tool. 
Similarly when you work with Java EE projects you typically use Maven as the build tool.

If you have followed along from the earlier part then you must already have the ng-reportapp created under report-viewer.
In case you did, then skip the below and move on to the maven configuration section.

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

### Maven configuration
If you wish to download the setup code then just clone it like below:

`git clone -b report-viewer-01 https://github.com/prashantpro/report-viewer.git`

If you wish to do this manually then follow along.

Create a pom.xml under report-viewer with the following content.

**report-viewer/pom.xml** - This is the parent pom

    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <groupId>org.prashantp</groupId>
        <artifactId>report-viewer</artifactId>
        <version>1.0-SNAPSHOT</version>
        <packaging>pom</packaging>

        <modules>
            <module>ng-reportapp</module>
            <module>jee-report</module>
        </modules>

    </project>

>The parent pom.xml needs to list both modules. The **first** module should be the UI (Angular 2) module followed by the Java/Spring module.

Now, create a pom.xml under ng-reportapp, with the following contents:

    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <parent>
            <groupId>org.prashantp</groupId>
            <artifactId>report-viewer</artifactId>
            <version>1.0-SNAPSHOT</version>
        </parent>
        <artifactId>ng-reportapp</artifactId>
        <packaging>jar</packaging>    
        
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-clean-plugin</artifactId>
                    <version>3.0.0</version>
                    <configuration>
                        <failOnError>false</failOnError>
                        <filesets>
                            <fileset>
                                <directory>.</directory>
                                <includes>
                                    <include>dist/**/*.*</include>
                                </includes>
                                <followSymlinks>false</followSymlinks>
                            </fileset>
                        </filesets>
                    </configuration>
                </plugin>
                <plugin>
                    <groupId>org.codehaus.mojo</groupId>
                    <artifactId>exec-maven-plugin</artifactId>
                    <version>1.5.0</version>
                    <executions>
                        <execution>
                            <id>angular-cli build</id>
                            <configuration>
                                <workingDirectory>.</workingDirectory>
                                <executable>ng</executable>
                                <arguments>
                                    <argument>build</argument>
                                    <argument>--prod</argument>
                                    <argument>--base-href</argument>
                                    <argument>/ng-reportapp/</argument>
                                </arguments>
                            </configuration>
                            <phase>generate-resources</phase>
                            <goals>
                                <goal>exec</goal>
                            </goals>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
    </project>

>If you run **mvn clean install** on this project then it will in turn invoke the ng command which would build the ng-reportapp project.

It's time to create our backend module **jee-report**, so lets execute the following:
{% highlight bash %}
cd report-viewer
mvn archetype:generate -DgroupId=org.prashantp -DartifactId=jee-report -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false
{% endhighlight %}

You can replace the generated pom.xml with the below contents.

    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.prashantp</groupId>
        <artifactId>report-viewer</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <artifactId>jee-report</artifactId>
    <packaging>war</packaging>

    <name>jee-report</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.source>1.8</maven.compiler.source>
    </properties>

    <dependencies>
        <dependency>
            <groupId>javax</groupId>
            <artifactId>javaee-web-api</artifactId>
            <version>7.0</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
    <build>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
            </resource>
        </resources>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>2.3</version>
                <configuration>
                <failOnMissingWebXml>false</failOnMissingWebXml>
                <webResources>
                    <resource>
                        <!-- this is relative to the pom.xml directory -->
                        <directory>../ng-reportapp/dist/</directory>
                    </resource>
                </webResources>
                </configuration>
            </plugin>
        </plugins>
    </build>
    </project>

>The maven-war-plugin configuration is responsible for copying the Angular output (**dist** directory) 
and map it into the web application project for the UI part.

Based on what we did so far you should be having the below structure:

**cd report-viewer** (This is the parent POM project)

    report-viewer *$ tree -L 2 -I node_modules
    .
    ├── jee-report
    │   ├── pom.xml               -- This is for Java EE module
    │   └── src
    ├── ng-reportapp
    │   ├── e2e
    │   ├── karma.conf.js
    │   ├── package.json
    │   ├── pom.xml               -- This is to build NG project using maven
    │   ├── protractor.conf.js
    │   ├── README.md
    │   ├── src
    │   ├── tsconfig.json
    │   └── tslint.json
    └── pom.xml                   -- This is the parent POM

Build the project from the parent directory **report-viewer**

`mvn clean install`

Then you will see that first it builds the Angular project then Web Project, while doing the build for the latter it also copies the Angular dist contents into the Web projects root. 

So you get an output similar to the below in the WAR/Web project output directory.

report-viewer/jee-report/target/jee-report-1.0-SNAPSHOT.war

    .
    ├── favicon.ico
    ├── index.html
    ├── index.jsp
    ├── inline.5f3bf811002370d445df.bundle.js
    ├── main.cc8715308ebee677bf36.bundle.js
    ├── META-INF
    ├── polyfills.f52c146b4f7d1751829e.bundle.js
    ├── styles.d41d8cd98f00b204e980.bundle.css
    ├── vendor.dc285188c4ac5c470953.bundle.js
    └── WEB-INF
        ├── classes
        └── web.xml

This can now be deployed as a WAR on any JEE web container!

### Conclusion
Given the angular module and java ee modules are independent, these can be built and deployed separately.
For a more cohesive option, we can combine the output of UI (Angular) and bundle it within the war itself.

We have so far seen how to build an Angular CLI project and how to structure it to work with a backend solution.
Next part, will be about coding the UI components followed by the backend API.
