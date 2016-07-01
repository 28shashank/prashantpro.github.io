---
layout: post
title:  "How to open a SSH tunnel and keep it running in background!"
date:   2015-03-31 00:06:00
categories: linux
excerpt: SSH tunnel
comments: true
---

* content
{:toc}

# Opening a ssh tunnel

This is more of a quick note which I required for setting up Apache to serve content via a SSH tunnel.

So lets say we want to connect to a remote machine using SSH and open a tunnel, this we can do as shown in the previous [post]({% post_url 2015-02-19-how-to-ssh-linux %}).

But what if you wanted to open the tunnel and keep it running in the background, so you don't have to keep the terminal open all the time.
You could probably use other techniques, but this is the one I used.

Here's how to do that:
ssh -f -N _remote_username@the_remote_server_ip

>The -f option will run the ssh command in the background just before execution. 
Meaning it will allow for entering the password or other inputs before putting it in background.
The -N option will signal that we don't want to execute any remote commands.
Both options have to be combined to get the desired effect.

This will return you to the command prompt but still keep the SSH connection and tunnel open.


*Cheers!*
