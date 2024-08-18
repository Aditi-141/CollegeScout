#CollegeScout: Gemini AI-Powered College Recommendation System

CollegeScout simplifies the daunting college search process. It uses state-of-the-art AI to analyze your Statement of Purpose (SOP) and recommend colleges perfectly aligned with your goals and aspirations. You will be required to upload the SOP in upload file section and then analyse it to receive collge recommendation.

#Key Features

* **Personalized College Recommendations:**  Leverages Google Gemini AI to extract your unique interests, academic strengths, and career goals from your SOP.
* **Intelligent Matching:**  Matches you with colleges that offer programs, environments, and opportunities tailored to your profile.
* **Efficient Search:** Saves you time and effort by narrowing down your college options to the most relevant choices.
* **Data-Driven Insights:** Provides data-backed recommendations for informed decision-making.
* **User-Friendly Interface:**  Built with React for a seamless user experience.
* **Scalable Backend:**  Powered by Node.js and TypeScript for robustness and maintainability.
* **Structured Data:**  Uses PostgreSQL to efficiently store and manage college data.

## Getting Started

### Prerequisites

1.  **Node.js:**  Download and install from the official website: [https://nodejs.org/](https://nodejs.org/)
2.  **TypeScript:** Install globally using npm:
    ```bash
    npm install -g typescript
    ```
3.  **PostgreSQL:** 
    * Download and install: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
    * Create a database named `student_db`.
    * Create tables `colleges` and `programs` (refer to `database-schema.sql` in this repository).
4.  **Gemini API Key:** Obtain your key from Google MakerSuite: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
5.  **Environment Variables:** Create a `.env` file in the project root and set your API key:
    ```
    API_KEY=your_gemini_api_key
    ```

### Installation and Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Aditi-141/CollegeScout.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd collegescout
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Build (compile TypeScript):**
    ```bash
    npm run build
    ```
5.  **Start the server:**
    ```bash
    npm run start
    ```
6.  **Open in your browser:**
    ```
    http://localhost:3000 
    ```

## 📂 Project Structure

*   `/src`: TypeScript source code
    *   `/controllers`: API endpoints and logic
    *   `/models`: Database schemas and interactions
*   `/dist`: Compiled JavaScript code
*   `.env`: Stores your API key
