# Functional Programming

## 📚 Table of contents

- [🤔 About](#-About)
  - [🛠 Build with](#-Build-with)
- [🔍 Research question](#-Research-question)
- [🔧 Installing the project](#-Installing-and-using-the-project)
  - [🚀 Launch the project](#-Launch-the-project)
  - [✏ Linting](#-Linting-the-project)
- [📝 Sources](#-Sources)
- [🗺️ License](#%EF%B8%8F-license)

## 🤔 About

![Screenshot data vizualization](https://raw.githubusercontent.com/wiki/Vuurvos1/frontend-data/img/appScreenshot.png)

For the Volkskrant, we will be research/explore several datasets about a topic that journalist might write an article about. In this case, it is all about parking.

For this article visualizations will be made using data from RDW, these datasets contain information about car parking and which vehicles park where inside the Netherlands. The data from these datasets will be visualized using the D3 JavaScript library.

Check out the [wiki](https://github.com/vuurvos1/frontend-data/wiki) of this repository to find out more detailed information about the project.

### See it live

The site is also hosted on Glitch, note that it can take a while to launch the app.
See it here: [frontend-data.glitch.me/](https://frontend-data.glitch.me/)

### 🛠 Build with

- Node.js
- D3.js
- NPM packages

## 🔍 Research question

Where do I have the most chance to find a parking location?

- Where are the most parking spots

  - Calculate the number of parking spots per x amount of residents

- How accessible are the parking spots?

  - Get a list if the parking garage has disabled access

- How much do I have to pay to park?

  - Get pricing per hour for certain garages

- What about parking during holidays and on the weekends (like Sunday)
  - See if there is data available for parking availability during certain days

**Cool to have**

- How full are parking garages/spots currently
  - Find an API or multiple to see how many cars are parked wherein real-time

### Datasets needed

- Location of parking spots
  [GEO-Parkeer-Garages](https://opendata.rdw.nl/Parkeren/GEO-Parkeer-Garages/t5pc-eb34) (Parking garages locations)
- Where are the most parking spots?
  [Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s) (capacity of parking garages)
- How many parking spots are filled (preferably realtime)

When combining these datasets based on areaIds and no match isfound, I will be voiding these values since I don't have the information needed to plot them properly.

### Concept sketch

My concept is to create a map showing the parking density inside the Netherlands, these values will be normalized with the population density to prevent a visualization that is almost the same as the population density in the Netherlands

![Map](https://raw.githubusercontent.com/wiki/Vuurvos1/frontend-data/img/datavizSketch.png)

**Tooltip for extra info**

![Tooltip](https://raw.githubusercontent.com/wiki/Vuurvos1/frontend-data/img/datavizSketchTooltip.png)

### Assumptions

There is less chance to find a parking spot in the middle of a city than further away from the city centre.
You have a higher chance to find a parking spot throughout the week than at the weekend.

## 🔧 Installing and using the project

First of all, make sure you have **Node.js**, **NPM** and **Git** installed

1. Choose or make a new directory to clone the project to
2. Clone the repository
   `git@github.com:Vuurvos1/frontend-data.git`
3. Cd into the project folder
4. Run `npm install` to install the needed npm packages
5. Run `npm run build` to build all needed files

### 🚀 Launch the project

You can start the project using `npm start`
or run `npm run dev` if you are a developer

By default, the project will be hosted on **port 3000**

### ✏ Linting the project

Don't want to format all your code by hand and don't have ESLint installed? No problemo, use `npm run lint` to make the computer format all the code for you.

## 📝 Sources

[Chubby Racoon 🦝](https://github.com/rowinruizendaal) for brainstorming code and other ideas

C. (n.d.). curran/dataviz-course-2018. GitHub. Retrieved November 10, 2020, from https://github.com/curran/dataviz-course-2018

Elliott, E. (2019, July 2). Master the JavaScript Interview: What is Functional Programming? Medium. https://link.medium.com/vHX7Nzr8o7

L. (2018, September 12). Farmers Markets - with d3-hexgrid. Blocks. https://bl.ocks.org/larsvers/7f856d848e1f5c007553a9cea8a73538

Holtz, Y. (n.d.). Button to change input data in barplot in d3.js (upgraded). D3 Graph Gallery. Retrieved November 12, 2020, from https://www.d3-graph-gallery.com/graph/barplot_button_data_hard.html

Tutorials Point. (n.d.). Functional Programming - Introduction - Tutorialspoint. Retrieved October 23, 2020, from https://www.tutorialspoint.com/functional_programming/functional_programming_introduction.htm

Wikipedia contributors. (2020, October 18). Functional programming. Wikipedia. https://en.wikipedia.org/wiki/Functional_programming

## 🗺️ License

Author: [Vuurvos1](https://github.com/Vuurvos1), license by [MIT](https://github.com/Vuurvos1/functional-programming/blob/main/LICENSE)
