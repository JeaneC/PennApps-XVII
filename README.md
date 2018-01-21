# PennApps-XVII

    Gradian is a classroom tool used by both professors and students to bring a more interactive and complete learning environment. 
This is a very simple, intuitive and user-friendly mobile and web tool that can be easily learned. Both the web and the mobile applications use the same login information from the student.

ABOUT
## Inspiration
We were inspired by hard working teachers and students. Although everyone was working hard, there was still a disconnect with many students not being able to retain what they learned. So, we decided to create both a web application and a companion phone application to help target this problem. 
## What it does
The app connects students with teachers in a whole new fashion. Students can provide live feedback to their professors on various aspects of the lecture, such as the volume and pace. Professors, on the other hand, get an opportunity to receive live feedback on their teaching style and also give students a few warm-up exercises with a built-in clicker functionality.
The web portion of the project ties the classroom experience to the home. Students receive live transcripts of what the professor is currently saying, along with a summary at the end of the lecture which includes key points. The backend will also generate further reading material based on keywords from the lecture, which will further solidify the students’ understanding of the material.
## How we built it
We built the mobile portion using react-native for the front-end and firebase for the backend. The web app is built with react for the front end and firebase for the backend. We also implemented a few custom python modules to facilitate the client-server interaction to ensure a smooth experience for both the instructor and the student. 
## Challenges we ran into
One major challenge we ran into was getting and processing live audio and giving a real-time transcription of it to all students enrolled in the class. We were able to solve this issue through a python script that would help bridge the gap between opening an audio stream and doing operations on it while still serving the student a live version of the rest of the site. 
## Accomplishments that we’re proud of
Being able to process text data to the point that we were able to get a summary and information on tone/emotions from it. We are also extremely proud of the 
## What we learned
We learned more about React and its usefulness when coding in JavaScript. Especially when there were many repeating elements in our Material Design. We also learned that first creating a mockup of what we want will facilitate coding as everyone will be on the same page on what is going on and all thats needs to be done is made very evident. We used some API’s such as the Google Speech to Text API and a Summary API. We were able to work around the constraints of the API’s to create a working product. We also learned more about other technologies that we used such as: Firebase, Adobe XD, React-native, and Python.
## What's next for Gradian
The next goal for Gradian is to implement a grading system for teachers that will automatically integrate with their native grading platform so that clicker data and other quiz material can instantly be graded and imported without any issues. Beyond that, we can see the potential for Gradian to be used in office scenarios as well so that people will never miss a beat thanks to the live transcription that happens. 


## THE WEB APPLICATION
    The web application allows for the teacher to post their slides to be viewed by all the students in his/her class when they log in. Along with this, the web application also live transcribes the lecture for the students to view and take note from. Taking notes is also made easy as the students can take notes in the web app while having the transcript available also. The notes and transcripts can always be accessed by the student even if it has been a whole semester. Once the student is logged in, they can either access the previous powerpoint presentations, view the current slideshow and 
    
## THE MOBILE APPLICATION
    The mobile application allows for increased interaction between the professor and students and allows them to get live feedback from the students. Feedback includes things such as: go faster, slow down, im confused, i understand (clear), speak up and speak lower. When the students press the button on their phone apps, the professor can see the feedback. also, students can ask professors questions during the lecture without having to feel scared since the questions provide anonymity from peers. I could ask the Professor why the mitochondria is the powerhouse of the cell if i felt like it in Bio class. Lastly, if the professor has an inclass question to ask his students, they can reply to the question on their phone. The professor will be able to see the answers each individual student put and also the statistics for each class. This can be used by the professor to alter their teaching methods or even assign participation grades to each student. 
