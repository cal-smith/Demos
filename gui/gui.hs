module Main where
	import Graphics.X11.Xlib
	import System.Exit (exitWith, ExitCode(..))
	import Control.Concurrent (threadDelay)

main:: IO ()
main = do
	dpy <- openDisplay ""
	let dflt = defaultScreen dpy
	border = blackPixel dpy dflt
	background = whitePixel dpy dflt
	rootw <- rootWindow dpy dflt
	win <- createSimpleWindow dpy dflt
	setTextPropert dpy win "Hello World" wM_NAME
	mapWindow dpy win
	sync dpy False
	threadDelay (10 * 1000000)
	exitWith ExitSuccess