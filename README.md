# WG-Tools

You can get the whole application containerized for self hosting at dockerhub!

### Build
[![Build Status](https://travis-ci.org/0ortmann/wg-tools.svg?branch=master)](https://travis-ci.org/0ortmann/wg-tools)

### Docker Layer
Frontend:
[![](https://badge.imagelayers.io/fixel/wg-tools:backend.svg)](https://imagelayers.io/?images=fixel/wg-tools:frontend 'Get your own badge on imagelayers.io')

Backend:
[![](https://badge.imagelayers.io/fixel/wg-tools:backend.svg)](https://imagelayers.io/?images=fixel/wg-tools:backend 'Get your own badge on imagelayers.io')

Mongo-Container:
[![](https://badge.imagelayers.io/fixel/wg-tools:mongo.svg)](https://imagelayers.io/?images=fixel/wg-tools:mongo 'Get your own badge on imagelayers.io')

## Purpose


If you are living in a flat share and have to manage expenses or other stuff and you want some just-working tool for that purpose, then you are at the right place here. This applicaiton is meant for diy hosting and development. Feel free to contribute!

A hosted version can be found at: [wg-tools.de](https://wg-tools.de). 


### Behavior

You can create a WG (flat share) with a login, then actually login with that. The app stores expenses and calculates the mean among all participants. It offers a human-usable interface for non-tech people. Currently under development, so basically anything may change from now to then!!! Nexts steps are security tests for the login. Then come all the things that are not already checkmarked below in this readme.


## Usage

You need a mongodb, python and nodejs.
Everything is setup for development; start the frontend with "npm run dev" and the python server with "script/devServer.sh". Your mongodb should be running on localhost.
Or start everything inside a container. Install docker-compose and start everything via 'up'.


## Todos

### Expenses Header:
    [x] List header, select with dropdown 
    [x] Create lists
    [x] Delete lists
    [x] make list uneditable
    [x] mobile header

### List behavior:
    [] automatically create new list per week/month?
    [] make monthly/weekly lists uneditable on next month/week
    [x] no editform on uneditable lists
    [x] set new list as active after creation

### General panels:
    [x] Graph for expenses
    [] Graph for depts

### Direct depts:
	[] Graph for direct borrows
    [] List-types?

### Dispenses:
	[x] db: store dispenses
	[x] calculator: concept of dispense + calc
	[x] fe: intuitive concept!
	[x] fe: styling

### Group notes:
	[] have some note panel
	[] easy counter for stuff (eg. for series)

### Header & Static Pages:
	[x] static pages (faq, about, etc)
	[x] navigation in header
	[] "custom space with settings"-button
	[x] mobile header ==> hamburger

### Custom space for configuring WG settings
	[] store wg settings (data model etc)
	[] graph granularity
	[] list clipping interval (requires list clipping in general)
	[] colortheme?

### flux -> redux 
	[x] refactor 'old' concepts to match top level state-tree idea of redux 
	[] actionCreators
	[] reducers
	[] distinguish dev + prod
	[] remove old flux code, deps, everything
	[] switch to redux
	[] redux + react-router

### General behavior:
	[x] Confirm delete of items
	[x] Confirm delete of lists
	[x] Login
	[x] Token in cookie
	[x] Logout
	[x] URL-Schema
	[x] React-Router
	[x] Create WG
	[x] Header logout
	[x] Tunnel FE --> BE (Container Setup)
	[x] Tunnel expenses actions
	[x] Tunnel login actions 
	[x] python cgi for production
	[x] container setup
	[x] configurable endpoints for py-backend and mongo
	[x] message about backend-calls (eg. register already in use etc)
	[x] Comments on items
	[x] ssl on server (caddy)
	[x] navigation, faq/about pages & link to github & homepage
	[x] dont submit empty forms
	[] general "backend (un)reachable" error for frontend 
	[] dont leak DB ids to FE (still relevant?)
	[] server side rendering


### Tests:

	[x] Test setup BE
	[x] Test setup FE

    [x] FE - render
    [] FE - state -> login / app
    [] FE - routes

    [x] BE - calculator
    [] BE - login
    [] BE - security


### Cool third party stuff

	[x] docker hub (fixel/wg-tools)
	[x] layers.io in README
	[x] travis ci
	[x] build status in README