##################################################

# User Stories

# US001

As a user, I want to be able to save the jobs I am interested in.

- add "save" icon on job card

User is loged in:

- add "Saved Jobs" menu item in the search results bar
- create "Saved Jobs" page

User is not loged in:

- add pop-up informing the user to log in
- add login button in pop-up

# US002

As a logged in user, I want to be able to access my profile page

- add "My Profile" button in the search results bar
- create My Profile page
- when user clicks on profile picture, a pop-up with profile picture, email address and sign-out button appears

# US003

Priority low

As a user, I want to see a map of all the locations of the available jobs, in the "Locations" page

##################################################

# Tasks / Features

# FEAT001

Add form validation to the search form in Hero
User should not be able to click "search" unless the two fieds are completed
Link the "location" field to the "locations" filter in the jobs result page (needs to be added)

# FEAT002

Add expand functionality to job card (+dummy about job text)

# FEAT003

Add more spotlights and create carousel of cards

# FEAT004

Create "No Results" page when there are no jobs to display
Should contain "search again" actionable text, that will refresh the filters

# FEAT005

Create dynamically changing pictures in the Hero, same as the text

##################################################

# Bugs

# FIX001

Whne scrolling to the bottom of the main page, the dynamic text in hovering over the main nav bar
CSS needs fixing
