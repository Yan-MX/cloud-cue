# Welcome to Cloud Cue App 👋

This is an React Native (typescript) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npm run start
   ```
## Screen recording


https://github.com/user-attachments/assets/226f3e17-274f-41d1-9d74-1c9c3bd9a4ec


## Approach to Development

1. **Routing Setup** 🚦: Establishing a routing system was my initial focus. I implemented a straightforward route from the dashboard to the detailed weather view using the path `/[location]`, along with a simple back button that returns users to the dashboard.

2. **API Integration and Data Mapping** 🌐: I integrated APIs to fetch weather and sunrise data, ensuring accurate data mapping to present relevant information to users effectively.

3. **Support for Location Permission** 📍: I developed a function to request user permission for accessing their location within the app, which is essential for providing localized weather information.

4. **UI Elements** 🎨: After implementing data fetching, I concentrated on building basic UI elements to create an initial version of the app, allowing me to test the core concept.

5. **Context and Provider** 🏗️: Given the need to access weather data for all cities from the dashboard, as well as for the detailed weather page, I created a Weather Context Provider. This provider wraps the entire app, reducing unnecessary API calls and simplifying data handling across components.

6. **Continuous Integration with GitHub Actions** ⚙️: I configured GitHub Actions to automate the build process, ensuring that the app can build reliably with each commit.

7. **Add ESLint and Prettier** ✨: After implementing the CI pipeline, I added support for ESLint and Prettier to enhance code quality and maintainability, ensuring consistent styling and preventing common coding errors.

8. **Error Handling** ⚠️: I incorporated basic error handling mechanisms to manage potential API errors, enhancing the overall user experience by ensuring that the app responds gracefully to issues.

9. **Styling** 🎨: I focused on styling the user interface to make it visually appealing and easy to navigate, utilizing a Bauhaus-inspired design aesthetic for clarity and simplicity.

10. **Testing** 🧪: I added unit tests and functional tests to ensure that the app’s components work as intended, thereby improving code reliability and stability.
    
## Potential Improvements

1. Location Permission Handling: I would implement a feature to handle cases where users deny location permissions. In such scenarios, the app could display a list of other cities, ensuring users still have access to weather information.

2. Refresh Functionality: Adding a refresh button or enable drag down to fetch the latest weather data would enhance user experience

3. City List Management: The city is currently hard coded with London and Berlin. It would be nice add functionality to allow users to manage their city list, including adding or deleting cities as desired. 

4. Internationalization Support: Implementing language support for internationalization would make the app more accessible to a broader audience. 





