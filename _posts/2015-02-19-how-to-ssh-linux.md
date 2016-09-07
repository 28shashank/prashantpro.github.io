---
layout: post
title:  "Using SSH for accessing remote server via a Jump Host and other handy things!"
date:   2015-02-19 12:06:00
categories: linux
title_short: SSH with Jump Host
author: Prashant Padmanabhan
comments: true
---

* content
{:toc}

# Basic usage

Lets say you need to connect to a remote Linux server.

The stand way to connect from terminal:
ssh _remote_username@the_remote_server_ip

Here, the_remote_server_ip needs to be the IP address or the hostname or the domain name from which the remote server is accessible.

Example:
{% highlight bash %}
ssh prashant@192.168.6.50
{% endhighlight %}

You should get prompted for a password (passwordless login is possible too, see below), post entering the right credentials you are in.


You could also write the same command with the -l (that's lowercase L) argument.

ssh -l _remote_username the_remote_server_ip

Example:
{% highlight bash %}
ssh -l prashant 192.168.6.50
{% endhighlight %}

Password-less login using SSH is also possible and allows for much easier (also secure) connection.
When you often have to login/logout of various servers this is a great time saver.

There's plenty of information out there about how to do this, just search it in on the web.

## Config file
Next, to make repeated access easy, create a "config" file in your ssh directory under your users home directory.
{% highlight bash %}
vi ~/.ssh/config
{% endhighlight %}

Put the following content as an example (replace the IP with your remote server IP and replace the Username with yours).

{% highlight bash %}
Host remotebox
  Hostname 192.168.6.50
  User prashant
{% endhighlight %}

With the above config file in place you should be able to now use the below shortcut command:

{% highlight bash %}
ssh remotebox

Above is same as this:
ssh prashant@192.168.6.50

If you wanted to use a different name but still use the config style shortuct:
ssh -l anotherusername remotebox

Above is same as this:
ssh anotherusername@192.168.6.50
{% endhighlight %}\\
That's it, you should now have a easy way to login to your target server from a Jump Host with a lot less to type.
As an added advantage you can now access Ports of target server locally. All you need is an *active* connection to the target done via ssh.


---

# Jump Server

Now, with some basics covered here's what we are trying to do:
You need to access a production server which is behind a firewall (Can't ssh directly to the server).
But there is a Jump server available.

>Jump Server:
A machine that you need to connect to first then only from this machine you can SSH into the remote server.
Jump servers are used to protect the other servers from direct access. 
It would typically be in DMZ while the other servers are in a secure zone.

Now this means you have to _first_ ssh into the Jump server then from that machine ssh _again_ to the target server.

To make it easier to login with a single command edit the ~/.ssh/.config file entry like below:
{% highlight bash %}
Host productionbox
  Hostname 10.10.19.20
  User admin
  ProxyCommand ssh -W %h:%p prashant@192.168.6.50
{% endhighlight %}

* Here Hostname with 10.10.19.20 is assumed to be the target server IP.
- The User denotes the remote user on the target server, here admin.
- ProxyCommand has the user and IP of the Jump Server, like prashant@192.168.6.50.

# Port Forwarding with Jump Server
What if you also wanted to be able to do Port Forwarding.

>A technique which will allow you to access the target machines Port
from your local machine. Given that its blocked from all but allowed only from the Jump Server.

You simply need to add a LocalForward entry to your config like below:
{% highlight bash %}
Host productionbox
  Hostname 10.10.19.20
  User admin
  ProxyCommand ssh -W %h:%p prashant@192.168.6.50
  LocalForward 8080 127.0.0.1:8080
{% endhighlight %}

Now 
{% highlight bash %}
ssh productionbox
{% endhighlight %}

Once connected any data sent to the local IP:PORT (127.0.0.1 8080) will be directed to the productionbox target server.
(Port on Local machine and target can be different).

At times the setup can get complicated and you may need to hop between multiple Jump server to reach the target server.
This can be done via _ProxyCommand_ chaining like below:
{% highlight bash %}
Host jump_box
  Hostname 192.168.6.50
  User prashant
  
Host production_box
  Hostname 10.10.19.20
  User admin
  ProxyCommand ssh -W %h:%p jump_box

Host production_db_box
  Hostname 10.10.19.23
  User admin
  ProxyCommand ssh -W %h:%p production_box
  LocalForward 3306 127.0.0.1:3306

#Next on command line you can
ssh production_db_box
{% endhighlight %}

---

# Things you may find handy
You can execute a command on the remote machine without leaving your machine (shell), the command gets executed remotely and your connection is closed post that.

For being concise I'm using my config file as shortcut for ssh, you could substitue the standard *ssh user@remotebox* as needed. 

The below would connect to the remote machine then execute "df -h" on it and display the available and total space on the remote machine as ouput to your terminal.
{% highlight bash %}
ssh remotebox "df -h"
{% endhighlight %}\\
A more advance usage, could be where you need to connect to a MySQL Slave server to check the Slave Running status as below:
{% highlight bash %}
ssh mysqlslave_server "mysql -u admin -p secret -e 'show slave status\G' | grep Slave_SQL_Running:"
{% endhighlight %}\\
If you wanted to have some interaction with the remote command before exiting you can do so with "-t" option.
{% highlight bash %}
ssh -t remotebox "top"
{% endhighlight %}\\
Lets say we want to execute multiple commands on the remote machine.
The below would create a file test.txt in the logged in users home directory then do a listing via the ls -l command.
{% highlight bash %}
ssh remotebox "touch test.txt; ls -l"
{% endhighlight %}\\
*Cheers!*
