<img src="./readme/title1.svg"/>

<br><br>

<!-- project overview -->
<img src="./readme/title2.svg"/>

> Amp Intelligence is an IoT website that tracks the power consumption of each client and power distribution of the providers.
> 
> The website will display the data that the arduino will send to the database and the users will be able to generate AI reports for their needs.

<br>

<!-- System Design -->
<img src="./readme/title3.svg"/>

### ER Diagram

<center>
<img src="./readme/demo/Diagrams/ERD.png"/>
</center>

### Component Diagram

<center>
<img src="./readme/demo/Diagrams/Component Diagram Light.png"/>
</center>

<br><br>

<!-- Project Highlights -->
<img src="./readme/title4.svg"/>

### The Most Remarkable Features

- <b>Seamless IoT Data Ingestion:</b> The system captures and securely stores real-time energy consumption data from client devices using ESP32 microcontrollers.

- <b>AI-Powered Consumption Forecasting:</b> Advanced AI models analyze historical patterns to help energy providers anticipate demand and optimize resource allocation.

- <b>Personalized AI Optimization Plans:</b> Clients receive intelligent, data-driven strategies to optimize energy usage, reduce costs, and promote sustainability based on their consumption behaviors.

### Features Highlight

<center>
<img src="./readme/demo/Highlights/Highlight Section.png"/>
</center>

<br><br>

<!-- Demo -->
<img src="./readme/title5.svg"/>

### Landing Screens

| Landing Screen                            | Login screen                       |
| --------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/Landing/Landing%20Page.gif) | ![Login](./readme/demo/Landing/Login.gif) |

### Client Screens

| Client Dashboard screen                            | Client Report screen                       |
| --------------------------------------- | ------------------------------------- |
| ![ClientDashboard](./readme/demo/Client/Client%20Dashboard.gif) | ![ClientReport](./readme/demo/Client/Client%20Report.gif) |

| Client Profile screen                            | Contact Us screen                       |
| --------------------------------------- | ------------------------------------- |
| ![ClientProfile](./readme/demo/Client/Client_Profile.png) | ![ContactUs](./readme/demo/Client/Contact%20Us.png) |

### Provider Screens

| Provider Dashboard screen                            | Provider Report screen                       |
| --------------------------------------- | ------------------------------------- |
| ![ProviderDashboard](./readme/demo/Provider/Provider%20Dashboard.gif) | ![ProviderReport](./readme/demo/Provider/Provider%20Report.gif) |

| Provider Show Users screen                            | Provider Edit Profile screen                       |
| --------------------------------------- | ------------------------------------- |
| ![ProviderUsers](./readme/demo/Provider/Provider_Users.png) | ![ProviderProfile](./readme/demo/Provider/Provider_Profile.png) |

### Admin Screens

| Admin View All Providers screen                            | Admin View All Contact Messages screen                       |
| --------------------------------------- | ------------------------------------- |
| ![AdminViewProviders](./readme/demo/Admin/Admin_View_Providers.png) | ![AdminViewContactMessages](./readme/demo/Admin/Admin_View_Contact_Messages.png) |

<br><br>

<!-- Development & Testing -->
<img src="./readme/title6.svg"/>

### Project Box Design

This box is a demostration of a power room that contain elecrical wire lines and the microcontroller is connected to the circuit.

I used for this project ESP32 DevKit V1. It is based on the ESP32 microcontroller that boasts Wifi, Bluetooth, Ethernet and Low Power support all in a single chip.

| Power Box 1                             | Power Box 2                       | Power Box 3                        |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![PowerBox](./readme/demo/Project_Box/Power_Room_1.jpg) | ![PowerBox](./readme/demo/Project_Box/Power_Room_2.jpg) | ![PowerBox](./readme/demo/Project_Box/Power_Room_3.jpg) |

#### Postman API Documentation

- You can check the full API documentation using this [link](https://documenter.getpostman.com/view/42830816/2sB2qXji4H).

### Code Test Cases

| Test Case                           | Test Case                       |
| --------------------------------------- | ------------------------------------- |
| ![TestCase](./readme/demo/Testing/User_Test.png) | ![TestCase](./readme/demo/Testing/Client_Dashboard_Test.png) |

|Test Case                           | Test Case                       |
| --------------------------------------- | ------------------------------------- |
| ![TestCase](./readme/demo/Testing/Provider_Overview_Test.png) | ![TestCase](./readme/demo/Testing/Metric_Test.png) |

### GitHub Testing Pull Request

| GitHub Testing Pipeline                           | GitHub Pull Request                      |
| --------------------------------------- | ------------------------------------- |
| ![GitHubTestPipeline](./readme/demo/Testing/Laravel_Test_Production.png) | ![GitHubPullRequest](./readme/demo/Testing/Pull%20Request%20Test%20Success.png) |

<br><br>

<!-- AI-Power APP -->
<img src="./readme/title7.svg"/>

### Prism OpenAI Intengration

- Prism is a powerful Laravel package for integrating Large Language Models (LLMs) into your applications.

| Prism Provider Prompt                           | Prism Client Prompt                      |
| --------------------------------------- | ------------------------------------- |
| ![ProviderPrompt](./readme/demo/AI/PrismProviderPrompt.png) | ![ClientPrompt](./readme/demo/AI/PrismClientPrompt.png) |

| Prism Function Call                           | Controller                      |
| --------------------------------------- | ------------------------------------- |
| ![PrismCall](./readme/demo/AI/PrismFunctionCall.png) | ![Controller](./readme/demo/Testing/Controller.png) |

| Routes                           | Testing Pipeline                      |
| --------------------------------------- | ------------------------------------- |
| ![Routes](./readme/demo/Testing/Routes.png) | ![TestingPipeline](./readme/demo/Testing/Testing_Pipeline_Code.png) |

### Server Response with Database Indexing

- Provider user AI generated response time difference

| Postman API Before Indexing (22.28s)                           | Postman API After Indexing (15.5s)                      |
| --------------------------------------- | ------------------------------------- |
| ![BeforeIndex](./readme/demo/AI/Provider%20Report%20Before%20Indexing.png) | ![AfterIndex](./readme/demo/AI/Provider%20Report%20After%20Indexing.png) |

### Server Response with Database Indexing

- Client user AI generated response time difference

| Postman API Before Indexing (17s)                           | Postman API After Indexing (8.28 s)                      |
| --------------------------------------- | ------------------------------------- |
| ![BeforeIndex](./readme/demo/AI/Client%20Report%20Before%20Indexing.png) | ![AfterIndex](./readme/demo/AI/Client%20Report%20After%20Indexing.png) |

| Users Table user_type indexed                           | Metrics Table slave_id indexed                      |
| --------------------------------------- | ------------------------------------- |
| ![UserTypeIndex](./readme/demo/Testing/user_type_indexed.png) | ![SlaveIdIndex](./readme/demo/Testing/slave_id_index.png) |

<br><br>

<!-- Deployment -->
<img src="./readme/title8.svg"/>

### Deployment Diagram

<center>
<img src="./readme/demo/Diagrams/Flow Diagram.png"/>
</center>

### EC2 Docker containers deployment

| Deployment Pipeline 1                            | Deployment Pipeline 2                       |
| --------------------------------------- | ------------------------------------- |
| ![Pipeline1](./readme/demo/Deployment/Deployment%20Pipeline%201.png) | ![Pipeline2](./readme/demo/Deployment/Deployment%20Pipeline%202.png) |

| Deployment Pipeline 3                            | Deployment Pipeline 4                       |
| --------------------------------------- | ------------------------------------- |
| ![Pipeline3](./readme/demo/Deployment/Deployment%20Pipeline%203.png) | ![Pipeline4](./readme/demo/Deployment/Deployment%20Pipeline%204.png) |

| GitHub Deployment Pipeline Success                            | EC2 Instance docker deployed                       |
| --------------------------------------- | ------------------------------------- |
| ![PipelineSuccess](./readme/demo/Deployment/GitHub_Deploy_Staging_Pipeline.png) | ![EC2Deployed](./readme/demo/Deployment/Node_Server_Docker_Deployed.png) |

| EC2 Node Server Logs                            | ESP32 Serial Monitor Output                       |
| --------------------------------------- | ------------------------------------- |
| ![NodeLogs](./readme/demo/Deployment/Node_Server_Data.png) | ![ESP32Monitor](./readme/demo/Deployment/ESP32_Serial_Monitor.png) |

| AWS S3 Bucket React files                            | S3 bucket public IP website                       |
| --------------------------------------- | ------------------------------------- |
| ![S3React](./readme/demo/Deployment/S3_React_Deployed.png) | ![S3PubliLink](./readme/demo/Deployment/S3_Website_Deployed.png) |

<br>

#### To test the website, here are some initial default data stored in the database:

#### Admin Users:
> <u><b>Email:</b></u> riyad@gmail.com, <u><b>Password:</b></u> password

> <u><b>Email:</b></u> nabiha@gmail.com, <u><b>Password:</b></u> password

#### Provider Users:
> <u><b>Email:</b></u> cdaoud@gmail.com, <u><b>Password:</b></u> password

> <u><b>Email:</b></u> nour@gmail.com, <u><b>Password:</b></u> password

> <u><b>Email:</b></u> taha@gmail.com, <u><b>Password:</b></u> password

#### Client Users:
> <u><b>Email:</b></u> gheeda@gmail.com, <u><b>Password:</b></u> password

> <u><b>Email:</b></u> joe@gmail.com, <u><b>Password:</b></u> password

> <u><b>Email:</b></u> sara@gmail.com, <u><b>Password:</b></u> password
