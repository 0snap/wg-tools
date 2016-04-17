# WG-Tools

## Purpose

Lightweight application for self hosting. Stores expenses and calculates mean. Offers a human-usable interface for non-tech people. Currently under development, feel free to join. Nexts steps are a test setup, after the initial idea is roughly shaped into code. Then come all the things in "thoughts.txt".

Its planned to host this app for my own usage purposes -- anyone who stumbles upon that page may use it as well. As soon as I find pre-alpha enough it will be hosted on wg-tools.de


## Usage

You need a mongodb, python and nodejs.
Everything is setup for development; start the frontend with "npm run dev" and the python server with "./server.py". Your mongodb should be running on localhost.


## Todos

### Expenses Header:
    [x] List header, select with dropdown 
    [x] Create lists
    [x] Delete lists
    [] make list uneditable

### List behavior:
    [] automatically create new list per week/month?
    [] make monthly/weekly lists uneditable on next month/week
    [] no editform on uneditable lists
    [x] set new list as active after creation

### General panels:
    [x] Graph for expenses
    [] Graph for depts

### Direct depts:
	[] Graph for direct borrows
    [] List-types?


### Group notes:
	[] have some note panel
	[] easy counter for stuff (eg. for series)


### General behavior:
	[x] Confirm delete of items
	[x] Confirm delete of lists
	[] Comments on items
	[x] Login
	[x] Token in cookie
	[x] Logout
	[x] URL-Schema
	[x] React-Router
	[x] Create WG
	[x] Header logout
	[] dont submit empty forms
	[] dont leak DB ids to FE (still relevant?)
	[x] Tunnel FE --> BE (Container Setup)


### Tests:

	[x] Test setup BE
	[x] Test setup FE

    [x] FE - render
    [] FE - state -> login / app
    [] FE - routes

    [x] BE - calculator
    [] BE - login
    [] BE - security
    

