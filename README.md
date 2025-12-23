# Festive Web App with New Year Notifications

A production-ready web application that sends New Year push notifications after users opt-in on Christmas Day.

## Features

- iOS-inspired clean, minimal UI
- Year in Review image gallery with smooth animations
- Web Push notifications with Service Worker
- Single New Year notification on January 1st
- Mobile-first responsive design
- Privacy-focused (no personal data stored)

## Tech Stack

### Frontend
- React 18 with functional components
- Vite for build tooling
- Pure CSS (no Tailwind)
- Framer Motion for animations
- Web Push API

### Backend
- Node.js + Express
- web-push library for notifications
- node-cron for scheduling
- File-based storage (simple, no database)

## Setup Instructions

### 1. Clone and Install
```bash
git clone <repository-url>
cd festive-app
npm install
cd client && npm install
cd ../server && npm install