DISPLAY=:0 xdotool mousemove 2000 2000
cd /home/tomos/Projects/VESCDash/vesc-dash
npm run estart #Electron renderer
# DISPLAY=:0 firefox --kiosk http://localhost:5051 #Browser renderer

# Add this (../build <here> ) & if you want to use browser renderer 
#; sudo -H -u tomos /bin/python -m http.server 5051
