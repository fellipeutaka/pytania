# Pytania

Example:
https://quiz.rocketseat.com.br/quizzes/react

## TODO

- [x] Create account with Discord
- [x] Create account with Google
- [x] Create account with GitHub
- [] Create account with Magic Link
- [] Create Quiz
- [] Update Quiz
- [] Delete Quiz
- [] Play Quiz
- [] Like Quiz
- [] Dislike Quiz
- [] Comment Quiz
- [] Refactor database calls
- [] Create a seed script
- [] OpenGraph Image

## Overview

Pytania is an interactive quiz application designed to provide users with an engaging and educational experience. Whether you're a student looking to reinforce your learning or just someone who enjoys testing their knowledge, Pytania has something for everyone.

## Functional Requirements

### 1. User Authentication

- **Login:** Registered users can log in to access personalized features.
  - Users can authenticate using OAuth with Discord, Google, and GitHub.
  - Alternatively, users can authenticate using an email magic link.
- **Guest Mode:** Users can explore limited features without creating an account.

### 2. Quiz Management

- **Create Quiz:** Authenticated users can create quizzes with a title, description, and a set of questions.
- **Edit Quiz:** Creators can modify the content of their quizzes.
- **Delete Quiz:** Creators can delete quizzes they no longer want.
- **Change Quiz Visibility:** Creators can change the visibility to public or private (visible only with link).

### 3. User Profiles

- **Information Displayed:**
  - Name
  - Bio
  - Avatar
  - Member since
  - Number of public created quizzes.
  - Public created quizzes.
  - Favorite quizzes.
  - Last 5 Quizzes Resolved.

### 4. Quiz Taking

- **Start Quiz:** Users can start a quiz, answering questions one by one.
- **Timer:** Quizzes may have a time limit for each question.
- **Submit Answers:** Users can submit their answers and receive immediate feedback.
- **Social Features:** Users can like, dislike, and comment on quizzes.

### 5. Results

- **View Results:** Users can see their quiz results, including correct and incorrect answers.
- **Score Calculation:** The app calculates and displays the overall score.

## Non-Functional Requirements

### 1. Performance

- **Response Time:** The app should respond to user interactions within 2 seconds.
- **Scalability:** The system should handle a growing number of users and quizzes without performance degradation.

### 2. Usability

- **Intuitive UI:** The user interface should be user-friendly and easy to navigate.
- **Accessibility:** The app should be accessible to users with disabilities.

### 3. Reliability

- **Availability:** The app should be available 99.9% of the time.
- **Backup:** Regular data backups to prevent data loss.

### 4. Compatibility

- **Browser Compatibility:** The app should work seamlessly on major web browsers.
- **Device Compatibility:** The app should be responsive and functional on various devices.

### 5. Compliance

- **Data Protection:** The app should comply with data protection and privacy regulations.
- **Accessibility Standards:** The app should adhere to accessibility standards.

## Getting Started

To run the Pytania app locally, follow these steps:

1. Clone the repository.
2. Install dependencies with `bun install`.
3. Configure all environment variables following the instructions on `.env.example` file.
4. Run all migrations with `bun db:migrate`.
5. Run the app with `bun dev`.

## Scripts

- `bun dev`: Run Next.js in development mode
- `bun run build`: Build the application for production usage
- `bun start`: Run Next.js in production mode
- `bun lint`: Run ESLint
- `bun db:generate`: Generate migrations based on all schemas
- `bun db:migrate`: Run all migrations on database
- `bun db:drop`: Delete previously generated migrations
- `bun db:pull`: Pull DDL from database and generate a schema
- `bun db:studio`: Run Drizzle Studio, a tool to explore the database
- `bun db:check`: Check consistency of your migrations
- `bun db:start`: Start and restart the Postgres database defined in `docker-compose.yml`
- `bun db:rm`: Stop and remove the database
- `bun email`: Starts a local development server on port 3001 to preview all email templates.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to fork, modify, and distribute the code for educational purposes.

---

Feel free to expand or modify these requirements based on the specific functionalities and characteristics of your app.
