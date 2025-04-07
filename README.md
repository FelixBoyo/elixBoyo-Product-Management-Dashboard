# Laravel Project Setup Guide

This guide will help you clone and install a Laravel project that uses Vite for asset bundling and Vue for building components/pages.

## Prerequisites

Ensure the following software is installed on your machine:

-   <a href="https://www.php.net/downloads.php">**PHP** (>= 8.2)</a>
-   <a href="https://getcomposer.org/"> **Composer**</a>
-   <a href="https://nodejs.org/en"> **Node.js** (>= 16.x)</a>
-   <a href="https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable">**Yarn** (or **NPM**) preferred yarn</a>
-   <a href="https://www.mysql.com/downloads/">**MySQL**</a>

## Steps to Clone and Install

1.  **Clone the repository**

    Open your terminal and run the following command to clone the repository:

    ```bash
    git clone https://github.com/FelixBoyo/Product-Management-Dashboard.git
    ```

2.  **Navigate into the project directory:**

    ```bash
    cd Product-Management-Dashboard
    ```

3.  **Install PHP dependencies:**
    Run the following command to install PHP dependencies using Composer:

    ```bash
    composer install or composer update
    ```

    #### composer install

    Use this command when you want to ensure that everyone on a team has the same version of each package. It also locks the versions of installed packages, so if someone runs composer install on a project later, the dependencies won't break.

    #### composer update

    Use this command to update dependencies to the latest versions. It's recommended to use this command during the development phase of a project, and not in production. Running composer update in production can break code because it updates dependencies, which can change versions

    #### Never run composer update on production live server, it's slow and will "break" repository. Always run composer update locally on your computer, commit new composer. lock to the repository, and run composer install on the live server.

4.  **Install Node.js dependencies**

    Run the following command to install Node.js dependencies using yarn (or npm):

    ```bash
    yarn install
    ```

5.  **Set up the environment file**

    Copy the .env.example file and rename it to .env:<br>
    on Linux/MAC OS

    ```bash
    cp .env.example .env

    ```

    or on windows

    ```bash
    copy .env.example .env
    ```

    #### This command copies content in the .env.example file to .env files

    Open the .env file and configure your database and other settings as needed.

    ```bash
    DB_CONNECTION=mysql
    DB_HOST=localhost
    DB_PORT=<YOU DBs PORT>
    DB_DATABASE=domainstorekenya
    DB_USERNAME=<YOUR DB USERNAME>
    DB_PASSWORD=<YOUR DB PASSWORD>
    ```

6.  **Generate application key**

    Run the following command to generate a new application key:

    ```bash
    php artisan key:generate
    ```

7.  **Run database migrations**
    Execute the database migrations to set up the required tables:

    ```bash
    php artisan migrate

    ```

8.  **Build assets using Vite**
    Vite is used to bundle assets. You can run the following command to compile your assets:

    ```bash
    yarn dev or npm run dev
    ```

    For production, use:

    ```bash
    yarn build or npm run build
    ```

9.  **Serve the application**
    Start the Laravel development server:

    ```bash
    php artisan serve
    ```

    #### The application should now be accessible at http://localhost:8000.


# Product-Management-Dashboard