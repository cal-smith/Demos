import hello.Hello;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

object Test {
	def main(arg: Array[String]) = {
		val earth = new Hello()
		println(earth.greet())
		files("./static/static.txt")
		files("./static/static2.txt")
	}

	def files(path: String) = {
		try { 
			val file = new BufferedReader(new FileReader(path))
			var line = file.readLine()
			while (line != null){
				println(line)
				line = file.readLine()
			}
			try { 
				if (line != null) file.close()
			} catch {
			  case ex: Exception => ex.printStackTrace()
			}
		} catch {
			case e: IOException => e.printStackTrace()
		}
	}
}