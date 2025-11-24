Feature: Home component functionality
  Background:
    Given the application is running

  Scenario: Home component loads correctly
    Then the home component should be visible on the screen

  Scenario: Dashboard component loads correctly when clicking on button
    When the user clicks on the "Open Dashboard" button
    Then the dashboard component should be visible on the screen