import hello.Hello
import java.io.BufferedReader
import java.io.FileReader
import java.io.IOException

earth = new Hello()
println earth.greet()
files()

def files (){
	file = null
	try {
		line = ""
		file = new BufferedReader(new FileReader("./static/static.txt"))
		while ((line = file.readLine()) != null){
			println line
		}
	}
	catch(Exception e) {
		e.printStackTrace()
	}
	finally {
		try {
			if (file != null) file.close()
		}
		catch(Exception ex) {
			ex.printStackTrace()
		}
	}
}