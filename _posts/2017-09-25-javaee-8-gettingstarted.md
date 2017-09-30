---
layout: post
title:  "Java EE 8 Starter"
date:   2017-09-25 12:10:00
categories: Java
title_short: JEE 8 Starter
comments: true
author: Prashant Padmanabhan
---
* content
{:toc}

## Create a Java EE 8 project

If you haven't heard already, then let me share the good news. The long awaited wait for Java EE 8 is finally over, as Oracle has officially released Java EE 8.

While vendors are yet to release JEE 8 compliant servers, that doesn't mean we can't try it out today.
The easiest way to get started is build a maven project which is then deployed to a JEE 8 server such as Glassfish v5 or Payara 5.

So let's get started with our first Java EE 8 project, which is going to be a microservice having REST endpoints.

### Maven project

Generate our maven project, which can then be imported in any IDE of your choice.

{% highlight bash %}
➜  mkdir jee8-starter 
➜  cd jee8-starter
➜  mkdir -p src/main/{java,resources}
{% endhighlight %}

Next create a pom.xml file under the project (jee8-starter) which has the below contents:

**jee8-starter/pom.xml** - This is how the pom.xml looks

    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <groupId>org.prashantp.starter</groupId>
        <artifactId>jee8-starter</artifactId>
        <packaging>war</packaging>
        <version>0.0.1-SNAPSHOT</version>
        <name>jee8-starter</name>

        <properties>
            <maven.compiler.source>1.8</maven.compiler.source>
            <maven.compiler.target>1.8</maven.compiler.target>
            <failOnMissingWebXml>false</failOnMissingWebXml>
        </properties>
        
        <dependencies>
            <dependency>
                <groupId>javax</groupId>
                <artifactId>javaee-api</artifactId>
                <version>8.0</version>
                <scope>provided</scope>
            </dependency>
        </dependencies>
        
        <build>
            <finalName>jee8-starter</finalName>
        </build>
    </project>


> This is a minimal pom.xml which adds a dependency on Java EE 8.0 API and sets the Java lang source to  SE 8. You may name your project and group/artifact values as desired.

If you run **mvn clean install** on this project it will produce a WAR file in the target directory.

First thing to do is bootstrap JAXRS and then create our endpoint.

Here's the relevant code needed for doing just that.

    @ApplicationPath("resources")
    public class JaxrsActivator extends Application { }

Once we have JAXRS activated under the "resources" URI, we can now go ahead and define a web resource as below:

    import javax.json.Json;
    import javax.json.JsonObject;
    import javax.ws.rs.*;

    @Path("servers")
    public class ServerResource {

        @GET
        @Produces(MediaType.APPLICATION_JSON)
        public Response get() {
            Runtime runtime = Runtime.getRuntime();
            JsonObject json = Json.createObjectBuilder()
                    .add("processors", runtime.availableProcessors())
                    .add("memory", runtime.freeMemory())
                    .build();
            
            return Response.ok(json).build();
        }
    }

So we have bootstrapped JAXRS and defined a "servers" web resource or endpoint as it's called.

Build the project from the project directory **jee8-starter**

`mvn clean install`

This would build our WAR file which can now be deployed on any JEE 8 server!

### Deploying the JEE 8 War using docker

The easiest option would be to use Docker to experiment with JEE 8 server. Here's a minimal Dockerfile to deploy our project under Payara 5 micro server.

The *Dockerfile* file.

    FROM payara/micro:5-SNAPSHOT

    COPY target/jee8-starter.war $DEPLOY_DIR


To build our maven project and then to build the docker image, we can run it as follows:

{% highlight bash %}
➜  mvn clean install && docker build -t jee8-starter .
{% endhighlight %}

The above is just combining our two commands of building the maven project followed by issuing the docker build command to create the jee8-starter image.

To run our docker image we can issue the docker run command as follows:

{% highlight bash %}
➜  docker run -it -p 8080:8080 --name jee8 jee8-starter
{% endhighlight %}

Once you have the container running with our microservice, here's how you can invoke it using "curl" command, which should show you a JSON output.

{% highlight bash %}
➜  ~ curl --header 'Accept: application/json' http://localhost:8080/jee8-starter/resources/servers/
{"processors":2,"memory":153799056}
{% endhighlight %}

With that we have our JEE 8 application running on Payara Micro server. You can stop the server by pressing "Ctrl + C".


Similarly you can try running the project on **Glassfish v5** by having the below Dockerfile

    FROM airhacks/glassfish:v5

    COPY target/jee8-starter.war ${DEPLOYMENT_DIR}

The steps to build and run remain the same as before, so you just need to issue the below cmd (Assuming you changed the Dockerfile as shown above).

{% highlight bash %}
➜  mvn clean install && docker build -t jee8-glassfish5 .
{% endhighlight %}

Now, run it like this:
{% highlight bash %}
➜  docker run -it -p 8080:8080 --name jee8-glassfish jee8-glassfish5
{% endhighlight %}

That's it the URL would be the same as before, that we used for the "curl" command.

If you followed along, then you saw how easy it can be to run a JEE 8 application of different servers using docker. With that, you should have just enough of a starter project and setup to experiment further on.

*Cheers*