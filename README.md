# WebsiteStatusChecker

The application has been created to monitor the status of various websites. The websites to be monitored are stored in a SQLite database. The application sends HTTP requests to the addresses of these websites every 10 seconds and then checks the responses to determine if the websites are functioning correctly (returning status 2xx). After each request, the status of the websites is saved to a CSV file.

### Features

1. Add Websites: The application allows adding websites to monitor by inserting their URLs into the SQLite database.

2. Website Status Monitoring: Every 10 seconds, the application sends HTTP requests to the website addresses stored in the database and checks the responses to determine if the websites are functioning correctly (returning status 2xx).

3. Save Status to CSV: After each request, the application saves data regarding each website to a CSV file, including the date, website name, its status (Running/Down), and returned HttpCode.

4. Download CSV File: Users have the option to download a CSV file containing information about the status of a selected website.

### 🚀 Technologies

- Node.js
- Express.js
- TypeScript
- Zod
- Prisma
- Cron
- SQLite

### ✅ Requirements

Before starting, you need to have Git and Node installed.

### Run locally - backend

```bash
# Clone the project
$ git clone https://github.com/Kamgre7/checkMyService.git

# Go to the project directory
$ cd checkMyService

# Install dependencies
$ npm install

# Start the server
$ npm run start
```

### 🛠 API Reference

#### Add a website for monitoring

```http
  POST /url
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `url`     | `String` | Correct url address in Request body |
|           |

#### Deactivate website in database

```http
  PUT /url
```

| Parameter | Type   | Description                           |
| :-------- | :----- | :------------------------------------ |
| `id`      | `UUID` | Correct ID of website in Request body |
|           |

#### Download CSV file of selected website

```http
  GET /url/download-csv/:id
```

| Parameter | Type   | Description           |
| :-------- | :----- | :-------------------- |
| `id`      | `UUID` | Correct ID of website |
|           |
