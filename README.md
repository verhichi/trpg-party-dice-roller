# Table of Contents
1. My Motive
1. TL;DR
1. Technologies Used
1. using the Application
1. Practicality

# 1. My Motive
- I often play TRPG with friends on Skype.
- We each have our own dice tools, meaning, if we wanted to, we can lie about our dice rolls(Not that my friends do that, but it's always a possibility).
- I thought it'd be cool if we can share dice result's online, in real-time.
- One google search revealed that there are many sites that provide such services(and even go as far as show character stats, maps, etc). **But I found that most of them are cluttered with functions making it hard to see/understand and also require account registeration.**
- I wanted to create a web application that just has the bare-bone function of sharing dice rolls that's easy to understand and easy to use.
- I wanted to learn about WebSockets.
- I wanted to try out making an angular application.

# 2. TL;DR
- github
    - https://github.com/verhichi/trpg-party-dice-roller
- Available via following URL
    - https://trpg-party-dice-roller.now.sh/

Image of lobby
![1543147433168.jpg](https://qiita-image-store.s3.amazonaws.com/0/317253/f13338aa-8eba-0bcc-b4db-5dc2f8568df2.jpeg)

Image of room
![1543147738791.jpg](https://qiita-image-store.s3.amazonaws.com/0/317253/17bcbf74-2989-251e-abde-9b10a064d9ae.jpeg)

# 3. Technologies Used
- node.js (v8.10.0)
   - express(v4.16.4) - a popular node.js framework
   - socket.io (v2.1.1) - a library to use webSockets on the server-side
   - socket.io-client (v2.1.1) - a library to use webSockets on the client-side
   - @types/socket.io-client (v.1.4.32) - a library to use client-side web Socket for angular
- @angular-cli (v1.6.8) - a tool is initialize, develop, scaffold, and maintain angular applications

# 4. Using the Application
1. Have one user from your party to create a room.
2. Have all the other users from your party to join the room by entering the room ID of the created room.
3. Each user will have a container showing their display name and their dice roll result. Your own container is the green one at the top.
4. Edit your display name by clicking the EDIT button and entering your desired display name in the prompt.
5. Edit the dice settings by changing the value of "N" d "S" and the "Bonus" value. Where "N" is the number of dice, "S" is the number of sides on each dice, and "Bonus" is the value to add or subtract after adding all the results of the roll.
6. Your roll result will be shared amongst the users in the room.

# 5. Practicality
I actually think this application is practical for the following reasons…

- There is none of that annoying account registeration.
- I designed the UI/UX to be as intuitive as possible, so it's easy to use.
- I minimized the functions available in the application to just dice-rolling; making it easier to see and use.
- Responsive designed so the application is available through all devices.

Despite all that, there are couple of bugs left to fix and designs I would like to add/renew.
So don't you think this is all ;)
