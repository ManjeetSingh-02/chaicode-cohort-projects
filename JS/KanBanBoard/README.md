# Making a KanBan Board Clone

Create a KanBan board clone

## Introduction

The KanBan Board Clone is a web application designed for personal use to help users manage their tasks efficiently.
This application allows users to create, read, update, and delete tasks, and organize them into different stages of completion.

## Scope

The project aims to provide a basic yet functional KanBan board with essential features for task management.
This application will have a simple and user friendly interface to interact between users and application.
This application will store data locally to ensure persistence across sessions.

## Features and Requirements

### Phase 1

- Application must have 3 boards - Pending(Todo), Ongoing(In Progress) and Finished(Completed).
- Each Board must contain the following information:
  - Name of the board
  - Amount of tasks present in that board
  - All the tasks stored in that board
- Application must have functionality to switch between theme mode as per user preference.
- Application must have functionality to perform CRUD(Create-Read-Update-Delete) operations.
- Application must have functionality to store the tasks before as well as after performing CRUD operations.
- Application must have functionality to drag and drop the tasks among boards.
- Each Task must contain the following information:
  - Name of the task
  - Edit Task Button to edit the task
  - Delete Task Button to delete the task
  - Time of its creation
  - Date of its creation

### Phase 2

- Functionality to add boards and customize them.
- Boards customization must includes:
  - Name of board
  - Color of board

## User Stories or Use Cases

- As a user, I want to know amount of tasks present in each board.
- As a user, I want to view all the tasks present in each board.
- As a user, I want to create new tasks, so that I can add them to the boards as needed.
- As a user, I want to store all my tasks, so that I can view them as needed.
- As a user, I want to edit tasks, so that I can update the task details as needed.
- As a user, I want to move tasks between different boards, so that I can track the progress of my tasks.
- As a user, I want to delete tasks, so that I can remove completed or irrelevant tasks.

## Technical Requirements

- HTML: Structure the application layout and elements.
- CSS: Style the application for user friendly interface.
- JavaScript: Handle board and task management logic, including CRUD operations and local storage.

## Design Requirements

- User friendly Interface: Application must have a simple interface to view all boards and to add tasks, update tasks, remove tasks and view tasks.
- Drag-and-Drop Interface: Users must be able to drag and drop tasks between boards to update their tasks status.

## Timeline

- Phase 1(In a week):

  - Implement basic boards and CRUD operations.
  - Ensure boards contain required information.
  - Ensure tasks are stored locally with required information.

- Phase 2(Coming Soon):

  - Implement functionality to add custom boards.
  - Ensure boards can be customized by CRUD opeartions.
  - Ensure custom boards are stored locally with required information.
  - Enhance the user interface and experience.
