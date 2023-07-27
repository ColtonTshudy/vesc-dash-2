# Colton's VESC Dash

Raspberry Pi 3 based VESC dashboard

## Versions
This project was created and verified with the following versions:
<br /><br />
Software/Firmware:
* Node 18.16.0
* npm 9.5.1
* react 18.2.0
* bldc 6.00
* Raspbian 11 (bullseye) for arm64 aml s905x
* can-utils 2020.11.0-1 
<br /><br />

Hardware:
* vesc hw revision 6
* Le Potato 2GB s905x
* Diplay 7" HDMI 1024 x 600px
* MCP2515 & TJA1050 SPI CAN module (modified for 3.3v)

## Build and launch
Run the following:
```
cd /git/directory/here
npm i
npm run ebuild
npm run estart
```
This will run the program using the Electron renderer, which is a lightweight alternative to browser based rendering methods. The bash script includes my file path, which must be changed if want to use it. It was purely for debugging - not at all necessary for function.
<br /> <br />
If you want to launch using a browser, the original node scripts are still available.
```
cd /git/directory/here
npm i
npm run build
```
