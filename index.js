const inquirer = require("inquirer");
const fs = require("fs");
const Choices = require("inquirer/lib/objects/choices");

// array of questions for user
const questions = [
        {
            message: "Welcome to the automated README generator! Please enter a title for your README",
            name: "title"
        },
        {
            message: "Please give a description of your program",
            name: "description"
        },
        {
            message: "Please provide installation instructions",
            name: "install"
        },
        {
            message: "Please provide instructions for usage",
            name: "usage"
        },
        {
            type: "list",
            message: "Please select a licence",
            name: "license",
            choices: [
                "Unlicensed", 
                "MIT", 
                "Apache 2"
            ]
        },
        {
            message: "Who contributed to this project?",
            name: "contributors"
        },
        {
            message: "Please provide a link to the project",
            name: "link"
        },
        {
            message: "Enter your github username here",
            name: "username"
        },
        {
            message: "Enter your email here",
            name: "email"
        }
]


// function to write README file
function writeToFile(tag, chosenLicense, data) {
    
    fs.appendFileSync("README.md", 
`
# ${data.title} ${tag}

## Table of Contents 

-[Description](##Description)
\n-[Installation Instructions](##Install)
\n-[Usage Instructions](##Usage)
\n-[Licensing](##License)
\n-[Contributors](##Contributors)
\n-[Links](##Links)
\n-[Contact Info](##Contact)

## Description <a name="Description"></a>

${data.description}

__${chosenLicense}__

## Installation <a name="Install"></a>

${data.install}
   
## Usage <a name="Usage"></a>

${data.usage}
    
## Licensing <a name="License"></a>

${data.license}
    
## Contributors <a name="Contributors"></a>

${data.contributors}

## Links <a name="Links"></a>

[Find The Project Here!](http://www.github.com/${data.username}/${data.link})

## Contact Information <a name="Contact"></a>

\n[email](${data.email})
\n[github](http://www.github.com/${data.username})
`,

    )
}


// function to initialize program
function init() {
    inquirer.prompt(
        questions
        ).then( data => {
 
            if(data.license === "Unlicensed"){
                var chosenLicense = "This program is unlicensed and under no restrictions. This program is available 'as is'";
                var tag = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
            }else if(data.license === "MIT"){
                var chosenLicense = "This program is licensed under an MIT licensing, allowing users to use, modify, publish or sell any copies of this program. For more information, please see https://opensource.org/licenses/MIT";
                var tag = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            }else if(data.license === "Apache 2"){
                var chosenLicense = "This program is licensed under an Apache 2 licence and is free to use and modify, subject to terms and conditions. For more information, visit https://opensource.org/licenses/Apache-2.0";
                var tag = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            }

            writeToFile(tag, chosenLicense, data);
        })
}
    
// function call to initialize program
init();
