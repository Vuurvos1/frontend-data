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

For the Volkskrant, we will be research/explore several datasets about a topic that journalist might write an article about. In this case, it is all about parking.

For this article visualizations will be made using data from RDV, these datasets contain information about car parking and which vehicles park where inside the Netherlands. The data from these datasets will be visualized using the D3 JavaScript library.

Check out the [wiki](https://github.com/vuurvos1/frontend-data/wiki) of this repository to find out more detailed information about the project.

### 🛠 Build with

- Node.js
- D3.js
- NPM packages
- Lots of sweat

## 🔍 Research question

Where do I have the most chance to find a parking location?

### Datasets needed

- Location of parking spots
  [GEO-Parkeer-Garages](https://opendata.rdw.nl/Parkeren/GEO-Parkeer-Garages/t5pc-eb34) (Parking garages locations)
- Where are the most parking spots?
  [Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s) (capacity of parking garages)
- How many parking spots are filled (preferably realtime)

### Assumptions

There is less chance to find a parking spot in the middle of a city than more on the outside
You have a higher chance to find a parking spot throughout the week than in the weekend.

## 🔧 Installing and using the project

First of all, make sure you have **Node.js**, **NPM** and **Git** installed

1. Choose or make a new directory to clone the project to
2. Clone the repository
   `git@github.com:Vuurvos1/functional-programming.git`
3. Cd into the project folder
4. Run `npm install` to install the needed npm packages

### 🚀 Launch the project

You can start the project using `npm start`
or run `npm run dev` if you are a developer

By default, the project will be hosted on **port 3000**

### ✏ Linting the project

Don't want to format all your code by hand and don't have ESLint installed? No problemo, use `npm run lint` to make the computer format all the code for you.

## 📝 Sources

[Chubby Racoon 🦝](https://github.com/rowinruizendaal) for brainstorming code and other ideas

Elliott, E. (2019, July 2). Master the JavaScript Interview: What is Functional Programming? Medium. https://link.medium.com/vHX7Nzr8o7

## 🗺️ License

Author: [Vuurvos1](https://github.com/Vuurvos1), license by [MIT](https://github.com/Vuurvos1/functional-programming/blob/main/LICENSE)
