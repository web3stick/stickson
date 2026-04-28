# PROMPT

json framework for making satic pages (stickson)
essently i want a json file and a schema and then a js file to intert the conent into the html templte file, can use the same js and html file for all projects and users should have the ablity to use a custom css file, as well as we can provie some css themes to use.

i would like cli tool where they can create new projects and the only files in their new projects should be the content json file and the package json file, then there should be cli commands to check their json file aagins the schema, build their app and output to out directory, and a command to serve, we could also have a dev command for live chages to the josn file

we will start with a basic js package for this, and then can make other products and stuff later,

keep the logc clean and spearte file for each functon in the src folder, and then cli thin cli bin in in the bin folder, this should be a two in one package so users can add it their proejct and inmport functions form this. or install to use the cli

we should be able to have json field for every part of the html page, as well as have suppot for sections, divs, links and buttons and maybe other custom filds that can be styled with css and image or other media assests via links. also i guess we could have spport for routing would be cool tool by linking to other json files in like the main.json, and we should then output with a spearte html file for each route?

i guess the output form the build command could inclued the json file, the html file and the js file that phrases the josn and insters the conent and elmenets into the webpage i think that is how i want it to work rather than output an html file with content inline? or maybe haveing the option to do that so we can have singel file html output. probly single file html output should be the default.

create a document folder with a consise md file for humans on how to intall and use, and then can have a longer one for ai llm.md

=====================
<br/>
copyright 2026 by web3stick.near
