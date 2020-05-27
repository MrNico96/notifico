# Notifico :house: :moneybag: :car:
Listings from private individuals are unfortunately often deactivated after a few minutes, because the demand is too high and they have received many requests.
Scout24's notification function often fails to respond because they have already been deactivated so quickly.

### What exactly does the Bot?
The bot opens a chromium browser every minute you specify and checks for you if there are new entries.
As soon as it has found something new, it informs you by telegram.
After you have started the bot, everything happens in the background without you noticing anything.
Of course you can pause or stop it at any time.
Interested? Then read on how to install it!

## Prerequisites
* [Notifico](https://github.com/MrNico96/notifico/archive/master.zip) - After the download unzip the file.
* [Node + NPM](https://nodejs.org/de/download/) - to run the Bot. [Tutorial Windows](https://treehouse.github.io/installation-guides/windows/node-windows.html) [Tutorial Mac](https://treehouse.github.io/installation-guides/mac/node-mac.html)
* [Telegram](https://telegram.org/) - to receive the messages. [Android or iOS]

## Getting Started
The installation is quite simple. First you download and install the prerequisites.
After you have successfully completed the installation, enter your preferred settings in the [config.js](config.js) file.

**How do I get the telegramId?**<br/>
Please open Telegram and send the following message to @notifico_bot:
```
/start
```
You will get the telegramId as a response.<br>
<br/><br/>
**How do I get the searchUrl?**<br/>
First go to e.g. immobilienscout24.de and enter your preferred search parameters, then press "XX hits".<br/>
Afterwards you will come to your search results page, now copy the URL from the browser address bar.<br/>
*Your searchUrl should look similar:*<br/>
*https://www.immobilienscout24.de/Suche/de/hamburg/hamburg/wohnung-mieten?numberofrooms=5.0-&price=-4000.0&livingspace=100.0-&enteredFrom=one_step_search*

### Installing
After you have installed the above prerequisites, you can install the actual bot.
1. Go to the unzipped folder named "notifico" and press right click -> "Open in Terminal".
1. Then enter the following command in the terminal.
```
npm install
```
voilà - it's done!<br>

## Start the Bot
1. Go to the folder named "notifico" and press right click -> "Open in Terminal".
1. Then enter the following command in the terminal.
```
npm start
```
Then the bot will run as long as the terminal window is open/minimized or you type the following command in the terminal:
```
cmd + c || strg + c
```

## License & Disclaimer

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  
We do not take any responsibility for damages caused by the bot. The embedding and use is therefore at your own risk.  
This is **not** an official product of "Scout24 AG"!
