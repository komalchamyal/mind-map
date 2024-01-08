# Mind-Map Application with ReactFlow

Welcome to the Mind-Map application, a React-based project utilizing ReactFlow. This application allows users to import files, extract headers, create mind maps, and export the resulting mind map as JSON files.

## Getting Started

Follow these instructions to run the Mind-Map application on your local system.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/komalchamyal/mind-map.git
    ```

2. Navigate to the project directory:

    ```bash
    cd mind-map
    ```

3. Install the project dependencies:

    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and go to [http://localhost:5173](http://localhost:5173) to access the Mind-Map application.

## How to Use the Mind-Map Application

### Step 1: Import a File

- Click on the "Input File" button to upload a file to the application.

### Step 2: Import Headers

- After importing a file, select the headers you want to include in your mind map. Click on the "Import Tags" button.

### Step 3: Create Mind Map

- With the selected headers, create a visual representation of your mind map. You can import custom nodes as well.

### Step 4: Export as JSON

- Once the mind map is created, click on the "Download JSON" button.
- Two JSON files will be exported: one for nodes (`nodeArray.json`) and one for edges (`edgesArray.json`).

Happy mind mapping! 🧠🗺️
