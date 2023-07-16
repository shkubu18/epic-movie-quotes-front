# Epic Movie Quotes - Frontend

#### Author: [Davit Shkubuliani](https://www.linkedin.com/in/davit-shkubuliani/)

---

Welcome to Epic Movie Quotes - Frontend! This is my first full-stack project developed using Vue.js and Laravel.
The project aims to provide a comprehensive and immersive user experience with a range of essential features.

The application includes user management functionalities such as user registration with email verification, password
reset, and login.
Users can create their accounts securely and easily recover their passwords if needed.

Once authenticated, users gain access to various features, including movie and quote management.
They can create, read, edit, and delete movies and quotes, expressing their reactions through comments and likes.

To keep users informed in real-time, the application has live notifications feature. Users receive live notifications
when someone comments or likes their quotes.

Epic Movie Quotes also integrates Laravel Socialite, enabling users to log in with their Gmail accounts effortlessly.
This feature enhances user convenience and offers more options for authentication.

The application is designed with responsiveness in mind, providing optimal viewing experiences on various devices.
It offers a seamless interface that adapts to different screen sizes, including desktop devices with a resolution of
1920x1080 and mobile devices with a resolution of 430x730.

Finally, Epic Movie Quotes supports bilingual functionality, offering both English and Georgian language options.
Users can explore and interact with the application in their preferred language.

#

## Table of Contents

* [Prerequisites](#prerequisites)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Development](#development)
* [Live Deployment](#live-deployment)
* [Resources](#resources)
* [Additional information](#additional-information)

#

## Prerequisites

* <img src="src/assets/readme/assets/node-js.png" width="35" style="position: relative; top: 5px" />&nbsp;&nbsp;*Node JS
  @12.X and up*
* <img src="src/assets/readme/assets/npm.png" width="35" style="position: relative; top: 4px" />&nbsp;&nbsp;*npm@6 and
  up*

#

## Tech Stack

- <img src="src/assets/readme/assets/vue.png" height="18" style="position: relative; top: 5px" />&nbsp;[Vue @3.2.47 and up](https://vuejs.org/) - front-end framework
- <img src="src/assets/readme/assets/pinia.png" height="19" style="position: relative; top: 4px" />&nbsp;[Pinia @2.1.3 end up](https://pinia.vuejs.org/) - package for store management
- <img src="src/assets/readme/assets/vee-validate.png" height="19" style="position: relative; top: 4px" />&nbsp;[Vee-Validate @4.9.3 end up](https://vee-validate.logaretm.com/v4/) - package for form validations
- <img src="src/assets/readme/assets/tailwind.png" height="18" style="position: relative; top: 5px" />&nbsp;[TailwindCSS](https://tailwindcss.com/) - css framework for styles
- <img src="src/assets/readme/assets/vue-i18n.png" height="18" style="position: relative; top: 5px" />&nbsp;[Vue I18n](https://vue-i18n.intlify.dev/) - plugin for localization
- <img src="src/assets/readme/assets/laravel-echo.png" height="18" style="position: relative; top: 5px" />&nbsp;[Laravel Echo with pusher-js](https://laravel.com/docs/10.x/broadcasting#client-side-installation) - libraries for real time data receiving

#

## Getting Started

1. First of all you need to clone repository from GitHub:
    ```sh
    git clone https://github.com/RedberryInternship/data-shkubuliani-epic-movie-quotes.git
    ```

2. Next step requires you to run *npm install* in order to install all the dependencies.
    ```sh
    npm install
    ```

3. Now we need to set our env file. Go to the root of your project and execute this command.
    ```sh
    cp .env.example .env
    ```


#
## Configuration

1. Modify the your backend URL configuration in your `.env` file.
   >VITE_API_BASE_URL=***********

2. Modify the pusher configuration in your `.env` file.
   >VITE_PUSHER_KEY=***********


#
## Development

You need to start Vite server:

```shell
npm run dev
```

#

## Live Deployment

https://epic-movie-quotes.data-shkubuliani.redberryinternship.ge/


#
## Additional information
#### This project is inspired by [Redberry](https://redberry.international/)


#
## Resources
[Project Design](https://www.figma.com/file/5uMXCg3itJwpzh9cVIK3hA/Movie-Quotes-Bootcamp-assignment?type=design&node-id=0-1&mode=design&t=mRwkH2ZrQLIlxnQT-0)