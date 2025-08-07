# Installation Guide

Follow these steps to set up the LM Studio WebUI on your machine.

## Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- npm (comes with Node.js)

## Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/benjaws/LMStudioWebUI.git
   cd LMStudioWebUI
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **(Optional) Configure environment variables**
   Create a `.env` file in the project root to prefill connection details:
   ```env
   SERVER_URL=http://localhost:1234
   AUTH_TOKEN=
   ```
4. **Run the server**
   ```bash
   npm start
   ```
   The interface will be available at [http://localhost:3000](http://localhost:3000).

You're ready to use LM Studio WebUI locally!
